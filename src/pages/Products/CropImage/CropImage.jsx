import React, { useState, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedAreaPixels } from 'react-easy-crop';
// import '../../../react-easy-crop.css';

const ImageCropper = () => {
    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedImage, setCroppedImage] = useState(null);
    const imgRef = useRef(null);
  

 
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSrc(reader.result);
        setCroppedImage(null);
      };
      reader.readAsDataURL(file);
    };
  
    const onCropComplete = (_, croppedAreaPixels) => {
      if (imgRef.current && croppedAreaPixels) {
        const croppedImage = getCroppedImage(imgRef.current, croppedAreaPixels);
        setCroppedImage(croppedImage);
      }
    };
  
    const getCroppedImage = (image, croppedAreaPixels) => {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        image,
        croppedAreaPixels.x * scaleX,
        croppedAreaPixels.y * scaleY,
        croppedAreaPixels.width * scaleX,
        croppedAreaPixels.height * scaleY,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      return canvas.toDataURL('image/jpeg');
    };
  
    const handleSaveImage = () => {
      // Perform the save logic with the croppedImage data
      console.log('Cropped Image:', croppedImage);
      // Reset the state and clear the displayed cropped image
      setCroppedImage(null);
      setSrc(null);
    };
  
    return (
      <div className='my-5 pt-5'>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {src && (
          <div>
           <div style={{width:"200px", height:"200px"}}>
           <Cropper
              image={src}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              style={{
                containerStyle: {
                  width: "100%",
                  height: "80%",
                  backgroundColor: "#fff",
                },
              }}
            />
         
           </div>
           <div  className="position-relative">
       <div className="action-btns position-abslute bottom-0">
 

        <button className="btn btn-outline btn-info mx-2" onClick={()=>{
            
        }}>
          Cancel
        </button>

        <button
          className="btn btn-info mx-2"
          onClick={() => {
            // onCropDone(croppedArea);
          }}
        >
          Done
        </button>
      </div>
       </div>
           
            <img src={src} alt="Original" style={{ display: 'none' }} ref={imgRef} />
            {croppedImage && (
              <div>
                <h2>Cropped Image:</h2>
                <img src={croppedImage} alt="Cropped" />
                <button onClick={handleSaveImage} className='btn btn-info'>Save Image</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default ImageCropper;