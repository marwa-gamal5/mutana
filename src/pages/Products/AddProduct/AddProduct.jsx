import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from '../../../axiosConfig/instanse';
import Sidebar from '../../../components/AdminSidebar/AdminSidebar';

import cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select'

import EditFile from '../CropImage/ImageEdit'
import Dropzone from '../Dropzone/Dropzone';
import axios from 'axios'
import { useDispatch } from "react-redux";
import changeimageList from "../../../store/Actions/imagelist";
import style from "./AddProduct.module.css"

import Accordion from 'react-bootstrap/Accordion';
import closeImg from '../../../assets/exit-icon.webp'
import editImg from '../../../assets/product/edit.webp'
import deleteImg from '../../../assets/product/delete.webp'


import * as yup from "yup"


import Validation from '../../../components/validation.js'




export default function AddProduct() {
//////////////////////////////////////
    const [isLoading , setIsLoading]=useState(false)
    const [values, setValues]=useState({})
    const [errors, setErrors]=useState({})


    const handleInput=(theName, theValue)=>{
        const newData ={...values,[theName]:theValue}
        setValues(newData)
        console.log(values,"sssssssssssss")

    }


    // if(s===false && w===false){
    //     // handleInput("sizeOrWeight","sw")
    //     console.log("kkkkkkkkkkkkkkk")

    // }else{
    //     console.log("kkkkkkkkkkkkkkk, trueee")
    // }

    const formValidation = ()=>{
        setErrors(Validation(values))
        let allErrors = Validation(values)
        // if(s===false && w===false){
        //     handleInput("sizeOrWeight","sw")
        //     console.log("vvv,no data")
        //
        // }else{
        //     console.log("vvv,have data")
        // }
        if(Object.keys(allErrors).length == 0){
            console.log(Object.keys(allErrors).length ,allErrors, "no errors ");
            setIsLoading(true)
            formSubmit();

        }

        console.log(Object.keys(allErrors).length ,allErrors, "qqqq" +
            " ");
    }

    ///////////////////////////////////////

  const [name, setName] = useState([]);
  const [Sizename, setSizeName] = useState([]);
  const [address, setAddress] = useState([]);
  const [ingrediant, setingrediant] = useState([]);
  const [howtouse, sethowtouse] = useState([]);
  const [benfites, setbenfites] = useState([]);
  const [certificate, setcertificate] = useState([]);
  const [Sizedescription, setSizeDescription] = useState([]);
  const [Price, setPrice] = useState([]);
  const [SizePrice, setSizePrice] = useState([]);
  const [SizeGlobalPrice, setSizeGlobalPrice] = useState([]);
  const [SizeValue, setSizeValue] = useState([]);
  const [SizeUnit, setSizeUnit] = useState([]);
  const [SizeStock, setSizeStock] = useState([]);
  const [SizeMax_Order, setSizeMax_Order] = useState([]);
  const [Image, setImage] = useState([]);
  const [SizeImage, setSizeImage] = useState([]);
  const [Vendor, setVendor] = useState([]);
  const [VendorOption, setVendorOption] = useState([]);
  const [Store, setStore] = useState([]);
  const [StoreOption, setStoreOption] = useState([]);
  const [Category, setCategory] = useState([]);
  const [CategoryOption, setCategoryOption] = useState([]);
  const [Country, setCountry] = useState([]);
  const [CountryOption, setCountryOption] = useState([]);
  const [sizeOeWeight, setsizeOeWeight] = useState([]);
  const [Notes, setNotes] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [stateError, setStateError] = useState(false);
  const [stateError1, setStateError1] = useState(false);
  const [weightOption, setweightOption] = useState([
    {value:'kg',label:'kg'},
    {value:'pound',label:"Pound"}
  ]);
  const [sizeOption, setsizeOption] = useState([
    {value:'EG',label:'EG'},
    {value:'EU',label:"EU"}
  ]);





  const langList = useSelector(state => state.langList.langList);



  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  const currentLanguageCode = useSelector((state) => state.language.lang);

  function showAlert(message, icon) {
    Swal.fire({
      title: message,
      icon: icon,
      showConfirmButton: false,
      timer: 2000
    });
  }

//   const validateSelectedFile = (selectedFile) => {

//     console.log("validate ", selectedFile);

//     const MAX_FILE_SIZE = 100

//     console.log("selected", selectedFile, selectedFile.size)

//     const fileSizeKiloBytes = selectedFile.size / 1024

//     console.log("fileSizeKiloBytes", fileSizeKiloBytes, MAX_FILE_SIZE, fileSizeKiloBytes > MAX_FILE_SIZE)

//     if (fileSizeKiloBytes > MAX_FILE_SIZE) {
//         return false;
//     } else {
//         return true;
//     }
// };

  const [errorMessage1, setErrorMessage1] = useState('');
    const [invalid, setInvalid] = useState(false);
    const filesSelected = (e, index, test) => {
        let file = e.target.files[0];
        console.log(e.target.files,"fffffffffffffff")
        let fileIndex = index;

        if (validateSelectedFile(file) === false) {
            setInvalid(true);
            setErrorMessage1("File size is greater than the maximum limit (100KB)");
        } else {
            setInvalid(false);
            setErrorMessage1("");

            // Read the selected image and get its dimensions
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new window.Image();
                img.onload = () => {
                    // Check if width and height are equal
                    if (img.naturalWidth !== img.naturalHeight) {
                        // Show alert if width and height are not equal
                        // event.target.result=''

                        alert("Width and height must be equal!");

                        // Reset the input element to allow the user to select another file

                        // e.target.value = ''
                        console.log(e.target.name,"trtrtrtr")
                        // const theValue = e.target.value
                        const   theName = e.target.name
                        handleInput(theName,'')


                        // Optionally, you can delete the selected file from the state or do any other necessary cleanup
                        if (test === "add") {
                            // Delete the selected file from the Image state array
                            Image.splice(fileIndex, 0);
                            setImage([...Image]);
                        } else {
                            // Delete the selected file from the SizeImage state array
                            SizeImage.splice(fileIndex, 1);
                            setSizeImage([...SizeImage]);
                        }
                    } else {
                        // Set the image in state based on the 'test' parameter
                        if (test === "add") {
                            Image[fileIndex] = file;

                            setImage([...Image]);
                            console.log(e.target.value,"rreeer")
                            const theValue = e.target.value
                            const   theName = e.target.name
                            handleInput(theName,theValue)

                        } else {
                            SizeImage[fileIndex] = file;
                            setSizeImage([...SizeImage]);
                            console.log(e.target.value,"rreeer")
                            const theValue = e.target.value
                            const   theName = e.target.name
                            handleInput(theName,theValue)

                        }
                    }
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    // const filesSelected = (e, index,test) => {
    //
    //
    //       let file = e.target.files[0]
    //       let fileIndex = index;
    //     if (validateSelectedFile(e.target.files[0]) == false) {
    //         setInvalid(true)
    //         setErrorMessage1("File size is greater than maximum limit 100KB");
    //
    //     }
    //     else {
    //         setInvalid(false)
    //         setErrorMessage1("");
    //
    //
    //         if(test === 'add'){
    //           Image[fileIndex] = file;
    //           setImage([...Image]);
    //         }else{
    //           SizeImage[fileIndex] = file;
    //           setSizeImage([...SizeImage]);
    //         }
    //     }
    //
    // }



 // function sendDataFun(){
 //     if(Object.keys(errors).length === 0){
 //         console.log(Object.keys(errors).length ,errors, "rrr");
 //
 //     }
 //    }
    // console.log(errors, "33333333333333333333333333");
  const formSubmit = async () => {
      // setErrors(Validation(values))
      const formData = new FormData();

      formData.append('token', token);
      formData.append('name', name[0]);
      formData.append('ingredients', ingrediant[0]);
      formData.append('benifits', benfites[0]);
      formData.append('how_to', howtouse[0]);
      formData.append('seller_id',1);
      formData.append('cat_id',Category[0]);
      formData.append('store_id',Store[0]);
      formData.append('country',Country[0]);
      formData.append('vendor_id',Vendor[0]);
      formData.append('size_or_weight',sizeOeWeight[0]);
      formData.append('notes',Notes[0]);
      formData.append('image',Image[0]);
      formData.append('thumbnail',Image[0]);
      await axiosInstance.post(`store/add_product`,formData, {
          headers: {
              "Authorization": `Token ${token}`,
              "Content-Type": "multipart/form-data"

          }}).then(res => {
          console.log(res,"oooooooooooooooooo")
          if (res.data.success) {

              setIsLoading(false)
              let itemId = res.data.id;
              languageList.map((lang, index) => {
                  let langCode = lang.code;
                  let LangIndex = index + 1;
                  if (stateError == false) {

                      addProductT(itemId, langCode, LangIndex);
                  }else{
                      console.log("qq")

                  }

              })

          } else {

              showAlert(res.data.error, "error");
              setIsLoading(false)
          }

      }).catch(err => {
          setIsLoading(false)
          console.log("err one", err);
          showAlert(err,"error")
      })

  };


  async function addProductT(itemId, langCode, LangIndex) {

    let id = itemId;
    let lang = langCode;
    let index = LangIndex;

    await axiosInstance.post(`store/add_product_T`,
      {
        token: token,
        id: id,
        lang: lang,
        name: name[index],

        // address: address[index],
        // description: description[index] ,
        seller_id: 1,
        how_to:howtouse[index],
        benifits:benfites[index],
        ingredients:ingrediant[index],


      }
    ).then(res => {

      if (res.data.error) {

        showAlert(res.data.error, "error");
        setStateError(true);
      } else {

         if (LangIndex == languageList.length) {
          addSizeOrWeight(id)
          // showAlert(res.data.success, "success");
          // navigate("/store");
        }
      }



    }).catch(err => {
      console.log("err t", err);
    });

  }
  async function addSizeOrWeight(itemId) {

    const formData = new FormData();
    for (let i = 0; i < validFiles.length; i++) {

        if(validFiles[i].fileInfo.invalid){
          showAlert('one of images invalid','error')
        }else{

          formData.append('images_list', validFiles[i].fileInfo)
        }
        

    }
console.log(itemId,formData['image_list'],SizeImage,"yyyyyyyyyyyy")
    formData.append('token', token);
    formData.append('id', itemId);
    formData.append('image', SizeImage[0]);
    formData.append('thumbnail', SizeImage[0]);
    formData.append('name', Sizename[0]);
    formData.append('description', Sizedescription[0]);
    formData.append('seller_id', 1);
    formData.append('price', SizePrice[0]);
    formData.append('global_price', SizeGlobalPrice[0]);
    formData.append('stock', SizeStock[0]);
    formData.append('unit', SizeUnit[0]);
    formData.append('max_order', SizeMax_Order[0]);
    formData.append('size_or_weight',sizeOeWeight[0]);
    formData.append('value',SizeValue[0]);
    
    await axiosInstance.post(`store/add_size_weight`,formData,{
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "multipart/form-data"
      


    }
    }
     
    ).then(res => {
      console.log("res size or Weight ", res);
      if (res.data.success) {
        console.log("add res", res)
        let itemId = res.data.id;
        languageList.map((lang, index) => {
          let langCode = lang.code;
          let LangIndex = index + 1;
          console.log(langCode);
          console.log(stateError1);
          if (stateError1 == false) {
            console.log(stateError1);

            addSizeOrWeightT(itemId, langCode, LangIndex);
          }

        })

      } else {
        console.log("res one from else :", res.data.error);
        showAlert(res.data.error, "error");
      }



    }).catch(err => {
      console.log("err ", err);
    });

  }


  async function addSizeOrWeightT(itemId, langCode, LangIndex) {
    console.log("additemT", itemId, "index", LangIndex)
    let id = itemId;
    let lang = langCode;
    let index = LangIndex;
    console.log(Sizename[index]);
    await axiosInstance.post(`store/add_size_weight_T`,
      {
        token: token,
        id: id,
        lang: lang,
        name: Sizename[index],
        // address: address[index],
        description: Sizedescription[index] ,
        seller_id: 1,
        size_or_weight:sizeOeWeight[0]


      }
    ).then(res => {
      console.log("res t", res);
      if (res.data.error) {
        console.log("res t from if error :", res.data.error);
        showAlert(res.data.error, "error");
        //
        setStateError1(true);
      } else {
        console.log(LangIndex);
        console.log(languageList.length);
        if (LangIndex === languageList.length) {
          // addSizeOrWeight(id)
          showAlert(`Product Added Successfuly`, "success");
          navigate('/product')
        
        }
      }



    }).catch(err => {
      console.log("err t", err);
    });

  }

  useEffect(() => {
    setLanguageList(langList);

   
  }, [langList, name, address]);


  const cat = [];
  const getAllCategories = async () => {

    await axiosInstance.post(`/store/view_all_categories_admin`, {
      token: token,
      lang: currentLanguageCode

    })
      .then(response => {



        // setCategory(response.data.success);

        response.data.success.map((ele, index) => {
          cat.push({ value: ele.org.id, label: ele.org.name });
        })

        setCategoryOption(cat)
      })
      .catch(error => {
        console.log("error", error);
      });
  };
  const count = [];
  const getAllCountry = async () => {

    await axiosInstance.post(`/user/countries`, {
      token: token,
      lang: currentLanguageCode

    })
      .then(response => {



        // setCategory(response.data.success);

        response.data.countries.map((ele, index) => {
          count.push({ value: ele[0], label: ele[1] });
        })

        setCountryOption(count)
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  const st = [];
  async function getStore() {
    await axiosInstance.post(`store/view_all_stores`, {
      token: token,
      lang: currentLanguageCode,
      seller_id: 1
    }).then(res => {

      // setStore(res.data.success);
      res.data.success.map((ele, index) => {
        st.push({ value: ele.org.id, label: ele.org.name });
      })

      setStoreOption(st)
    }).catch(err => {
      console.log(err);
    });
  }

  const ve = [];
  async function getVendors() {
    await axiosInstance.post(`store/view_all_vendors`, {
      token: token,
      lang: currentLanguageCode
    }).then(res => {


      res.data.success.map((ele, index) => {
        ve.push({ value: ele.org.id, label: ele.org.name });
      })
      setVendorOption(ve)
    }).catch(err => {
      console.log(err);
    });
  }
  useEffect(() => {
    getAllCategories()
    getAllCountry()
    getStore()
    getVendors()
  }, []);






  //################################### dropzone code #####################################

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFiles1, setSelectedFiles1] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage11, setErrorMessage11] = useState('');
  const [validFiles, setValidFiles] = useState([]);
  const [validFiles1, setValidFiles1] = useState([]);
  const modalImageRef = useRef();
  const modalRef = useRef();
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [unsupportedFiles1, setUnsupportedFiles1] = useState([]);
  const [imageSent, setImageSent] = useState([]);
  const [imageRecive, setImageRecive] = useState([]);
  const [imageRecive1, setImageRecive1] = useState([]);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const fileInputRef = useRef();

  const imgBack = useRef();
  const uploadModalRef = useRef();
  const uploadRef = useRef();
  const progressRef = useRef();

  const [imag,setImag] = useState([]);
  const [imagLength,setImagLength] = useState();


  const [images, setImages] = useState([]);
  // const  rl,setImageUrl = useState(null);

  const dispatch =  useDispatch();



    const handleFiles = async (e, test) => {
        const files = e.target.files;
        console.log(e,"rrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
        var theValue = e.target.value;
        const maxFiles = 5; // Set your desired maximum number of files here

        console.log(files.length,"awwwwww")
        if (files.length > maxFiles) {
            showAlert(`You can only upload a maximum of ${maxFiles} files.`, 'error');
            e.target.value = null; // Clear the selected files

            return;
        }

        const validFiles = [];
        const dimensionMismatchFiles = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log(file,"fileeeeewww")
            const validationResult = await validateSelectedFile(file);

            if (validationResult === true) {
                validFiles.push(file);
            } else if (validationResult === false) {
                dimensionMismatchFiles.push(file);

            } else {
                showAlert('Invalid Image Size: Images should be less than 100KB.', 'error');
                // e.target.value=''work
                 theValue = ''
                const   theName = e.target.name
                handleInput(theName,theValue)
                console.log(e.target.name,'llllllllllldsdllllll')
            }
        }

        setSelectedFiles(test === 'imgs' ? validFiles : []);

        if (dimensionMismatchFiles.length > 0) {
            showAlert('Image width and height must be equal for the following images:', 'error');
            // e.target.value = ''
             theValue = ''
            const   theName = e.target.name
            handleInput(theName,theValue)
            console.log(e.target.value,'llllllllllldsdllllll')
            dimensionMismatchFiles.forEach((file) => {
                showAlert2(file.name, 'error');
            });
        }
    };













    //////////////////////////////////////////

    const validateSelectedFile = (file) => {
        if (file.size > 100 * 1024) {
            return null; // Invalid image size
        }

        // Create a new Image element to check dimensions
        const img = new window.Image();
        img.src = URL.createObjectURL(file);
        console.log(img.src,"qwqwqwqwqwqw")

        return new Promise((resolve) => {
            img.onload = () => {
                // Check if width and height are equal
                if (img.naturalWidth === img.naturalHeight) {
                        const theValue = img.src;
                    const   theName ='imgList';
                    handleInput(theName,theValue)
                    console.log(theValue,theName,'llllllllllldsdllllll')
                    resolve(true);

                } else {
                    resolve(false); // Width and height are not equal
                }
            };
        });
    };

    // Assuming you have the showAlert function implemented
    const showAlert2 = (message, type) => {
        // Implement the logic to display the alert
        console.log(`${type.toUpperCase()}: ${message}`);
        // You can use libraries like react-toastify or implement your custom alert component
    };


    // const handleFiles = (e ,test) => {
  //
  //     const files = e.target.files;
  //
  //     console.log("files from handle: ", files)
  //    if(test === "imgs"){
  //     const maxFiles = 5; // Set your desired maximum number of files here
  //
  //     if (files.length > maxFiles) {
  //       showAlert(`You can only upload a maximum of  ${ maxFiles }  files.`,'error');
  //       e.target.value = null; // Clear the selected files
  //       return;
  //     }
  //     for (let i = 0; i < files.length; i++) {
  //
  //
  //       if (validateSelectedFile(files[i])) {
  //           setSelectedFiles(prevArray => [...prevArray, files[i]]);
  //       } else {
  //           // add a new property called invalid
  //           files[i]['invalid'] = true;
  //           // add to the same array so we can display the name of the file
  //           setSelectedFiles(prevArray => [...prevArray, files[i]]);
  //           // set error message
  //           setErrorMessage("Invalid Image Size Less than 100KB");
  //
  //           setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
  //       }
  //
  //
  //   }
  //    }else{
  //
  //
  //     for (let i = 0; i < files.length; i++) {
  //
  //
  //       if (validateSelectedFile(files[i])) {
  //           setSelectedFiles1(prevArray => [...prevArray, files[i]]);
  //       } else {
  //           // add a new property called invalid
  //           files[i]['invalid'] = true;
  //           // add to the same array so we can display the name of the file
  //           setSelectedFiles1(prevArray => [...prevArray, files[i]]);
  //           // set error message
  //           setErrorMessage1("Invalid Image Size Less than 100KB");
  //
  //           setUnsupportedFiles1(prevArray => [...prevArray, files[i]]);
  //       }
  //
  //
  //   }
  //    }
  //
  //
  // }


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

  const removeFile = (name, test) => {


      console.log('Removing file ',  name , "##############", test)


      if(test == "imgs"){
        const validFileIndex = validFiles.findIndex(ele => ele.fileInfo.name === name);
      validFiles.splice(validFileIndex, 1);
      // update validFiles array

      console.log("validfiles after remove file ", validFiles.length)
          if (validFiles.length === 0) {
              const theValue = ''
              const   theName = 'imgList'
              handleInput(theName,theValue)



          }
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
      }else{
        const validFileIndex = validFiles1.findIndex(ele => ele.fileInfo.name === name);
      validFiles1.splice(validFileIndex, 1);
      // update validFiles array

      console.log("validfiles after remove file ", validFiles)
      setValidFiles1([...validFiles1]);
      const selectedFileIndex = selectedFiles.findIndex(ele => ele.name === name);
      selectedFiles1.splice(selectedFileIndex, 1);
      // update selectedFiles array
      setSelectedFiles1([...selectedFiles1]);

      const unsupportedFileIndex = unsupportedFiles1.findIndex(ele => ele.name === name);
      if (unsupportedFileIndex !== -1) {
          unsupportedFiles1.splice(unsupportedFileIndex, 1);
          // update unsupportedFiles array
          setUnsupportedFiles1([...unsupportedFiles1]);
      }
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



  // const uploadFiles = (e) => {
  //     e.preventDefault();
  //     uploadModalRef.current.style.display = 'block';
  //     uploadRef.current.innerHTML = 'File(s) Uploading...';
  //     console.log(validFiles);
  //     const formData = new FormData();
  //     for (let i = 0; i < validFiles.length; i++) {

  //         formData.append('images[]', validFiles[i])
  //     }
  // }


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





  // const validateSelectedFile = (selectedFile) => {
  //     // const MIN_FILE_SIZE = 2048 // 1MB
  //     const MAX_FILE_SIZE = 100 //
  //
  //
  //     console.log("selected", selectedFile, selectedFile.size)
  //
  //     const fileSizeKiloBytes = selectedFile.size / 1024
  //
  //
  //
  //     console.log("fileSizeKiloBytes", fileSizeKiloBytes, MAX_FILE_SIZE, fileSizeKiloBytes > MAX_FILE_SIZE)
  //
  //     if (fileSizeKiloBytes > MAX_FILE_SIZE) {
  //
  //
  //
  //         return false;
  //     } else {
  //         return true;
  //     }
  //
  //
  // };





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
         const img = [] ;
      console.log("befor iffff", imageDataUrlsss);

     console.log("imaaaaaaage", img)
      dispatch(changeimageList(img));

  }, [selectedFiles]);
  useEffect(() => {
      let filteredArray = selectedFiles1.reduce((file, current) => {

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
              setValidFiles1(imageDataUrlsss);
              setImagLength(imageDataUrlsss.length)
             
             
          }


      });
    //      const img = [] ;
    //   console.log("befor iffff", imageDataUrlsss);

    //  console.log("imaaaaaaage", img)
      // dispatch(changeimageList(img));

  }, [selectedFiles1]);


  return (

    <>
      <Sidebar />

      <div id='home_page' className='page-section-home min-vh-100'>

          <div className='d-flex justify-content-between'>


              <h3 className="m-2">
                  {/* <i className="fa-regular fa-square-plus me-3" style={{ color: "#CD5C5C " }}></i> */}
                  Add Product
              </h3>
              {/* <Link to="/store" className='fa-solid fa-arrow-right text-danger fs-2 text-decoration-none'></Link> */}
          </div>

          <form className="my-3 create_accont">
              <div className='row'>
                  {/* Product Name */}
                  <div className='col-lg-3'>
                      <label className="text-muted my-2">Product Name</label>
                      <input className=" form-control mb-3 input" type="text"
                             placeholder="Product Name"
                             required autoFocus
                             name='productName'
                             onChange={(e) => {
                                 const theValue = e.target.value
                                 const   theName = e.target.name
                                 handleInput(theName,theValue)
                                 // setName([e.target.value])
                                 name[0] = e.target.value;
                                 setName([...name]);
                             }}/>
                      {errors.productName && <p style={{color:'red'}}>{errors.productName}</p>}

                  </div>
                  {/* <div className='col-lg-4'>
              <label className="text-muted my-2">Ingrediant</label>
              <textarea rows="1"  className=" form-control mb-3 input" type="text"
                placeholder="Ingrediant"
                required autoFocus
                onChange={(e) => {
                 
                  ingrediant[0] = e.target.value;
                  setingrediant([...ingrediant]);
                }} ></textarea>
            </div>
            <div className='col-lg-4'>
              <label className="text-muted my-2">How to use</label>
              <textarea rows="1"  className=" form-control mb-3 input" type="text"
                placeholder="How to use"
                required autoFocus
          
                onChange={(e) => {
                
                  howtouse[0] = e.target.value;
                  sethowtouse([...howtouse]);
                }}  ></textarea>
              
            </div>
            <div className='col-lg-4'>
              <label className="text-muted my-2">Benfites</label>
              <textarea rows="1"  className=" form-control mb-3 input" type="text"
                placeholder="Benfites"
                required autoFocus
          
                onChange={(e) => {
                
                  benfites[0] = e.target.value;
                  setbenfites([...benfites]);
                }}  ></textarea>
              
            </div> */}
                  {/*Select Image*/}
                  <div className='col-lg-3'>
                      <label className="text-muted my-2">Select Image</label>
                      <div className={`d-flex flex-column`}>
                          <input
                              required autoFocus
                              className="file-input d-block form-control"
                              type="file"
                              onChange={(e) => {

                                  filesSelected(e, 0, 'add')
                                  const theValue = e.target.value
                                  const   theName = e.target.name
                                  handleInput(theName,theValue)
                                  console.log(e.target.value,"YTYTYTYTY")
                              }}
                              name="mainImage"
                              accept="image/*"

                          />
                          {errors.mainImage && <p style={{color:'red'}}>{errors.mainImage}</p>}
                          <br/>
                      </div>
                      <p className="text-danger">{errorMessage1}</p>
                  </div>
                  {/*Country*/}
                  <div className='col-lg-3'>
                      <label className="text-muted my-2">Country</label>
                      <Select name="country" options={CountryOption}  onChange={(e) => {
                          console.log("  aaaaaaaaaaaaaa", e.label)
                          Country[0] = e.value;
                          setCountry([...Country]);
                          const theValue = e.label
                          const   theName = "country"
                          handleInput(theName,theValue)
                      }} />
                      {errors.country && <p style={{color:'red'}}>{errors.country}</p>}

                  </div>
                  {/*Vendor*/}
                  <div className='col-lg-3'>
                      <label className="text-muted my-2">Vendor</label>
                      <Select options={VendorOption} onChange={(e) => {
                          console.log("selected urllllllllllllll", e)
                          Vendor[0] = e.value;
                          setVendor([...Vendor]);
                          const theValue = e.label
                          const   theName = "vendorr"
                          handleInput(theName,theValue)
                      }}/>
                      {errors.vendorr && <p style={{color:'red'}}>{errors.vendorr}</p>}


                  </div>
                  {/*Store*/}
                  <div className='col-lg-4'>
                      <label className="text-muted my-2">Store</label>
                      <Select options={StoreOption} onChange={(e) => {
                          console.log("selected urllllllllllllll", e)
                          Store[0] = e.value;
                          setStore([...Store]);
                          const theValue = e.label
                          const   theName = "storee"
                          handleInput(theName,theValue)
                      }}/>
                      {errors.storee && <p style={{color:'red'}}>{errors.storee}</p>}


                  </div>
                  {/*Category*/}
                  <div className='col-lg-4'>
                      <label className="text-muted my-2">Category</label>
                      <Select options={CategoryOption} onChange={(e) => {
                          console.log("selected yyyyyyyyyyy", e)
                          Category[0] = e.value;
                          setCategory([...Category]);
                          const theValue = e.label
                          const   theName = "categoryy"
                          handleInput(theName,theValue)
                      }}/>
                      {errors.categoryy && <p style={{color:'red'}}>{errors.categoryy}</p>}

                  </div>
                  {/* <div className='col-lg-4'>
              <label className="text-muted my-2">Notes</label>
              <input className=" form-control mb-3 input" type="text"
                placeholder="Notes"
                required autoFocus
                onChange={(e) => {
                  // setAddress([e.target.value])
                  Notes[0] = e.target.value;
                  setNotes([...Notes]);
                }} />

            </div> */}
                  {/*Size Or Weight*/}
                  <div className='col-lg-4'>
                      <label className="text-muted my-2">Size Or Weight</label>
                      <div className='form-control d-flex justify-content-between'>
                          <div>
                              <input type="radio" name="sizeOrWeight" selected={sizeOeWeight == 'size'} className='mx-2'
                                     value="size"
                                     onChange={(e) => {
                                         // setAddress([e.target.value])
                                         sizeOeWeight[0] = e.target.value;
                                         setsizeOeWeight([...sizeOeWeight]);

                                         const newData ={...values,['sizeOrWeight']:'size'}
                                         setValues(newData)
                                     }}/>
                              <label htmlFor="size">Size</label>
                          </div>

                          <div>
                              <input type="radio" name="sizeOrWeight" selected={sizeOeWeight == 'weight'}
                                     className='mx-2' value="weight"
                                     onChange={(e) => {
                                         // setAddress([e.target.value])
                                         sizeOeWeight[0] = e.target.value;
                                         setsizeOeWeight([...sizeOeWeight]);



                                         const newData ={...values,['sizeOrWeight']:'weight'}
                                         setValues(newData)
                                     }}/>
                              <label htmlFor="weight">Weight</label>
                          </div>
                      </div>
                      {errors.sizeOrWeight && <p style={{color:'red'}}>{errors.sizeOrWeight}</p>}

                  </div>

                  {languageList.map((lang, index) => {
                      let langDir = "ltr";
                      if (lang.rtl == true) {
                          langDir = "rtl";
                      } else {
                          langDir = "ltr";
                      }
                      return (
                          <>
                              <div dir={langDir} className='col-12'>
                                  <h2>{lang.name}</h2>
                                  <div className='row'       >
                                      {/*Product Name TE*/}
                                      <div className='col-lg-3'>
                                          <label className="text-muted my-2">Product Name</label>
                                          <input className=" form-control mb-3 input" type="text"
                                                 placeholder="Product Name"

                                                 required autoFocus
                                                 onChange={(e) => {
                                                     let fieldIndex = index + 1;
                                                     name[fieldIndex] = e.target.value;
                                                     setName([...name]);
                                                     const theValue = e.target.value
                                                     if(langDir=='rtl'){
                                                         var  theName = "productNameAR"
                                                     }else{
                                                         theName="productNameEN"
                                                     }

                                                     handleInput(theName,theValue)

                                                 }}/>

                                          {langDir=='rtl'&& errors.productNameAR && <p style={{color:'red'}}>{errors.productNameAR}</p>}
                                          {langDir=='ltr'&& errors.productNameEN && <p style={{color:'red'}}>{errors.productNameEN}</p>}


                                      </div>
                                      {/*  Ingredients*/}
                                      <div className='col-lg-3'>
                                          <label className="text-muted my-2">Ingredients</label>
                                          <input className=" form-control mb-3 input" type="text"

                                                 placeholder="Ingredients"
                                                 required autoFocus
                                                 onChange={(e) => {
                                                     let fieldIndex = index + 1;
                                                     ingrediant[fieldIndex] = e.target.value;
                                                     setingrediant([...ingrediant]);
                                                     const theValue = e.target.value
                                                     if(langDir=='rtl'){
                                                         var  theName = "ingredientsAR"
                                                     }else{
                                                         theName="ingredientsEN"
                                                     }

                                                     handleInput(theName,theValue)


                                                 }}/>
                                          {langDir=='rtl'&& errors.ingredientsAR && <p style={{color:'red'}}>{errors.ingredientsAR}</p>}
                                          {langDir=='ltr'&& errors.ingredientsEN && <p style={{color:'red'}}>{errors.ingredientsEN}</p>}
                                      </div>
                                      {/*How To Use*/}
                                      <div className='col-lg-3'>
                                          <label className="text-muted my-2">How To Use</label>
                                          <input className=" form-control mb-3 input" type="text"
                                                 placeholder="How To Use"
                                                 required autoFocus
                                                 onChange={(e) => {
                                                     let fieldIndex = index + 1;
                                                     howtouse[fieldIndex] = e.target.value;
                                                     sethowtouse([...howtouse]);
                                                     const theValue = e.target.value
                                                     if(langDir=='rtl'){
                                                         var  theName = "HTU_AR"
                                                     }else{
                                                         theName="HTU_EN"
                                                     }

                                                     handleInput(theName,theValue)
                                                 }}/>
                                          {langDir=='rtl'&& errors.HTU_AR && <p style={{color:'red'}}>{errors.HTU_AR}</p>}
                                          {langDir=='ltr'&& errors.HTU_EN && <p style={{color:'red'}}>{errors.HTU_EN}</p>}
                                      </div>
                                      {/*Benifits*/}
                                      <div className='col-lg-3'>
                                          <label className="text-muted my-2">Benifits</label>
                                          <input className=" form-control mb-3 input" type="text"
                                                 placeholder="Benifits"
                                                 required autoFocus
                                                 onChange={(e) => {
                                                     let fieldIndex = index + 1;
                                                     benfites[fieldIndex] = e.target.value;
                                                     setbenfites([...benfites]);
                                                     const theValue = e.target.value
                                                     if(langDir=='rtl'){
                                                         var  theName = "benifitsAR"
                                                     }else{
                                                         theName="benifitsEN"
                                                     }

                                                     handleInput(theName,theValue)
                                                 }}/>
                                          {langDir=='rtl'&& errors.benifitsAR && <p style={{color:'red'}}>{errors.benifitsAR}</p>}
                                          {langDir=='ltr'&& errors.benifitsEN && <p style={{color:'red'}}>{errors.benifitsEN}</p>}
                                      </div>


                                  </div>
                              </div>

                          </>
                      )
                  })

                  }














                  <div className='col-12'>
                      <h3>Size Or Weight Info</h3>
                  </div>
                  <div className='col-12 row'>
                      {/* Name */}
                      <div className='col-lg-3'>
                          <label className="text-muted my-2"> Name</label>
                          <input className=" form-control mb-3 input" type="text"
                                 placeholder="Name"
                                 name='sORwInfo'
                                 required autoFocus
                                 onChange={(e) => {
                                     // setName([e.target.value])
                                     Sizename[0] = e.target.value;
                                     setSizeName([...Sizename]);
                                        const theValue = e.target.value
                                        const theName = e.target.name
                                        handleInput(theName,theValue)
                                 }}/>
                          {errors.sORwInfo && <p style={{color:'red'}}>{errors.sORwInfo}</p>}

                      </div>
                      {/* Description */}
                      <div className='col-lg-3'>
                          <label className="text-muted my-2">Description</label>
                          <input className=" form-control mb-3 input" type="text"
                                 placeholder="Description"
                                 title="Please enter at least 20 alphabetical characters"
                                 required autoFocus
                                 name='description'

                                 onChange={(e) => {

                                     Sizedescription[0] = e.target.value;
                                     setSizeDescription([...Sizedescription]);
                                     const theValue = e.target.value
                                     const theName = e.target.name
                                     handleInput(theName,theValue)
                                 }}/>
                          {errors.description && <p style={{color:'red'}}>{errors.description}</p>}
                      </div>
                      {/* Price */}
                      <div className='col-lg-3'>
                          <label className="text-muted my-2">Price</label>
                          <input className=" form-control mb-3 input"
                                 placeholder="Price"
                                 name='price'
                                 type="number"
                                 step="0.01"
                                 required autoFocus
                                 onChange={(e) => {
                                     // setAddress([e.target.value])
                                     SizePrice[0] = e.target.value;
                                     setSizePrice([...SizePrice]);
                                     const theValue = parseInt(e.target.value)
                                     const theName = e.target.name
                                     handleInput(theName,theValue)
                                     console.log(theValue,"gfgfgfgfgfgfg")

                                 }}/>
                          {errors.price && <p style={{color:'red'}}>{errors.price}</p>}

                      </div>
                      {/* Global Price */}
                      <div className='col-lg-3'>
                          <label className="text-muted my-2">Global Price</label>
                          <input className=" form-control mb-3 input"
                                 placeholder="Price"
                                 name='globalPrice'
                                 type="number"
                                 step="0.01"
                                 required autoFocus
                                 onChange={(e) => {
                                     // setAddress([e.target.value])
                                     SizeGlobalPrice[0] = e.target.value;
                                     setSizeGlobalPrice([...SizeGlobalPrice]);
                                     const theValue = parseInt(e.target.value)
                                     const theName = e.target.name
                                     handleInput(theName,theValue)
                                 }}/>
                          {errors.globalPrice && <p style={{color:'red'}}>{errors.globalPrice}</p>}

                      </div>
                      {/*Value*/}
                      <div className='col-lg-3'>
                          <label className="text-muted my-2">Value</label>
                          <input className=" form-control mb-3 input" type="number"
                                 placeholder="Value"
                                 name='value'
                                 required autoFocus
                                 onChange={(e) => {
                                     // setAddress([e.target.value])
                                     SizeValue[0] = e.target.value;
                                     setSizeValue([...SizeValue]);
                                     const theValue = parseInt(e.target.value)
                                     const theName = e.target.name
                                     handleInput(theName,theValue)
                                 }}/>
                          {errors.value && <p style={{color:'red'}}>{errors.value}</p>}

                      </div>
                      {/* Unit */}
                      <div className='col-lg-3'>
                          <label className="text-muted my-2">Unit</label>
                          <Select options={sizeOeWeight == 'weight' ? weightOption : sizeOption} onChange={(e) => {
                              SizeUnit[0] = e.value;
                              setSizeUnit([...SizeUnit]);
                              const theValue = e.value
                              const theName = 'unit'
                              handleInput(theName,theValue)
                          }}/>
                          {errors.unit && <p style={{color:'red'}}>{errors.unit}</p>}
                          {/* <input className=" form-control mb-3 input" type="text"
                placeholder="Unit"
                required autoFocus
                onChange={(e) => {
                  // setAddress([e.target.value])
                  SizeUnit[0] = e.target.value;
                  setSizeUnit([...SizeUnit]);
                }} /> */}

                      </div>
                      {/* Stock */}
                      <div className='col-lg-3'>
                          <label className="text-muted my-2">Stock</label>
                          <input className=" form-control mb-3 input" type="number"
                                 placeholder="Stock"
                                 name='stock'
                                 required autoFocus
                                 onChange={(e) => {
                                     // setAddress([e.target.value])
                                     SizeStock[0] = e.target.value;
                                     setSizeStock([...SizeStock]);
                                     const theValue = parseInt(e.target.value)
                                     const theName = e.target.name
                                     handleInput(theName,theValue)
                                 }}/>
                          {errors.stock && <p style={{color:'red'}}>{errors.stock}</p>}

                      </div>
                      {/* Max Order */}
                      <div className='col-lg-3'>
                          <label className="text-muted my-2">Max Order</label>
                          <input className=" form-control mb-3 input" type="number"
                                 placeholder="Max_Order"
                                 name='maxOrder'
                                 required autoFocus
                                 max={SizeStock[0]}
                                 onChange={(e) => {
                                     // setAddress([e.target.value])
                                     SizeMax_Order[0] = e.target.value;
                                     setSizeMax_Order([...SizeMax_Order]);
                                     const theValue = parseInt(e.target.value)
                                     const theName = e.target.name
                                     handleInput(theName,theValue)
                                 }}/>
                          {errors.maxOrder && <p style={{color:'red'}}>{errors.maxOrder}</p>}

                      </div>
                      {/* Select Image */}
                      <div className='col-lg-3'>
                          <label className="text-muted my-2">Select Image</label>
                          <div className={`d-flex flex-column`}>
                              <input
                                  className="file-input d-block form-control"
                                  type="file"
                                  name='img'
                                  onChange={(e) => {
                                      filesSelected(e, 0, 'size')
                                      const theValue = e.target.value
                                      const   theName = e.target.name
                                      handleInput(theName,theValue)
                                  }}
                                  accept="image/*"
                              />
                              {errors.img && <p style={{color:'red'}}>{errors.img}</p>}

                          </div>
                          <p className="text-danger">{errorMessage1}</p>
                      </div>
                      {/* Select List Of Images */}
                      <div className='col-lg-9'>
                          <label className="text-muted my-2">Select List Of Images</label>
                          {/* <Dropzone /> */}
                          <div className="">

                              <div className={`${style.Drop} `}>

                                  <div className=' '>
                                      <div className="row justify-content-center">
                                          <div className='col-lg-6 '>
                                              <div>
                                                  <div className="content ">
                                                      <form>

                                                          <div className={`${style.container} `}>


                                                              <div className={`${style.drop_container} w-100`}
                                                              >


                                                                  <div className={`${style.drop_message}`}>
                                                                      <input
                                                                          ref={fileInputRef}
                                                                          className="file-input d-block form-control"
                                                                          type="file"
                                                                          multiple
                                                                          onChange={(e) => {
                                                                              handleFiles(e, 'imgs')
                                                                              console.log(e,"ttttttttttttt")
                                                                              // const theValue = e.target.value
                                                                              // const   theName = e.target.name
                                                                              // handleInput(theName,theValue)
                                                                              // console.log(e.target.value,'llllllllllldsdllllll')
                                                                          }}
                                                                          name="imgList"
                                                                          accept="image/*"
                                                                      />
                                                                      {errors.imgList && <p style={{color:'red'}}>{errors.imgList}</p>}
                                                                      {/* <div className={`${style.upload_icon} `}></div> */}

                                                                  </div>
                                                              </div>


                                                          </div>
                                                      </form>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className='col-lg-6  '>
                                              <div className={`${style.displayImg} file-display-container p-3`}
                                                   style={{maxHeight: "280px", overflowY: "scroll"}}>

                                                  <div className="row">
                                                      {

                                                          validFiles.map((data, i) =>

                                                              <div className="col-4   my-1" key={i}>


                                                                  <div className="  position-relative ">

                                                                      <img className=" rounded w-100"
                                                                           src={data.fileName} width={100} height={100}
                                                                           alt=""/>


                                                                      <div className="d-flex flex-column">

                                                                          <small className=" fs-10"
                                                                                 style={{fontSize: "12px"}}>({fileSize(data.fileInfo.size)})</small> {data.fileInfo.invalid &&
                                                                          <small className='text-danger fs-10'
                                                                                 style={{fontSize: "12px"}}>({errorMessage})</small>}
                                                                      </div>
                                                                      <div
                                                                          className="row justified-content-between position-absolute"
                                                                          style={{
                                                                              top: "50 %",
                                                                              left: "50 %",
                                                                              transform: "translate(-50 %, -50 %)"
                                                                          }}>
                                                                          <div
                                                                              className="col-6 font-weight-bold d-flex justify-content-center align-items-center ">
                                                                              <div style={{
                                                                                  padding: "3px 10px",
                                                                                  backgroundColor: "#ffffff",
                                                                                  borderRadius: "50%"
                                                                              }} onClick={() => {
                                                                                  openImageModal(data)
                                                                              }}>
                                                                                  <img src={editImg} alt={''} width={16}
                                                                                       height={16}/>
                                                                              </div>

                                                                          </div>
                                                                          <div
                                                                              className="col-6 font-weight-bold d-flex justify-content-center align-items-center">
                                                                              <div style={{
                                                                                  padding: "3px 10px",
                                                                                  backgroundColor: "#ffffff",
                                                                                  borderRadius: "50%"
                                                                              }}
                                                                                   onClick={() => removeFile(data.fileInfo.name, "imgs")}>
                                                                                  <img src={deleteImg} alt={``}
                                                                                       height={16} width={16} style={{
                                                                                      backgroundColor: "#ffffff",
                                                                                      borderRadius: "50%"
                                                                                  }}/>
                                                                              </div>


                                                                          </div>

                                                                      </div>
                                                                  </div>


                                                              </div>
                                                          )
                                                      }
                                                  </div>
                                              </div>
                                          </div>

                                          <div className="modal" ref={modalRef}>
                                              <div className="overlay"></div>

                                              <img onClick={(() => closeModal())} style={{cursor: "pointer"}}
                                                   className="close" src={closeImg} alt="" width={24} height={24}/>

                                              <div className="modal-image" ref={modalImageRef}></div>
                                          </div>


                                      </div>


                                  </div>

                              </div>

                          </div>
                      </div>

















                      {languageList.map((lang, index) => {
                          let langDir = "ltr";
                          if (lang.rtl == true) {
                              langDir = "rtl";
                          } else {
                              langDir = "ltr";
                          }
                          return (
                              <>
                                  <div key={index} dir={langDir}>
                                      <h2>{lang.name}</h2>
                                      <div className='row'>

                                          <div className='col-12 row'>
                                              {/* Size or Weight Name< */}
                                              <div className='col-lg-6'>
                                                  <label className="text-muted my-2">Size or Weight Name</label>
                                                  <input className=" form-control mb-3 input" type="text"
                                                         placeholder=" Name"
                                                         required autoFocus
                                                         onChange={(e) => {
                                                             let fieldIndex = index + 1;
                                                             Sizename[fieldIndex] = e.target.value;
                                                             setSizeName([...Sizename]);
                                                             const theValue = e.target.value
                                                             if(langDir=='rtl'){
                                                                 var  theName = "sORwNameAR"
                                                             }else{
                                                                 theName="sORwNameEN"
                                                             }

                                                             handleInput(theName,theValue)

                                                         }}/>
                                                  {langDir=='rtl'&& errors.sORwNameAR && <p style={{color:'red'}}>{errors.sORwNameAR}</p>}
                                                  {langDir=='ltr'&& errors.sORwNameEN && <p style={{color:'red'}}>{errors.sORwNameEN}</p>}

                                              </div>
                                              {/* Description */}
                                              <div className='col-lg-6'>
                                                  <label className="text-muted my-2">Description</label>
                                                  <input className=" form-control mb-3 input" type="text"
                                                         placeholder="Description"
                                                         required autoFocus
                                                         onChange={(e) => {
                                                             let fieldIndex = index + 1;
                                                             Sizedescription[fieldIndex] = e.target.value;
                                                             setSizeDescription([...Sizedescription]);
                                                             const theValue = e.target.value
                                                             if(langDir=='rtl'){
                                                                 var  theName = "descriptionAR"
                                                             }else{
                                                                 theName="descriptionEN"
                                                             }

                                                             handleInput(theName,theValue)
                                                         }}/>
                                                  {langDir=='rtl'&& errors.descriptionAR && <p style={{color:'red'}}>{errors.descriptionAR}</p>}
                                                  {langDir=='ltr'&& errors.descriptionEN && <p style={{color:'red'}}>{errors.descriptionEN}</p>}
                                              </div>

                                          </div>

                                      </div>
                                  </div>

                              </>
                          )
                      })

                      }
                  </div>

              </div>
              {/* <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Add Certificate</Accordion.Header>
        <Accordion.Body>
         
        </Accordion.Body>
      </Accordion.Item>
     
    </Accordion> */}


              <div className='d-flex justify-content-center'>
                  <button type="button" onClick={() => {

                      formValidation()

                  }} className={` btn btnCreateAddd mt-3 text-capitalize  fw-bold `}>Add
                  </button>

              </div>
              <br/>
              {isLoading &&
                  <div className='d-flex justify-content-center'>
                      <button className="btn btn-primary" type="button" disabled>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          <span className="sr-only">Loading...</span>
                      </button>
                  </div>

              }


          </form>
      </div>
        {/*onClick={handleSubmit((data)=>{console.log(data,"ggggggggggg")})}*/}
    </>

  )

}
