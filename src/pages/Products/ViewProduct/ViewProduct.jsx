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
import { useParams } from 'react-router-dom';
import style from "./ViewProduct.module.css"


import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import imgDelete from "../../../assets/product/delete.webp";
import imgPlus from "../../../assets/product/plus.webp";
export default function ViewProduct() {

  const { id } = useParams();
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
  const [Image11, setImage11] = useState([]);
  const [SizeImage, setSizeImage] = useState([]);
  const [Vendor, setVendor] = useState([]);
  const [VendorOption, setVendorOption] = useState([]);
  const [Store, setStore] = useState([]);
  const [StoreOption, setStoreOption] = useState([]);
  const [Category, setCategory] = useState([]);
  const [CategoryOption, setCategoryOption] = useState([]);
  const [Country, setCountry] = useState([]);
  const [CountryOption, setCountryOption] = useState([]);
  const [sizeOeWeight, setsizeOeWeight] = useState();
  const [Notes, setNotes] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [stateError, setStateError] = useState(false);
  const [stateError1, setStateError1] = useState(false);
  const [weightOption, setweightOption] = useState([
    { value: 'kg', label: 'kg' },
    { value: 'pound', label: "Pound" }
  ]);
  const [sizeOption, setsizeOption] = useState([
    { value: 'EG', label: 'EG' },
    { value: 'EU', label: "EU" }
  ]);

  const [selectedCountOption, setSelectedCountOption] = useState();
  const [selectedCatOption, setSelectedCatOption] = useState();
  const [selectedStoreOption, setSelectedStoreOption] = useState();
  const [selectedVendorOption, setSelectedVendorOption] = useState();
  const [productInfoT, setproductInfoT] = useState([]);
  const [SizeOrWeightInfo, setSizeOrWeightInfo] = useState([]);
  const [SizeOrWeightInfoT, setSizeOrWeightInfoT] = useState([]);
  const [sizeOrWeghtId, setSizeOrWeghtId] = useState('');
  const [CertImage, setCertImage] = useState();


  const [ProductInfo, setProductInfo] = useState({});
  const fetchOneItem = async (id) => {

    await axiosInstance.post(`/store/view_one_product_admin`, {
      id: id,
      token: token,
      seller_id: 1,
      lang: currentLanguageCode
    }).then(res => {
      console.log("view one producttttttttttttt", res);
      setProductInfo(res.data.success)
      setSelectedCountOption(res.data.success.country.name )
      setSelectedCatOption( res.data.success.category.org_category.org_name )
      setSelectedVendorOption(res.data.success.vendor.org_vendor.org_name )
      setSelectedStoreOption(res.data.success.store.org_store.org_name )
      setsizeOeWeight(res.data.success.type)
      Image11[0] = res.data.success.product.org_product.image;
      name[0] = res.data.success.product.org_product.name;
      setImage11([...Image11])
      setImag()
      res.data.success.product.org_product.trans_product.map((ele, index) => {
        name[index + 1] = ele.name;
        ingrediant[index + 1] = ele.ingredients;
        howtouse[index + 1] = ele.how_to;
        benfites[index + 1] = ele.benifits;

      })
      setSizeOrWeightInfo(res.data.success.size_or_weight)
      setcertificate(res.data.success.certificates)
      Category[0] = res.data.success.category.org_category.org_id;
      setCategory([...Category])
      Country[0] = res.data.success.country.id;
      setCountry([...Country])
      Vendor[0] = res.data.success.vendor.org_vendor.org_id;
      setVendor([...Vendor])
      Store[0] = res.data.success.store.org_store.store_id;
      setStore([...Store])
      //  setproductInfoT(res.data.success.product.org_product.trans_product)
      // name[0] = res.data.success.org_store.name;
      // address[0] = res.data.success.org_store.address;
      // // description[0] = res.data.success.org_store.description;

      // res.data.success.translations.map((ele, index) => {
      //   name[index + 1] = ele.name;
      //   address[index + 1] = ele.address;
      //   // description[index+1] = ele.description;
      // })

      setName([...name]);
      // setAddress([...address]);
      // setDescription([...description]);
   


    }).catch(err => {
      console.log("one product", err);
    });
  };

  console.log("selected category", selectedCatOption);


  const langList = useSelector(state => state.langList.langList);

  console.log(langList);

  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  const currentLanguageCode = useSelector((state) => state.language.lang);

  function showAlert(message, icon) {
    Swal.fire({
      title: message,
      icon: icon,
      showConfirmButton: false,
      timer: 1500
    });
  }


  function DeleteAlert(id, test) {
    Swal.fire({
      title: "Are you sure ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1dbf73',
      cancelButtonColor: '#d33',
      confirmButtonText: "delete",
      cancelButtonText: "cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        if (test === 'sizeImg') {
          DaleteSizeImg(id)
        } else {
          DaleteItem(id)
        }

      }
    })
  }

  const DaleteItem = async (itemId) => {
    await axiosInstance.post(`store/delete_certificates`, {
      token: token,
      id: itemId
    }).then(res => {

      console.log("delete cert res", res)
      if (res.data.success) {

        let index = certificate.findIndex(ele => ele.id === itemId);
        certificate.splice(index, 1)
        setcertificate([...certificate]);

        fetchOneItem(id)
        showAlert('Certificate deleted successfully', "success")
      } else {
        let message = res.data.error;
        showAlert(message, 'error');
      }
    });
  }
  const DaleteSizeImg = async (itemId) => {

    console.log("delete", sizeOeWeight)
    await axiosInstance.post(`store/delete_s_w_img`, {
      token: token,
      id: itemId,
      size_or_weight: sizeOeWeight

    }).then(res => {

      console.log("delete cert res", res)
      if (res.data.success) {

        let index = certificate.findIndex(ele => ele.id === itemId);
        certificate.splice(index, 1)
        setcertificate([...certificate]);


      
        showAlert('Image deleted successfully', "success")
        fetchOneItem(id)
      } else {
        let message = res.data.error;
        showAlert(message, 'error');
      }
    });
  }

  const [selectedFile, setSelectedFile] = useState("");
  const [errorMessage1, setErrorMessage1] = useState('');
  const [invalid, setInvalid] = useState(false);

  const filesSelected = (e, index, test) => {
    console.log("selected", e.target.files[0])
    console.log("#############333333333selected tessssssssssssst", test)

    setSelectedFile(e.target.files[0]);
    let file = e.target.files[0]
    let fileIndex = index;
    if (validateSelectedFile(e.target.files[0]) == false) {
      setInvalid(true)
      setErrorMessage1("File size is greater than maximum limit 100KB");

    } else {
      setInvalid(false)
      setErrorMessage1("");


      if (test === 'add') {
        Image[fileIndex] = file;
        setImage([...Image]);
        updateProductImg()
      } else if (test === 'size') {
        SizeImage[fileIndex] = file;
        setSizeImage([...SizeImage]);
        updateSizeImg()
      } else if (test === 'certImg') {
        // setCertImage(file)
        updateCertImg(file)
      } else if (test = 'sizeImg') {
        addSizeImg(file)
      }
    }

  }



  const updateProductImg = () => {
    // e.preventDefault();

    const formData = new FormData();
    // console.log("Price", Price[0])
    // console.log("size", sizeOeWeight[0])
    console.log("image[0]", Image[0])
    formData.append('token', token);
    formData.append('id', id);
    formData.append('image', Image[0]);
    console.log("image", Image[0])



    let { data } = axiosInstance.post(`store/update_product_img`, formData, {
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "multipart/form-data"



      }
    }).then(res => {
      console.log("updateeee res img", res)
  
      if (res.data.success) {
        console.log("updateeee res img", res)
        fetchOneItem(id)
  
      }else {
        console.log("res one from else :", res.data.error);
        showAlert(res.data.error, "error");
      }

    }).catch(err => {
      console.log("err one", err);
    })
  };
  const updateSizeImg = () => {
   
    console.log("updateSizeImg in Size", sizeOrWeghtId)
    const formData = new FormData();
    console.log("image[0]", SizeImage[0])
    formData.append('token', token);
    formData.append('id', id);
    formData.append('image', SizeImage[0]);
    formData.append('size_or_weight_id', sizeOrWeghtId);

    let { data } = axiosInstance.post(`store/update_s_w_img`, formData, {
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "multipart/form-data"



      }
    }).then(res => {
      console.log("################updateeee res img", res)
      if (res.data.success) {
        console.log("updateeee res img", res)
      
        showAlert("Image Update Successfuly", 'success')

        fetchOneItem(id)
      }
       else {
        console.log("res one from else :", res.data.error);
        showAlert(res.data.error, "error");
      }

    }).catch(err => {
      console.log("err one", err);
    })
  };
  const updateCertImg = (file) => {
    console.log("updateSizeImg in Cert", sizeOrWeghtId)
    const formData = new FormData();
    console.log("image cert", file)
    formData.append('token', token);
    formData.append('id', id);
    formData.append('image', file);




    let { data } = axiosInstance.post(`store/add_one_certificates`, formData, {
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "multipart/form-data"



      }
    }).then(res => {
      console.log("################updateeee res img in cert ", res)
    
   

      if(res.data.success) {
        console.log("updateeee res img", res)
        showAlert("Image Adedd Successfuly", 'success')
        fetchOneItem(id)


      }else {
        console.log("res one from else :", res.data.error);
        showAlert(res.data.error, "error");
      }

    }).catch(err => {
      console.log("err one", err);
    })
  };


  const addSizeImg = (file) => {
 
    console.log("updateSizeImg in size idddddddddddddddd", sizeOrWeghtId)
    const formData = new FormData();
    console.log("image cert", file)
    formData.append('token', token);
    formData.append('id', sizeOrWeghtId);
    formData.append('image', file);
    formData.append('size_or_weight', sizeOeWeight);

    let { data } = axiosInstance.post(`store/add_one_s_w_img`, formData, {
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "multipart/form-data"



      }
    }).then(res => {
      console.log("################updateeee res img in size image ", res.data)

      if(res.data.success) {
        console.log("updateeee res img", res)
        showAlert("Image Adedd Successfuly", 'success')
        fetchOneItem(id)
       
      }else if(res.data.error){
        console.log("res one from else :", res.data.error);
        showAlert(res.data.error, "error");
      }

    }).catch(err => {
      console.log("err one", err);
    })
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    // console.log("Price", Price[0])
    // console.log("size", sizeOeWeight[0])
    // console.log("image[0]", Image[0])
    formData.append('token', token);
    formData.append('id', id);
    formData.append('name', name[0]);
    formData.append('ingredients', ingrediant[0]);
    formData.append('benifits', benfites[0]);
    formData.append('how_to', howtouse[0]);
    formData.append('seller_id', 1);
    // formData.append('price',`${Price[0]}`);
    formData.append('cat_id', Category[0]);
    console.log("storrre", Store[0]);
    formData.append('store_id', Store[0]);
    formData.append('country', Country[0]);
    formData.append('vendor_id', Vendor[0]);
    formData.append('size_or_weight', sizeOeWeight);
    // formData.append('notes', Notes[0]);
    // formData.append('image', Image[0]);
    // formData.append('thumbnail', Image[0]);
    let { data } = axiosInstance.post(`store/update_product`, formData, {
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "multipart/form-data"



      }
    }).then(res => {
      if (res.data.success) {
        console.log("updateeee res", res)
        let itemId = res.data.id;
        languageList.map((lang, index) => {
          let langCode = lang.code;
          let LangIndex = index + 1;
          console.log(langCode);
          console.log(stateError);

          if (stateError == false) {
            console.log(stateError);
            addProductT(id, langCode, LangIndex);
          } else {

          }

        })

      } else {
        console.log("res one from else :", res.data.error);
        showAlert(res.data.error, "error");
      }

    }).catch(err => {
      console.log("err one", err);
    })
  };


  async function addProductT(itemId, langCode, LangIndex) {
    console.log("additemT", itemId)
    let id = itemId;
    let lang = langCode;
    let index = LangIndex;
    console.log(name[index],
      address[index]);
    await axiosInstance.post(`store/update_product_T`,
      {
        token: token,
        id: id,
        lang: lang,
        name: name[index],

        // address: address[index],
        // description: description[index] ,
        seller_id: 1,
        how_to: howtouse[index],
        benifits: benfites[index],
        ingredients: ingrediant[index],


      }
    ).then(res => {
      console.log("res update t", res);
      if (res.data.error) {
        console.log("res t from if error :", res.data.error);
        showAlert(res.data.error, "error");
        setStateError(true);
      } else {
        console.log(LangIndex);
        console.log(languageList.length);
        if (LangIndex == languageList.length) {
          // addSizeOrWeight(id)
          showAlert("Product Update successfully", "success");
          // navigate("/store");
        }
      }



    }).catch(err => {
      console.log("err t", err);
    });

  }
  async function addSizeOrWeight(id) {

    const formData = new FormData();
    for (let i = 0; i < validFiles.length; i++) {

      if (validFiles[i].fileInfo.invalid) {
        showAlert('one of images invalid', 'error')
      } else {
        console.log("one of images[]", validFiles[i].fileInfo)
        formData.append('images_list', validFiles[i].fileInfo)
      }


    }

    formData.append('token', token);
    formData.append('id', id);
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
    formData.append('size_or_weight', sizeOeWeight[0]);
    formData.append('value', SizeValue[0]);

    await axiosInstance.post(`store/add_size_weight`, formData, {
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
        description: Sizedescription[index],
        seller_id: 1,
        size_or_weight: sizeOeWeight[0]


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
        if (LangIndex == languageList.length) {
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
    console.log(name);
    console.log(address);

  }, [langList, name, address, Image11]);


  const cat = [];
  const getAllCategories = async () => {

    await axiosInstance.post(`/store/view_all_categories_admin`, {
      token: token,
      lang: currentLanguageCode

    })
      .then(response => {

        console.log("response Category", response)

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

        console.log("response country", response)

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
      console.log("all store", res);
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
      console.log("get vendors", res);

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
    fetchOneItem(id)
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

  const [imag, setImag] = useState([]);
  const [imagLength, setImagLength] = useState();


  const [images, setImages] = useState([]);
  // const  rl,setImageUrl = useState(null);

  const dispatch = useDispatch();




  const handleFiles = (e, test) => {

    const files = e.target.files;

    console.log("files from handle: ", files)
    if (test == "imgs") {
      const maxFiles = 5; // Set your desired maximum number of files here

      if (files.length > maxFiles) {
        showAlert(`You can only upload a maximum of  ${maxFiles}  files.`, 'error');
        e.target.value = null; // Clear the selected files
        return;
      }
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
    } else {


      for (let i = 0; i < files.length; i++) {


        if (validateSelectedFile(files[i])) {
          setSelectedFiles1(prevArray => [...prevArray, files[i]]);
        } else {
          // add a new property called invalid
          files[i]['invalid'] = true;
          // add to the same array so we can display the name of the file
          setSelectedFiles1(prevArray => [...prevArray, files[i]]);
          // set error message
          setErrorMessage1("Invalid Image Size Less than 100KB");

          setUnsupportedFiles1(prevArray => [...prevArray, files[i]]);
        }


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

  const removeFile = (name, test) => {


    console.log('Removing file ', name, "##############", test)


    if (test == "imgs") {
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
    } else {
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

  axios.defaults.xsrfCookieName = 'csrftoken'
  axios.defaults.xsrfHeaderName = 'X-CSRFToken'
  console.log("data", data)

  console.log("sizeOrwieght", sizeOeWeight)


  return (

    <>
      <Sidebar />

      <div id='home_page' className='page-section-home min-vh-100 overflow-auto'>

       <div className='editTabs mt-5'>
       <Tabs
        defaultActiveKey="productInfo"
        id="uncontrolled-tab-example"
        className="mb-3"
    >
      <Tab eventKey="productInfo" title="Product Info">
      <div className='p-4'>
        <div className='row'>
          <div className='col-md-3'>
            <div className='imgAdd'>
            <img className='w-100' style={{borderRadius:'16px'}} src= {`data:image/png;base64, ${Image11[0]}`} height={200}  alt="one_product"/>
            </div>
          </div>
          <div className='col-md-9 row '>
            <div className='col-md-4'>
              <div className='px-5'>
                <h5 className='text-capitalize'>product name</h5>
                <p className='par-info'> {name[0]}</p>
              </div>

            </div>
            <div className=' col-md-4 my-2'>
            <div className='px-5'>
                <h5 className='text-capitalize'>Country</h5>
                <p className='par-info'> {selectedCountOption}</p>
              </div>

            </div>
            <div className=' col-md-4 my-2'>
            <div className='px-5'>
                <h5 className='text-capitalize'>Vendor</h5>
                <p className='par-info'> {selectedVendorOption}</p>
              </div>


            </div>
            <div className=' col-md-4 my-2'>
            <div className='px-5'>
                <h5 className='text-capitalize'>Store</h5>
                <p className='par-info'> {selectedStoreOption}</p>
              </div>


            </div>
            <div className=' col-md-4 my-2'>
            <div className='px-5'>
                <h5 className='text-capitalize'>Category</h5>
                <p className='par-info'> {selectedCatOption}</p>
              </div>


            </div>
            <div className=' col-md-4 my-2'>
            <div className='px-5'>
                <h5 className='text-capitalize'>Type</h5>
                <p className='par-info'> {sizeOeWeight}</p>
              </div>

            </div>

          </div>

        </div>


          <div className='my-5' >
                {languageList.map((product_lang, index) => {
                    let langDir = "ltr";
                    if (product_lang.rtl == true) {
                      langDir = "rtl";
                    } else {
                      langDir = "ltr";
                    }
                    return (
                      <>
                          <div dir={langDir}>
                        <h4>{product_lang.name}</h4>
                        <div className='row w-100 my-2'>
                         <div className='col-md-3 d-flex justify-content-center align-items-center'>
                            <div >
                                <h5 className='text-capitalize'>product name</h5>
                                <p className='par-info'>{name[index + 1]}</p>

                            </div>
                         </div>
                         <div className='col-md-3'>
                            <div className=''>
                              <h5 className='text-capitalize'>ingredients</h5>
                              <p className='product-info p-2'>{ingrediant[index + 1]}</p>
                            </div>
                         </div>
                         <div className='col-md-3'>
                            <div className=''>
                              <h5 className='text-capitalize'>how to use</h5>
                              <p className='product-info p-2'>{howtouse[index + 1]}</p>
                            </div>
                         </div>
                         <div className='col-md-3'>
                            <div className=''>
                              <h5 className='text-capitalize'>benifits</h5>
                              <p className='product-info p-2'>{benfites[index + 1]}</p>
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
      </Tab>
      <Tab eventKey="productSize" title="Product Size Or Weight">
        {SizeOrWeightInfo.map((size, index) => {
          return (

                <div className='row p-3'>

                  <div className='col-12 row'>
                    <div className='col-md-6 row'>
                      <div className='col-md-4 '>
                        <div className=''>
                          <h5 className='text-capitalize'>name</h5>
                          <p className='par-info'> {size.org_s_w.name}</p>
                        </div>


                      </div>


                      <div className='col-md-4'>
                        <div className=''>
                          <h5 className='text-capitalize'>price</h5>
                          <p className='par-info'>{size.org_s_w.price}</p>
                        </div>


                      </div>
                      <div className='col-md-4'>
                        <div className=''>
                          <h5 className='text-capitalize'>Global Price</h5>
                          <p className='par-info'> {size.org_s_w.price}</p>
                        </div>

                      </div>
                      <div className='col-md-4'>
                        <div className=''>
                          <h5 className='text-capitalize'>Value</h5>
                          <p className='par-info'> {size.org_s_w.value}</p>
                        </div>

                      </div>
                      <div className='col-md-4'>
                        <div className=''>
                          <h5 className='text-capitalize'>Unit</h5>
                          <p className='par-info'> {size.org_s_w.unit}</p>
                        </div>


                      </div>
                      <div className='col-md-4'>
                        <div className=''>
                          <h5 className='text-capitalize'>Stock</h5>
                          <p className='par-info'> {size.org_s_w.stock}</p>
                        </div>


                      </div>
                      <div className='col-md-4'>
                        <div className=''>
                          <h5 className='text-capitalize'>Max Order</h5>
                          <p className='par-info'> {size.org_s_w.max_order}</p>
                        </div>


                      </div>

                    </div>
                    <div className='col-md-6'>
                      <div className=''>
                        <div className=''>
                          <h5 className='text-capitalize'>Description</h5>
                          <p className='product-info p-2'>{size.org_s_w.description}</p>
                        </div>

                      </div>
                    </div>

                    <div className='col-12 row mt-5'>
                      <div className='col-md-2 '>

                        <label>Image of {sizeOeWeight}</label>
                        <div id="profile-img">
                          <label  className="position-relative w-100">
                            <img src={`data:image/png;base64, ${size.org_s_w.image}`}
                                 alt="avatar"
                                 className="rounded my-2 w-100"
                                 style={{ height: "160px", marginTop: '10px' }}
                                 fluid />

                          </label>


                        </div>

                      </div>
                      <div className='col-md-10 '>
                        <label for=""> List Of Images</label>
                        <div className='row' style={{ border: '1.5px solid #dddddd ', borderRadius: "8px" }}>
                          <div className='col-12 row justify-content-between'>
                            {size.org_s_w.imgs.map((img, index) => {
                              return (
                                  <div className='col-2' id="profile-img">
                                    <label className="position-relative w-100">
                                      <img src={`data:image/png;base64, ${img.image}`}
                                           alt="avatar"
                                           className="rounded my-2 w-100"
                                           style={{ height: "160px", marginTop: '10px' }}
                                           fluid />




                                    </label>

                                  </div>
                              )

                            })}

                          </div>




                        </div>

                      </div>
                    </div>

                   <div className='mt-5'>
                     {size.trans_s_w.map((lang, index) => {
                       let langDir = "ltr";
                       if (lang.lang == 'العربية') {
                         langDir = "rtl";
                       } else {
                         langDir = "ltr";
                       }
                       return (
                           <>
                             <div dir={langDir}>
                               <h4>{lang.lang}</h4>
                               <div className='row'>


                                 <div className='col-12 row'>
                                   <div className='col-md-4 d-flex justify-content-start align-items-center'>
                                     <div >
                                       <h5 className='text-capitalize'>Size or Weight  Name</h5>
                                       <p className='par-info'>{lang.name}</p>

                                     </div>


                                   </div>

                                   <div className='col-lg-6'>
                                     <div className=''>
                                       <h5 className='text-capitalize'>Desciption</h5>
                                       <p className='product-info p-2'>{lang.description}</p>
                                     </div>

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

                </div>




          )
        })}


      </Tab>
      <Tab eventKey="productCertificate" title="Product Certificates">
        <div className='p-5'>
          <div className='row mx-0 w-100'>
            {certificate.map((img, index) => {
              return (
                  <div className='col-3 col-lg-2' id="profile-img">
                    <div className="imgAdd my-3">
                      <label className="position-relative w-100">
                        <img src={`data:image/png;base64, ${img.image}`}
                             alt="avatar"
                             className="  w-100"
                             style={{height: "160px", borderRadius: "16px"}}
                             fluid/>


                      </label>
                    </div>

                  </div>
              )
            })}

          </div>
        </div>
      </Tab>

    </Tabs>


       </div>

      </div>

    </>

  )

}
