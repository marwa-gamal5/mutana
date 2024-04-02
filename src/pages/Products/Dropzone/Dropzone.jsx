
import style from "./Dropzone.module.css";
import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom'

import { useDispatch } from "react-redux";
import changeimageList from "../../../store/Actions/imagelist";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axiosInstance from "../../../axiosConfig/instanse";
import Swal from "sweetalert2";
import imgDelete from '../../../assets/product/delete.webp'
import imgClose from '../../../assets/exit-icon.webp'
const Dropzone = (props) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [validFiles, setValidFiles] = useState([]);
    const modalImageRef = useRef();
    const modalRef = useRef();
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);
    const [imageSent, setImageSent] = useState([]);
    const [imageRecive, setImageRecive] = useState([]);
    const [data, setData] = useState([]);
    const fileInputRef = useRef();

    const imgBack = useRef();
    const uploadModalRef = useRef();
    const uploadRef = useRef();
    const progressRef = useRef();

    const [imag, setImag] = useState([]);
    const [imagLength, setImagLength] = useState();

    const [show, setShow] = useState(false);
    const [images, setImages] = useState([]);
    // const  rl,setImageUrl = useState(null);

    const dispatch = useDispatch();


    const handleClose = () => {
        setShow(false)



    };

  let token = localStorage.getItem('token')
    function showAlert(message, icon) {
        Swal.fire({
          title: message,
          icon: icon,
          showConfirmButton: false,
          timer: 1500
        });
      }
    const handleFiles = (e) => {

        const files = e.target.files;
        console.log("files from handle: ", files)
        for (let i = 0; i < files.length; i++) {


            if (validateSelectedFile(files[i])) {
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
            } else {
                // add a new property called invalid
                files[i]['invalid'] = true;
                // add to the same array so we can display the name of the file
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
                // set error message
                setErrorMessage("Invalid Image Size Less than 100KB");

                setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
            }


        }


    }


    const fileSize = (size) => {
        if (size === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }

    const removeFile = (name) => {


        console.log('Removing file ', name)
        console.log('ValidateFilefile ', validFiles, selectedFiles, unsupportedFiles)

        const validFileIndex = validFiles.findIndex(ele => ele.fileInfo.name === name);
        validFiles.splice(validFileIndex, 1);
        // update validFiles array

        console.log("validfiles after remove file ", validFiles)
        setValidFiles([...validFiles]);
        const selectedFileIndex = selectedFiles.findIndex(ele => ele.name === name);
        selectedFiles.splice(selectedFileIndex, 1);
        // update selectedFiles array
        setSelectedFiles([...selectedFiles]);

        const unsupportedFileIndex = unsupportedFiles.findIndex(ele => ele.name === name);
        if (unsupportedFileIndex !== -1) {
            unsupportedFiles.splice(unsupportedFileIndex, 1);
            // update unsupportedFiles array
            setUnsupportedFiles([...unsupportedFiles]);
        }
    }

    const openImageModal = (file) => {
        const reader = new FileReader();
        modalRef.current.style.display = "block";
        console.log("file in open model", file.fileInfo);
        reader.readAsDataURL(file.fileInfo);
        reader.onload = function (e) {
            console.log("modelImage", modalImageRef);
            modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
        }

    }


    const closeModal = () => {
        modalRef.current.style.display = "none";
        modalImageRef.current.style.backgroundImage = 'none';
    }



    const uploadFiles = (e) => {
        e.preventDefault();
        // uploadModalRef.current.style.display = 'block';
        // uploadRef.current.innerHTML = 'File(s) Uploading...';
        console.log(validFiles);
        const formData = new FormData();
        console.log("props.id", props.id)
        for (let i = 0; i < validFiles.length; i++) {

            if(validFiles[i].fileInfo.invalid){
              showAlert('one of images invalid','error')
            }else{
              console.log("one of images[]", validFiles[i].fileInfo)
              formData.append('images_list', validFiles[i].fileInfo)
            }
            
    
        }


        formData.append('id', props.id)
      

        axiosInstance.post('/store/add_certificates', formData,{
            headers: {
              "Authorization": `Token ${token}`,
              "Content-Type": "multipart/form-data"
            
      
      
          }
          }).then(res => {
            console.log("res upload cert", res)
          
            if(res.data.success){
                showAlert(res.data.success, 'success')
                props.close()
            }
        })
            .catch((err) => {

                console.log("error", err)
                // uploadRef.current.innerHTML = `<span class="error">Error Uploading File(s)</span>`;

                // progressRef.current.style.backgroundColor = 'red';
            });


    }


    console.log("alldata upload", imageRecive)
    const base64ToArrayBuffer = base64 => {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    };





    const validateSelectedFile = (selectedFile) => {
        // const MIN_FILE_SIZE = 2048 // 1MB
        const MAX_FILE_SIZE = 100 // 


        console.log("selected", selectedFile, selectedFile.size)

        const fileSizeKiloBytes = selectedFile.size / 1024



        console.log("fileSizeKiloBytes", fileSizeKiloBytes, MAX_FILE_SIZE, fileSizeKiloBytes > MAX_FILE_SIZE)

        if (fileSizeKiloBytes > MAX_FILE_SIZE) {


            //   setErrorMsg("File size is greater than maximum limit 2M");

            //   setIsSuccess(false)
            return false;
        } else {
            return true;
        }


    };




    useEffect(() => {
        let filteredArray = selectedFiles.reduce((file, current) => {

            // console.log("current", file, current);
            const x = file.find(item => item.name === current.name);
            if (!x) {
                return file.concat([current]);
            } else {
                return file;
            }
        }, []);




        const imageDataUrlsss = [];

        filteredArray.map((file) => {



            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                const imageDataUrl = reader.result;
                imageDataUrlsss.push({ fileName: imageDataUrl, fileInfo: file });


                console.log("imagesurlssss in on load", imageDataUrlsss);
                setValidFiles(imageDataUrlsss);
                setImagLength(imageDataUrlsss.length)


            }


        });
        const img = [];
        console.log("befor iffff", imageDataUrlsss);

        console.log("imaaaaaaage", img)
        dispatch(changeimageList(img));



    }, [selectedFiles]);

    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'
    console.log("data", data)

    console.log("validatedata", validFiles)
    return (
        <>


            <div className="">

                <div className={`${style.Drop} `}>

                    <div className='container '>
                        <div className="row justify-content-center">
                            <div className='col-lg-12 my-2 '>
                                <div >
                                    <div className="content ">
                                        <form onSubmit={uploadFiles}>

                                            <div className={`${style.container} `}>


                                                <div className={`${style.drop_container} w-100`}
                                                >



                                                    <div className={`${style.drop_message}`}>
                                                        <input
                                                            ref={fileInputRef}
                                                            className="file-input d-block form-control"
                                                            type="file"
                                                            multiple
                                                            onChange={handleFiles}
                                                            name="file"
                                                            accept="image/*"
                                                        />
                                                        {/* <div className={`${style.upload_icon} `}></div> */}

                                                    </div>
                                                </div>





                                            </div>
                                            <div className=' my-2 ' >
                                <div className={`${style.displayImg} file-display-container p-3`} style={{ maxHeight: "280px", overflowY: "scroll" }}>

                                  {props.cert == "cert" ?
                                  (
                                    <div className="row">
                                    {

                                        validFiles.map((data, i) =>

                                            <div className="col-3   my-1" key={i} >


                                                <div className="  position-relative ">

                                                    <img className="me-2 rounded w-100 " src={data.fileName}  height={60} alt="" />
                                                    <Link className='position-absolute rounded-circle ' style={{ bottom: "20px", right: "5px", padding:"2px 8px" ,backgroundColor:'#ffffff'}} onClick={() => removeFile(data.fileInfo.name)}>
                                                        <img src={imgDelete} width={14} height={14} alt=""/>
                                                    </Link>
                                                

                                                    <div className="d-flex flex-column">

                                                        <small className=" fs-10" style={{ fontSize: "12px" }}>({fileSize(data.fileInfo.size)})</small> {data.fileInfo.invalid && <small className='text-danger fs-10' style={{ fontSize: "12px" }}>({errorMessage})</small>}
                                                    </div>
                                                    {/* <div className="d-flex justified-content-between position-absolute" style={{ top: "20px" }}>
                                                        <div className=" font-weight-bold mx-1" >
                                                            <i class="far fa-eye icon-color" onClick={() => { openImageModal(data) }}></i>

                                                        </div>
                                                        <div className=" font-weight-bold mx-1" >
                                                            <Link className='fas fa-trash icon-color ' onClick={() => removeFile(data.fileInfo.name)}>
                                                            </Link>
                                                        </div>

                                                    </div> */}
                                                </div>



                                            </div>
                                        )
                                    }
                                </div>
                                  ):(
                                    <div className="row">
                                    {

                                        validFiles.map((data, i) =>

                                            <div className="col-3   my-1" key={i} >


                                                <div className="  position-relative ">

                                                    <img className="me-2 rounded w-100 " src={data.fileName}  height={60} alt="" />
                                                    {/* <Link className='position-absolute rounded-circle ' style={{ bottom: "20px", right: "5px", padding:"2px 8px" ,backgroundColor:'#ffffff'}} onClick={() => removeFile(data.fileInfo.name)}>
                                                        <img src={imgDelete} width={14} height={14} alt=""/>
                                                    </Link> */}
                                                

                                                    <div className="d-flex flex-column">

                                                        <small className=" fs-10" style={{ fontSize: "12px" }}>({fileSize(data.fileInfo.size)})</small> {data.fileInfo.invalid && <small className='text-danger fs-10' style={{ fontSize: "12px" }}>({errorMessage})</small>}
                                                    </div>
                                                    <div className="d-flex justified-content-between position-absolute" style={{ top: "20px" }}>
                                                        <div className=" font-weight-bold mx-1" >
                                                            <i class="far fa-eye icon-color" onClick={() => { openImageModal(data) }}></i>

                                                        </div>
                                                        <div className=" font-weight-bold mx-1" >
                                                            <Link className='fas fa-trash icon-color ' onClick={() => removeFile(data.fileInfo.name)}>
                                                            </Link>
                                                        </div>

                                                    </div>
                                                </div>



                                            </div>
                                        )
                                    }
                                </div>
                                  )}
                                </div>
                            </div>
                                            <div className=" text-center my-3 ">
                                                <button type="submit" className={` btn btnCreateAddd `} >Save</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                         

                            <div className="modal" ref={modalRef}>
                                <div className="overlay"></div>
                                <span className="close" onClick={(() => closeModal())} style={{ cursor: "pointer" }}>
                                     <img src={imgClose} alt="" width={16} height={16}/>
                                </span>
                                <div className="modal-image" ref={modalImageRef}></div>
                            </div>


                        </div>


                    </div>

                </div>

            </div>
        </>
    )
}

export default Dropzone;






