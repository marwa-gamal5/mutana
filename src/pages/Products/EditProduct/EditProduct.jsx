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
import style from "./EditProduct.module.css"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import imgDelete from '../../../assets/product/delete.webp'
import imgPlus from '../../../assets/product/plus.webp'
export default function EditProduct() {

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


////// fatma //////
  const [newCountryTd, setNewCountryId]=useState()
  const [newStoreTd, setNewStoreId]=useState()
  ////// fatma /////

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
      setSelectedCountOption({ value: res.data.success.country.id, label: res.data.success.country.name })
      setSelectedCatOption({ value: res.data.success.category.org_category.org_id, label: res.data.success.category.org_category.org_name })
      setSelectedVendorOption({ value: res.data.success.vendor.org_vendor.org_id, label: res.data.success.vendor.org_vendor.org_name })
      setSelectedStoreOption({ value: res.data.success.store.org_store.store_id, label: res.data.success.store.org_store.org_name })
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

  console.log("selected category55555555555555", selectedCatOption);


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
      } else if (test === 'sizeImg') {
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
      }
       else {
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
        fetchOneItem(id)
        showAlert("Image Update Successfuly", 'success')
 
      }
       else {
        console.log("res one from else :", res.data.error);
        showAlert(res.data.error, "error");
      }

    }).catch(err => {
      console.log("err one", err);
    })
  }


  /////////////add_one_certificates///////////////
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
      
    

      if (res.data.success) {
        console.log("updateeee res img", res)
        showAlert("Image Adedd Successfuly", 'success')
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
     
    

      if (res.data.success) {
        console.log("updateeee res img", res)
        showAlert("Image Adedd Successfuly", 'success')
        fetchOneItem(id)
        

      }
       else {
        console.log("res one from else :", res.data.error);
        showAlert(res.data.error, "error");
      }

    }).catch(err => {
      console.log("err one", err);
    })
  }



  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name[0]);
    formData.append('ingredients', ingrediant[0]);
    formData.append('benifits', benfites[0]);
    formData.append('how_to', howtouse[0]);
    formData.append('seller_id', 1);
    formData.append('cat_id', Category[0]);
    formData.append('store_id', Store[0]);
    formData.append('country', Country[0]);
    formData.append('vendor_id', Vendor[0]);
    formData.append('size_or_weight', sizeOeWeight);
    formData.append('token',token)



    // country: newCountryTd,
    //store_id : newStoreTd,
    const prodEdit = async ()=>{
      await axiosInstance.post(`store/update_product`, formData,
          {
          headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "multipart/form-data"
          }
      }).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    }

    let { data } = axiosInstance.post(`store/update_product`, formData, {
      token: token,
    },{
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


  ///////////  addProductTranslate ///////////
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


  //////////////// addSizeOrWeight  ////////////
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
  }, [id]);






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
              <form method="POST" className=" create_accont">
                <div className='row justify-content-center'>
                  <div className='col-12 row pb-5'>
                    <div className='col-lg-3 row'>
                      {/*// profile img*/}
                      <div id="profile-img">
                        <label htmlFor="productImg" className="position-relative w-100">
                          <img src={`data:image/png;base64, ${Image11[0]}`}
                            alt="avatar"
                            className="rounded-2 my-2 mt-5 w-100"
                            style={{ height: "200px", marginTop: '10px' }}
                            fluid />
                          <i className={`fas fa-pencil icon-color ${style.editImage}`} ></i>
                          {/* <Image style={{ width: '30px', height: "30px" }} type="button" className={`${style.editImage}`} src={editImage} alt="image one" /> */}
                        </label>
                        <input id="ProductImg" onChange={(e) => {
                          filesSelected(e, 0, 'add')
                          // handleFileInputChange(e);
                        }}
                          className='my-2 d-none' name="emp_photo_filename_path" type="file" accept="image/*" />
                        <p className="text-danger">{errorMessage1}</p>
                      </div>

                    </div>

                    <div className='col-lg-9 row'>
                      {/*//Product Name*/}
                      <div className='col-lg-6 '>
                       <div className='px-4'>

                       <label className=" my-2">Product Name</label>
                        <input className=" form-control mb-3 input" type="text" value={name[0]}
                          placeholder="Product Name"
                          required autoFocus
                          onChange={(e) => {
                            // setName([e.target.value])
                            name[0] = e.target.value;
                            setName([...name]);
                          }} />
                       </div>

                      </div>


                      <div className='col-lg-6 '>
                        <div className='px-4'>
                        <label className=" my-2">Country</label>
                        <Select options={CountryOption}
                          className="basic-single"
                          classNamePrefix="select"
                          value={selectedCountOption}
                          onChange={(e) => {
                            console.log("selected555555555555", e)
                            Country[0] = e.value;
                            setNewCountryId(e.value)
                            setCountry([...Country]);
                            setSelectedCountOption(e)

                          }} />

                        </div>

                      </div>
                      <div className='col-lg-6 '>
                     <div className='px-4'>
                     <label className=" my-2">Vendor</label>
                        <Select options={VendorOption}
                          className="basic-single"
                          classNamePrefix="select"
                          value={selectedVendorOption}
                          onChange={(e) => {
                            console.log("selected urllllllllllllll", e)
                            Vendor[0] = e.value;
                            setVendor([...Vendor]);
                            setSelectedVendorOption(e)

                          }}
                        />
                     </div>

                        {console.log(newStoreTd,"llllllllllllllllll")}
                      </div>
                      <div className='col-lg-6 '>
                      <div className='px-4'>
                      <label className=" my-2">Store</label>
                        <Select options={StoreOption}
                          className="basic-single"
                          classNamePrefix="select"
                          value={selectedStoreOption}
                          onChange={(e) => {
                            console.log("setNewStoreId", e)
                            Store[0] = e.value;
                            setStore([...Store]);
                            setNewStoreId(e.value)
                            setSelectedStoreOption(e)

                          }} />
                      </div>


                      </div>
                      <div className='col-lg-6 '>
                        <div className='px-4'>
                        <label className=" my-2">Category</label>
                        <Select options={CategoryOption}
                          className="basic-single"
                          classNamePrefix="select"
                          value={selectedCatOption}
                          onChange={(e) => {
                            console.log("selected urllllllllllllll", e)
                            Category[0] = e.value;
                            setCategory([...Category]);
                            setSelectedCatOption(e)

                          }} />

                        </div>
                      </div>

                      <div className='col-lg-6 '>
                      <div className='px-4'>
                      <label className=" my-2">Size Or Weight</label>
                        <div className='form-control d-flex justify-content-between'>
                          <div>
                            <input type="radio" name="sizeOrWeight" disabled checked={sizeOeWeight == 'size'} className='mx-2' value="size"
                              onChange={(e) => {
                                // setAddress([e.target.value])
                                // sizeOeWeight[0] = e.target.value;
                                // setsizeOeWeight(e.target.value);
                              }} />
                            <label for="size">Size</label>
                          </div>

                          <div>
                            <input type="radio" name="sizeOrWeight" disabled checked={sizeOeWeight == 'weight'} className='mx-2' value="weight"
                              onChange={(e) => {
                                // setAddress([e.target.value])
                                // sizeOeWeight[0] = e.target.value;

                                // setsizeOeWeight(e.target.value);
                              }} />
                            <label for="weight">Weight</label>
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
                        <div dir={langDir} className='col-12'>
                          <h2>{lang.name}</h2>
                          <div className='row'>
                            <div className='col-lg-3'>
                              <label className=" my-2">Product Name</label>
                              <input className=" form-control mb-3 input" type="text"
                                placeholder="Product Name"
                                required autoFocus
                                value={name[index + 1]}
                                onChange={(e) => {
                                  let fieldIndex = index + 1;
                                  name[fieldIndex] = e.target.value;
                                  setName([...name]);
                                }} />

                            </div>

                            <div className='col-lg-3'>
                              <label className=" my-2">Ingredients</label>
                              <input className=" form-control mb-3 input" type="text"
                                placeholder="Ingredients"
                                required autoFocus
                                value={ingrediant[index + 1]}
                                onChange={(e) => {
                                  let fieldIndex = index + 1;
                                  ingrediant[fieldIndex] = e.target.value;
                                  setingrediant([...ingrediant]);
                                }} />
                            </div>
                            <div className='col-lg-3'>
                              <label className=" my-2">How To Use</label>
                              <input className=" form-control mb-3 input" type="text"
                                placeholder="How To Use"
                                required autoFocus
                                value={howtouse[index + 1]}
                                onChange={(e) => {
                                  let fieldIndex = index + 1;
                                  howtouse[fieldIndex] = e.target.value;
                                  sethowtouse([...howtouse]);
                                }} />
                            </div>
                            <div className='col-lg-3'>
                              <label className=" my-2">Benifits</label>
                              <input className=" form-control mb-3 input" type="text"
                                placeholder="Benifits"
                                required autoFocus
                                value={benfites[index + 1]}
                                onChange={(e) => {
                                  let fieldIndex = index + 1;
                                  benfites[fieldIndex] = e.target.value;
                                  setbenfites([...benfites]);
                                }} />
                            </div>


                          </div>
                        </div>

                      </>
                    )
                  })

                  }


                </div>



                <div className='d-flex justify-content-center'>
                  <button type="submit" onClick={handleSubmit} className={` btn btnCreateAddd mt-3 text-capitalize  fw-bold `}>Edit</button>
                </div>
              </form>
            </Tab>
            <Tab eventKey="productSize" title="Product Size Or Weight">
              {SizeOrWeightInfo.map((size, index) => {
                return (
                  <form key={index} method="POST" className="my-3 create_accont">
                    <div className='row'>

                      <div className='col-12 row'>
                        <div className='col-lg-4 '>
                          <label className=" my-2"> Name</label>
                          <input className=" form-control mb-3 input" type="text"
                            placeholder="Name"
                            required autoFocus
                            value={size.org_s_w.name}
                            onChange={(e) => {
                              // setName([e.target.value])
                              Sizename[0] = e.target.value;
                              setSizeName([...Sizename]);
                            }} />

                        </div>

                        <div className='col-lg-4'>
                          <label className=" my-2">Description</label>
                          <input className=" form-control mb-3 input" type="text"
                            placeholder="Description"
                            title="Please enter at least 20 alphabetical characters"
                            required autoFocus
                            pattern="[A-Za-z]{20,}"
                            value={size.org_s_w.description}
                            onChange={(e) => {

                              Sizedescription[0] = e.target.value;
                              setSizeDescription([...Sizedescription]);
                            }} />
                        </div>
                        <div className='col-lg-4'>
                          <label className=" my-2">Price</label>
                          <input className=" form-control mb-3 input"
                            placeholder="Price"
                            type="number"
                            step="0.01"
                            value={size.org_s_w.price}
                            required autoFocus
                            onChange={(e) => {
                              // setAddress([e.target.value])
                              SizePrice[0] = e.target.value;
                              setSizePrice([...SizePrice]);
                            }} />

                        </div>
                        <div className='col-lg-4'>
                          <label className=" my-2">Global Price</label>
                          <input className=" form-control mb-3 input"
                            placeholder="Price"
                            type="number"
                            step="0.01"
                            required autoFocus
                            value={size.org_s_w.price}
                            onChange={(e) => {
                              // setAddress([e.target.value])
                              SizeGlobalPrice[0] = e.target.value;
                              setSizeGlobalPrice([...SizeGlobalPrice]);
                            }} />

                        </div>
                        <div className='col-lg-4'>
                          <label className=" my-2">Value</label>
                          <input className=" form-control mb-3 input" type="number"
                            placeholder="Value"
                            required autoFocus
                            value={size.org_s_w.value}
                            onChange={(e) => {
                              // setAddress([e.target.value])
                              SizeValue[0] = e.target.value;
                              setSizeValue([...SizeValue]);
                            }} />

                        </div>
                        <div className='col-lg-4'>
                          <label className=" my-2">Unit</label>
                          <Select options={sizeOeWeight == 'weight' ? weightOption : sizeOption}
                            value={{ value: size.org_s_w.unit, label: size.org_s_w.unit }}
                            onChange={(e) => {
                              console.log("selected unittttttttttt", e)

                              SizeUnit[0] = e.value;
                              setSizeUnit([...SizeUnit]);

                            }} />
                          {/* <input className=" form-control mb-3 input" type="text"
                  placeholder="Unit"
                  required autoFocus
                  onChange={(e) => {
                    // setAddress([e.target.value])
                    SizeUnit[0] = e.target.value;
                    setSizeUnit([...SizeUnit]);
                  }} /> */}

                        </div>
                        <div className='col-lg-4'>
                          <label className=" my-2">Stock</label>
                          <input className=" form-control mb-3 input" type="number"
                            placeholder="Stock"
                            required autoFocus
                            value={size.org_s_w.stock}
                            onChange={(e) => {
                              // setAddress([e.target.value])
                              SizeStock[0] = e.target.value;
                              setSizeStock([...SizeStock]);
                            }} />

                        </div>
                        <div className='col-lg-4'>
                          <label className=" my-2">Max Order</label>
                          <input className=" form-control mb-3 input" type="number"
                            placeholder="Max_Order"
                            value={size.org_s_w.max_order}
                            required autoFocus
                            max={SizeStock[0]}

                            onChange={(e) => {
                              // setAddress([e.target.value])
                              SizeMax_Order[0] = e.target.value;
                              setSizeMax_Order([...SizeMax_Order]);
                            }} />

                        </div>
                        <div className='col-12 row'>
                        <div className='col-lg-2'>
                          <label>Image of {sizeOeWeight}</label>
                          <div id="profile-img">
                            <label for="size" className="position-relative w-100">
                              <img src={`data:image/png;base64, ${size.org_s_w.image}`}
                                alt="avatar"
                                className="rounded my-2 w-100"
                                style={{ height: "160px", marginTop: '10px' }}
                                fluid />
                              <i className={`fas fa-pencil ${style.editImage} icon-color`} ></i>
                              {/* <Image style={{ width: '30px', height: "30px" }} type="button" className={`${style.editImage}`} src={editImage} alt="image one" /> */}
                            </label>

                            <input id="size" onChange={(e) => {
                              setSizeOrWeghtId(size.org_s_w.sw_id)
                              console.log("###########################################size image", size.org_s_w.sw_id)
                              filesSelected(e, 0, 'size')
                              // handleFileInputChange(e);
                            }}
                              className='my-2 d-none' name="emp_photo_filename_path" type="file" accept="image/*" />
                            <p className="text-danger">{errorMessage1}</p>
                          </div>

                        </div>
                        <div className='col-lg-10 '>
                          <label for=""> List Of Images</label>
                          <div className='row' style={{ border: '1.5px solid #dddddd ', borderRadius: "8px" }}>
                            <div className='col-11 row'>
                            {size.org_s_w.imgs.map((img, index) => {
                              return (
                                <div className='col-2' id="profile-img">
                                  <label className="position-relative w-100">
                                    <img src={`data:image/png;base64, ${img.image}`}
                                      alt="avatar"
                                      className="rounded my-2 w-100"
                                      style={{ height: "160px", marginTop: '10px' }}
                                      fluid />

                                    <Link className='position-absolute rounded-circle ' style={{ bottom: "20px", right: "5px", padding: "2px 8px", backgroundColor: '#ffffff' }} onClick={(e) => {
                                        e.preventDefault()


                                        DeleteAlert(img.id, 'sizeImg')
                                    }}>
                                      <img src={imgDelete} width={14} height={14} alt="" />
                                    </Link>


                                  </label>

                                </div>
                              )

                            })}

                            </div>


                          <div className='col-1 d-flex align-items-center justify-content-center'>
                          <div className='text-end '>
                              <label for="sizeImg" className="position-relative m-2 p-2">

                                
                                <img src={imgPlus} alt="" width={30} height={30}/>

                              </label>
                              <input id="sizeImg" onChange={(e) => {
                                console.log("Size Image changed", size.org_s_w.sw_id);
                                setSizeOrWeghtId(size.org_s_w.sw_id)
                                filesSelected(e, 0, 'sizeImg')

                              }}
                                className='my-2 d-none' name="emp_photo_filename_path" type="file" accept="image/*" />

                            </div> 
                          </div>

                          </div>

                        </div>
                        </div>

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
                                <h2>{lang.lang}</h2>
                                <div className='row'>


                                  <div className='col-12 row'>
                                    <div className='col-lg-4'>
                                      <label className=" my-2">Size or Weight  Name</label>
                                      <input className=" form-control mb-3 input" type="text"
                                        placeholder=" Name"
                                        required autoFocus
                                        value={lang.name}
                                        onChange={(e) => {
                                          let fieldIndex = index + 1;
                                          Sizename[fieldIndex] = e.target.value;
                                          setSizeName([...Sizename]);
                                        }} />

                                    </div>

                                    <div className='col-lg-4'>
                                      <label className=" my-2">Description</label>
                                      <input className=" form-control mb-3 input" type="text"
                                        placeholder="Description"
                                        value={lang.description}
                                        required autoFocus
                                        onChange={(e) => {
                                          let fieldIndex = index + 1;
                                          Sizedescription[fieldIndex] = e.target.value;
                                          setSizeDescription([...Sizedescription]);
                                        }} />
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



                    <div className='d-flex justify-content-center'>
                      <button type="button" onClick={(e)=>{
                        e.preventDefault();
                        addSizeOrWeight(size.org_s_w.sw_id);
                        prodEdit()}} className={`   btn btnCreateAddd mt-3 text-capitalize  fw-bold `}>Edit</button>
                    </div>
                  </form>
                )
              })}
            </Tab>
            <Tab eventKey="productCertificate" title="Product Certificates">
              {/* <Dropzone /> */}
              <div>
                <div className='row mx-0 w-100' style={{ border: '1.5px solid #dddddd ', borderRadius: "8px" }}>
                  {certificate.map((img, index) => {
                    return (
                      <div className='col-3 col-lg-2' id="profile-img">
                       <div className="imgAdd my-3">
                       <label className="position-relative w-100">
                          <img src={`data:image/png;base64, ${img.image}`}
                            alt="avatar"
                            className="  w-100"
                            style={{ height: "160px", borderRadius:"16px" }}
                            fluid />
                              <Link className='position-absolute rounded-circle ' style={{ bottom: "20px", right: "5px", padding: "2px 8px", backgroundColor: '#ffffff' }} onClick={(e) => {
                                         e.preventDefault()
                                         DeleteAlert(img.id, 'certImg')
                                    }}>
                                      <img src={imgDelete} width={14} height={14} alt="" />
                                    </Link>
                          {/* <i className={`fas fa-trash icon-color ${style.editImage}`} type='button' onClick={(e) => {
                          
                          }}></i> */}

                        </label>
                       </div>

                      </div>
                    )
                  })}
                 <div className='col-2  d-flex justify-content-center align-items-center'>
                 <div className='text-end p-2 '>
                    <label for="cert" className="position-relative  m-2 p-2">

                    <img src={imgPlus} alt="" width={30} height={30}/>

                    </label>
                    <input id="cert" onChange={(e) => {
                      filesSelected(e, 0, 'certImg')

                    }}
                      className='my-2 d-none' name="emp_photo_filename_path" type="file" accept="image/*" />

                  </div>
                 </div>
                </div>
              </div>
            </Tab>

          </Tabs>
        </div>
      </div>

    </>

  )

}
