import React, { useRef , useState } from "react";

function FileInput({ onImageSelected }) {
  const inputRef = useRef();
  const [errorMsg, setErrorMsg] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validateSelectedFile = (selectedFile) => {
    // const MIN_FILE_SIZE = 2048 // 1MB
    const MAX_FILE_SIZE = 1024 
  
 
    console.log("selected", selectedFile[0], selectedFile[0].size)
  
    const fileSizeKiloBytes = selectedFile[0].size / 1024
  


    console.log("fileSizeKiloBytes", fileSizeKiloBytes, MAX_FILE_SIZE, fileSizeKiloBytes > MAX_FILE_SIZE)

    if(fileSizeKiloBytes > MAX_FILE_SIZE){

      console.log("File size is greater than maximum limit")
      setErrorMsg("File size is greater than maximum limit 2M");
      setError("File size is greater than maximum limit 2M")
      setIsSuccess(false)
      return
    }else{
      setErrorMsg("")
      setError('')
      setIsSuccess(true)
    }
  
  
  };
  const handleOnChange = (event) => {
    validateSelectedFile(event.target.files);

    console.log("handleChange","errormsg",errorMsg, "isSuc",isSuccess, "error", error)
    if(isSuccess){
      if (event.target.files && event.target.files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function (e) {
          onImageSelected(reader.result);
        };
      }
    }
   
  };

  const onChooseImg = () => {
    inputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        
        ref={inputRef}
        onChange={handleOnChange}
        style={{ display: "none" }}
        accept="image/*"
      />
     
      <button className="btn" onClick={onChooseImg}>
        Change Image
      </button>
      <p className="text-danger">{errorMsg}</p>
    </div>
  );
}

export default FileInput;
