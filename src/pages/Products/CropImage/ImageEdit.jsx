import React, { useState } from "react";
import FileInput from "./FileInput";
import ImageCropper from "./ImageCropper";
import axios from "axios";
import { b64toFile } from 'b64-to-file';
// import CSRFToken from "../CSRFTOKEN/csrftoken";
import {$,jQuery,trim} from 'jquery'; 
import Resizer from "react-image-file-resizer";

function ImageEdit(props) {
  const [image, setImage] = useState("");
  const [currentPage, setCurrentPage] = useState("Edit-img");
  const [imgAfterCrop, setImgAfterCrop] = useState("");
  const [newImg, setNewImg] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Invoked when new image file is selected
  const onImageSelected = (selectedImg) => {
    setImage(selectedImg);
    setCurrentPage("crop-img");
  };

  // Generating Cropped Image When Done Button Clicked
  const onCropDone = (imgCroppedArea) => {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext("2d");

    let imageObj1 = new Image();
    imageObj1.src = image;
    imageObj1.onload = function () {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );

      const dataURL = canvasEle.toDataURL("image/jpeg");

      setImgAfterCrop(dataURL);
      setCurrentPage("img-cropped");
    };
  };

  // Handle Cancel Button Click
  const onCropCancel = () => {
    setCurrentPage("Edit-img");
    setImage("");
  };

// console.log("image-croppe before axios", imgAfterCrop)
let token = localStorage.getItem("token");


console.log("props", props);


axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = trim(cookies[i]);
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

// const validateSelectedFile = () => {
//   const MIN_FILE_SIZE = 1024 // 1MB
//   const MAX_FILE_SIZE = 5120 // 5MB

//   // if (!selectedFile) {
//   //   setErrorMsg("Please choose a file");
//   //   setIsSuccess(false)
//   //   return
//   // }

//   const fileSizeKiloBytes = selectedFile.size / 1024

//   if(fileSizeKiloBytes < MIN_FILE_SIZE){
//     setErrorMsg("File size is less than minimum limit");
//     setIsSuccess(false)
//     return
//   }
//   if(fileSizeKiloBytes > MAX_FILE_SIZE){
//     setErrorMsg("File size is greater than maximum limit");
//     setIsSuccess(false)
//     return
//   }

//   setErrorMsg("")
//   setIsSuccess(true)
// };


  const handleChange = async (e) => {
    const formData = new FormData();
var image = new Image();
image.src = imgAfterCrop;
const myBase64 = imgAfterCrop;
const fileName = 'myProfile.jpg';

const file = b64toFile(myBase64, fileName);
  


console.log("Success", newImg);
console.log("image-cropped", file);
// formData.append('csrfToken', CSRFToken);
 formData.append('user_img', file);
 formData.append('token', token);


 var csrftoken = getCookie('csrftoken');
    console.log("from data", formData)
    await axios.post('http://192.168.11.100:8000/user/update_profile_img',formData, {
      headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "multipart/form-data",
          'X-CSRFToken': csrftoken


      }
  } ).then(res => {
            console.log("save Image",res);
           
    if( res.data.success === 'user_profile_image_updated_successfully'){
          props.handleInfo()
          setCurrentPage("Edit-img")
    }
        })
        .catch((err) => {
            console.log("err", err)
        });
}


const base64ToArrayBuffer = base64 => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
};


  return (
    <div className="container">
      {currentPage === "Edit-img" ? (
        <FileInput setImage={setImage} onImageSelected={onImageSelected} />
      ) : currentPage === "crop-img" ? (
        <ImageCropper
          image={image}
          onCropDone={onCropDone}
          onCropCancel={onCropCancel}
        />
      ) : (
        <div>
          <div>
            <img src={imgAfterCrop} className="cropped-img" />
          </div>

          <button
            onClick={() => {
              setCurrentPage("crop-img");
            }}
            className="btn"
          >
            Crop
          </button>

          <button
            onClick={() => {
              setCurrentPage("Edit-img");
              setImage("");
            }}
            className="btn"
          >
            New Image
          </button>

          <button className="btn" onClick={()=>{
            handleChange()
          }}> Save</button>
        </div>
      )}
    </div>
  );
}

export default ImageEdit;
