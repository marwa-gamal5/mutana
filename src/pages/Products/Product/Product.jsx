import React, { useState, useEffect, useRef } from 'react'

import Swal from "sweetalert2";
import axiosInstance from '../../../axiosConfig/instanse';
// import FixedNavbar from '../../../components/FixedNavbar/FixedNavbar'
import cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { Sidebar } from 'semantic-ui-react';
import Sidebar from '../../../components/AdminSidebar/AdminSidebar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../../index.css'
import style from './Product.module.css'
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from '@mui/material';
import Select from 'react-select'

import Dropzone from '../Dropzone/Dropzone';

import imgCert from '../../../assets/product/certificate.webp'
import imgEdit from '../../../assets/product/edit.webp'
import imgView from '../../../assets/product/veiw.webp'
import imgDelete from '../../../assets/product/delete.webp'
import imgAdd from '../../../assets/product/add.webp'
import imgAddbtn from '../../../assets/add-button.webp'
import closeImg from '../../../assets/exit-icon.webp'
import ReactPaginate from "react-paginate";
import searchImg from '../../../assets/search.webp'
export default function Product() {
  const navigate = useNavigate()
  const [Products, setProducts] = useState([]);
  const [productId, setproductId] = useState();
  const [name, setName] = useState([]);
  const [Sizename, setSizeName] = useState([]);
  const [address, setAddress] = useState([]);
  const [description, setDescription] = useState([]);
  const [Sizedescription, setSizeDescription] = useState([]);
  const [Price, setPrice] = useState([]);
  const [SizePrice, setSizePrice] = useState([]);
  const [SizeValue, setSizeValue] = useState([]);
  const [SizeUnit, setSizeUnit] = useState([]);
  const [SizeStock, setSizeStock] = useState([]);
  const [SizeMax_Order, setSizeMax_Order] = useState([]);
  const [Image, setImage] = useState([]);
  const [SizeImage, setSizeImage] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [stateError, setStateError] = useState(false);
  const [sizeOeWeight, setsizeOeWeight] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [itemId, setItemId] = useState();
  const [addOrEdit, setAddOrEdit] = useState('')
  const [testModal, setTestModal] = useState('');
  const [funModal, setFunModal] = useState();
  const [show, setShow] = useState(false);


  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [size, setsize] = useState('Size');
  const [weight, setweight] = useState('Weight');
  const [stateError1, setStateError1] = useState(false);
  const [weightOption, setweightOption] = useState([
    { value: 'kg', label: 'kg' },
    { value: 'pound', label: "Pound" }
  ]);
  const [sizeOption, setsizeOption] = useState([
    { value: 'EG', label: 'EG' },
    { value: 'EU', label: "EU" }
  ]);


  const [validFiles, setValidFiles] = useState([]);
  const modalImageRef = useRef();
  const modalRef = useRef();
  const fileInputRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const langList = useSelector(state => state.langList.langList);
  function showAlert(message, icon) {
    Swal.fire({
      title: message,
      icon: icon,
      showConfirmButton: false,
      timer: 1500
    });
  }
  const handleClose = () => {
    setShow(false)
   
   setValidFiles([])

  };
  const handleShow = () => setShow(true);

  let token = localStorage.getItem("token");


  const currentLanguageCode = useSelector((state) => state.language.lang);
  console.log("currentLanguageCode: " + currentLanguageCode);
  async function getProducts() {
    await axiosInstance.post(`store/view_all_products_admin`, {
      token: token,
      lang: currentLanguageCode
    }).then(res => {
      console.log("get Products", res);
      setProducts(res.data.success);
    }).catch(err => {
      console.log("product", err);
    });
  }



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

  const [selectedFile, setSelectedFile] = useState("");
  const [invalid, setInvalid] = useState(false);

  const filesSelected = (e, index, test) => {
    console.log("selected", e.target.files[0])
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
      } else {
        SizeImage[fileIndex] = file;
        setSizeImage([...SizeImage]);
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



  const uploadFiles = (e) => {
    e.preventDefault();
    uploadModalRef.current.style.display = 'block';
    uploadRef.current.innerHTML = 'File(s) Uploading...';
    console.log(validFiles);
    const formData = new FormData();
    for (let i = 0; i < validFiles.length; i++) {


      formData.append('images[]', validFiles[i])

    }

    console.log(formData)



  }

  const uploadModalRef = useRef();
  const uploadRef = useRef();
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

  async function addSizeOrWeight(itemId) {
    console.log("froms&w ", itemId, Sizedescription[0]);
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
    formData.append('id', itemId);
    formData.append('image', SizeImage[0]);
    formData.append('thumbnail', SizeImage[0]);
    formData.append('name', Sizename[0]);
    formData.append('description', Sizedescription[0]);
    formData.append('seller_id', 1);
    formData.append('price', SizePrice[0]);
    formData.append('stock', SizeStock[0]);
    formData.append('unit', SizeUnit[0]);
    formData.append('max_order', SizeMax_Order[0]);
    formData.append('size_or_weight', sizeOeWeight[0]);
    formData.append('value', SizeValue[0]);

    // {
    //   token: token,
    //   id: itemId,
    //   name: Sizename[0],
    //   description: Sizedescription[0],
    //   seller_id: 1,
    //   price:SizePrice[0],
    //   stock:SizeStock[0],
    //   unit:SizeUnit[0],
    //   images_list:Image,
    //   max_order:SizeMax_Order[0]


    // }
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
    console.log("additemT", itemId)
    let id = itemId;
    let lang = langCode;
    let index = LangIndex;
    console.log(name[index],
      address[index],
      description[index]);
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
          showAlert(`${sizeOeWeight} Added Successfuly`, "success");
          // navigate('/product')
          handleClose();

        }
      }



    }).catch(err => {
      console.log("err t", err);
    });

  }



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
    // const imag =[]
    filteredArray.map((file) => {



        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = () => {
            const imageDataUrl = reader.result;
            imageDataUrlsss.push({ fileName: imageDataUrl, fileInfo: file });
            // imag.push(file)

            console.log("imagesurlssss in on load", imageDataUrlsss);
            setValidFiles(imageDataUrlsss);
            // setImagLength(imageDataUrlsss.length)
           
            // dispatch(changeimageList(imag))
        }


    });
       const img = [] ;
    console.log("befor iffff", imageDataUrlsss);

   console.log("imaaaaaaage", img)
    // dispatch(changeimageList(img));

}, [selectedFiles]);

  console.log("showwwwwwwwwwww", show)



  useEffect(() => {

    const endpoint = window.location.pathname.split('/')[1];
    // setEndpoint(endpoint);
    // testUrl(endpoint);


    if (testModal === 'size') {
     
      handleShow()
      setFunModal(true)
     
    } else if (testModal === 'cert') {
    
      handleShow();
     

    }
  }, []);


  useEffect(() => {
    getProducts();
  }, [currentLanguageCode])


  function DeleteAlert(id) {
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
        DaleteItem(id)
      }
    })
  }



  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  function afterDelete(message, icon) {
    Swal.fire({
      title: message,
      icon: icon,
      showConfirmButton: false,
      timer: 1500
    });
  }



  const DaleteItem = async (itemId) => {
    await axiosInstance.post(`store/delete_item`, {
      token: token,
      id: itemId
    }).then(res => {
      if (res.data.success) {

        let index = Products.findIndex(ele => ele.org.id === itemId);
        Products.splice(index, 1)
        setProducts([...Products]);

        // languageList.map((lang, index)=>{
        //   let LangIndex = index + 1;
        //   let langCode = lang.code ;
        //   console.log(stateError);
        //   if(stateError == false){
        //     console.log(stateError);
        deleteItemT(itemId);
        // }
        // })
        getProducts();
      } else {
        let message = res.data.error;
        afterDelete(message, 'error');
      }
    });
  }


  async function deleteItemT(itemId) {
    await axiosInstance.post(`store/delete_product_T`,
      {
        token: token,
        id: itemId,
      }

    ).then(res => {
      console.log("res t", res);
      if (res.data.error) {
        console.log("res t from if error :", res.data.error);
        afterDelete(res.data.error, "error");
        setStateError(true);
      } else {
        let message = res.data.success;
        afterDelete(message, 'success');
        // console.log(LangIndex);
        // console.log(languageList.length);
        //   if(LangIndex == languageList.length){
        //     afterDelete(res.data.success, "success");
        //   }
      }

    }).catch(err => {
      console.log("err t", err);
    });

  }

  useEffect(() => {
    setLanguageList(langList);

  }, [langList]);

// pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  // Assuming you have the 'Products' array defined

  const filteredItems = Products.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
          <button  className={`btn btn-sm me-1 ${currentPage === i ? 'btn-success' : 'btn-outline-success'} `}
              key={i}
              onClick={() => handlePageChange(i)}
              disabled={currentPage === i}
          >
            {i}
          </button>
      );
    }
    return buttons;
  };



  return (

    <>

      {/* <FixedNavbar />  */}
      <Sidebar />
      <div id='home_page' className='page-section-home min-vh-100'>

        <div className='d-flex justify-content-between '>
          <h3 className="m-2" >
            {/* <i className="fa-solid fa-table-list me-3" style={{color: "#CD5C5C "}}></i> */}
            Products
          </h3>
          {/* <Link to="/addVendor" className='fa-regular fa-square-plus text-danger fs-2 text-decoration-none'></Link> */}

        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 p-3">
            <div className='row justify-content-center '>
                  <div className='col-12 '>
                    <div className=' row align-items-end justify-content-end'>
                      <div className='col-lg-3'>

                        <div className="search-container mx-lg-3 my-2">
                          <input
                              type="text"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              placeholder="Search"
                          />
                          <img src={searchImg} className='search-icon' width={16} height={16} alt=""/>

                        </div>


                      </div>
                      <div className={` text-end mx-lg-3 col-lg-2 my-2`}>
                        <Link className={` btn   btnCreateAdd d-flex w-lg-75 mx-auto `} type="button" onClick={(e) => {
                          e.preventDefault();
                          navigate('/addproduct')
                        }}><img src={imgAddbtn} className=' me-2' width={24} height={24} alt=""/>Add Product </Link>
                      </div>
                    </div>
                  </div>

                </div>
              <TableContainer className='TableContainer' component={Paper}>



                <Table className='Table'>
                  <TableHead>
                    <TableRow >
                      <TableCell className='TableHeadCell fw-bold'>ID</TableCell>
                      <TableCell className='TableHeadCell fw-bold'>Products</TableCell>
                      <TableCell className='TableHeadCell fw-bold'>Image</TableCell>
                      {/* <TableCell className='TableHeadCell fw-bold'>Description</TableCell> */}
                      <TableCell className='TableHeadCell fw-bold'>ِAdd New Size Or Weight</TableCell>
                      <TableCell className='TableHeadCell fw-bold'> Add Certificate </TableCell>
                      <TableCell className='TableHeadCell fw-bold'>Edit</TableCell>
                      <TableCell className='TableHeadCell fw-bold'>View</TableCell>
                      <TableCell className='TableHeadCell fw-bold'>Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {currentItems.map((item, index) => (
                        <TableRow className='TableRow' key={index}>
                                <TableCell className='TableCell'>{index + 1}</TableCell>
                                <TableCell className='TableCell'>{item.name}</TableCell>
                                <TableCell className='TableCell'><img className='rounded-circle' src={`data:image/png;base64, ${item.image}`} width={60} height={60} alt="" /></TableCell>
                                {/* <TableCell className='TableCell'>{item.price}</TableCell> */}
                                <TableCell className='TableCell '>
                                  <div className="table-data-feature justify-content-start">

                                    <Link type='button' className="item" onClick={() => {

                                      setTestModal('size');

                                      sizeOeWeight[0] = item.size_or_weight;
                                      setsizeOeWeight([...sizeOeWeight]);

                                      setproductId(item.id)
                                      handleShow();

                                    }} >
                                      <img src={imgAdd} width={12} height={12} alt=""/>


                                    </Link>


                                  </div>

                                </TableCell>
                                <TableCell className='TableCell '>
                                  <div className="table-data-feature justify-content-start">

                                    <Link type='button' className="item" onClick={() => {

                                      setTestModal('cert');



                                      setproductId(item.id)
                                      handleShow();

                                    }} >
                                         <img src={imgCert} width={20} height={20} alt=""/>


                                    </Link>


                                  </div>

                                </TableCell>

                                <TableCell className='TableCell '>
                                  <div className="table-data-feature justify-content-start">

                                    <Link type='button' className="item" to={`/editproduct/${item.id}`} onClick={() => {

                                      // setTestModal('edit');

                                    }} >


                                      <img src={imgEdit} width={16} height={16} alt=""/>
                                    </Link>


                                  </div>

                                </TableCell>
                                <TableCell className='TableCell '>
                                  <div className="table-data-feature justify-content-start">

                                    <Link type='button' className="item" to={`/viewproduct/${item.id}`} onClick={() => {

                                      // setTestModal('edit');

                                    }} >


                                      <img src={imgView} width={20} height={20} alt=""/>
                                    </Link>


                                  </div>

                                </TableCell>

                                <TableCell className='TableCell '>
                                  <div className="table-data-feature justify-content-start">
                                    <form>
                                      <Link type='button' className="item"
                                        onClick={() => {
                                          let id = item.org.id;
                                          DeleteAlert(id);
                                        }}>


                                        <img src={imgDelete} width={16} height={16} alt=""/>

                                      </Link>
                                    </form>


                                  </div>

                                </TableCell>
                              </TableRow>
                    ))}

                  </TableBody>
                </Table>
              </TableContainer>

              <div className='d-flex justify-content-center'>
                <div className="pagination">
                  <button  className={`btn btn-sm me-1 btn-success ${isPreviousDisabled ? 'disabled' : ''}`}
                           onClick={handlePreviousPage}
                           disabled={isPreviousDisabled}
                  >
                    Previous
                  </button>
                  {renderPaginationButtons()}
                  <button className={`btn btn-sm ms-1 btn-success ${isNextDisabled ? 'disabled' : ''}`}
                          onClick={handleNextPage}
                          disabled={isNextDisabled}
                  >
                    Next
                  </button>
                </div>
              </div>

            </div>

           {testModal === 'size' ? <>
           <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered show={show} onHide={handleClose} className="">
              <Modal.Header >
                <Modal.Title>Add New {sizeOeWeight == 'weight' ? weight : size}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form method="POST" className="my-3 create_accont">
                  <div className='col-12 row'>
                    <div className='col-lg-6'>
                      <label className=" my-2"> Name</label>
                      <input className=" form-control mb-3 input" type="text"
                        placeholder="Name"
                        required autoFocus
                        onChange={(e) => {
                          // setName([e.target.value])
                          Sizename[0] = e.target.value;
                          setSizeName([...Sizename]);
                        }} />

                    </div>

                    <div className='col-lg-6'>
                      <label className=" my-2">Description</label>
                      <input className=" form-control mb-3 input" type="text"
                        placeholder="Description"
                        title="Please enter at least 20 alphabetical characters"
                        required autoFocus
                        pattern="[A-Za-z]{20,}"

                        onChange={(e) => {
                          // setDescription([e.target.value])
                          Sizedescription[0] = e.target.value;
                          setSizeDescription([...Sizedescription]);
                        }} />
                    </div>
                    <div className='col-lg-6'>
                      <label className=" my-2">Price</label>
                      <input className=" form-control mb-3 input"
                        placeholder="Price"
                        type="number"
                        step="0.01"
                        required autoFocus
                        onChange={(e) => {
                          // setAddress([e.target.value])
                          SizePrice[0] = e.target.value;
                          setSizePrice([...SizePrice]);
                        }} />

                    </div>
                    <div className='col-lg-6'>
                      <label className=" my-2">Value</label>
                      <input className=" form-control mb-3 input" type="number"
                        placeholder="Value"
                        required autoFocus
                        onChange={(e) => {
                          // setAddress([e.target.value])
                          SizeValue[0] = e.target.value;
                          setSizeValue([...SizeValue]);
                        }} />

                    </div>
                    <div className='col-lg-6'>
                      <label className=" my-2">Unit</label>
                      <Select options={sizeOeWeight == 'weight' ? weightOption : sizeOption} onChange={(e) => {
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
                    <div className='col-lg-6'>
                      <label className=" my-2">Stock</label>
                      <input className=" form-control mb-3 input" type="number"
                        placeholder="Stock"
                        required autoFocus
                        onChange={(e) => {
                          // setAddress([e.target.value])
                          SizeStock[0] = e.target.value;
                          setSizeStock([...SizeStock]);
                        }} />

                    </div>
                    <div className='col-lg-6'>
                      <label className=" my-2">Max Order</label>
                      <input className=" form-control mb-3 input" type="number"
                        placeholder="Max_Order"

                        required autoFocus
                        max={SizeStock[0]}

                        onChange={(e) => {
                          // setAddress([e.target.value])
                          SizeMax_Order[0] = e.target.value;
                          setSizeMax_Order([...SizeMax_Order]);
                        }} />

                    </div>
                    <div className='col-lg-6'>
                      <label className=" my-2">Select Image</label>
                      <div className={`d-flex `}>
                        <input
                          className="file-input d-block form-control"
                          type="file"
                          onChange={(e) => {
                            filesSelected(e, 0, 'size')
                          }}
                          name="file"
                          accept="image/*"
                        />

                      </div>
                      <p className="text-danger">{errorMessage1}</p>
                    </div>
                    <div className='col-lg-12'>
                      <label className=" my-2">Select List Of Images</label>
                      {/* <Dropzone /> */}

                      <div className="">

                        <div className={`${style.Drop} `}>

                          <div className=' '>
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
                                    </form>
                                  </div>
                                </div>
                              </div>
                              <div className='col-lg-12 my-2 ' >
                                <div className={`${style.displayImg} file-display-container p-3`} style={{ maxHeight: "280px", overflowY: "scroll" }}>

                                  <div className="row">
                                    {

                                      validFiles.map((data, i) =>

                                        <div className="col-2   my-1" key={i} >


                                          <div className="   position-relative">

                                            <img className=" rounded w-100" src={data.fileName}  height={60} alt="" />

                                                <Link className='position-absolute rounded-circle ' style={{ bottom: "20px", right: "5px", padding:"2px 8px" ,backgroundColor:'#ffffff'}} onClick={() => removeFile(data.fileInfo.name)}>
                                                <img src={imgDelete} width={14} height={14} alt=""/>
                                                </Link>


                                            <div className="d-flex flex-column">

                                              <small className=" fs-10" style={{ fontSize: "12px" }}>({fileSize(data.fileInfo.size)})</small> {data.fileInfo.invalid && <small className='text-danger fs-10' style={{ fontSize: "12px" }}>({errorMessage})</small>}
                                            </div>
                                            <div className="row justified-content-between position-absolute" >
                                              {/* <div className="col-6 font-weight-bold " >
                                                <i class="far fa-eye icon-color" onClick={() => { openImageModal(data) }}></i>

                                              </div> */}
                                              {/* <div className="col-6 font-weight-bold " >
                                                <Link className='' onClick={() => removeFile(data.fileInfo.name)}>
                                                <img src={imgDelete} width={16} height={16} alt=""/>
                                                </Link>

                                              </div> */}

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
                                <span className="close" onClick={(() => closeModal())} style={{ cursor: "pointer" }}>X</span>
                                <div className="modal-image" ref={modalImageRef}></div>
                              </div>


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
                <div dir={langDir}>
                  <h2>{lang.name}</h2>
                  <div className='row'>

                    <div className='col-12 row'>
                    <div className='col-lg-6'>
                      <label className=" my-2"> Name</label>
                      <input className=" form-control mb-3 input" type="text"
                        placeholder=" Name"
                        required autoFocus
                        onChange={(e) => {
                          let fieldIndex = index + 1;
                          Sizename[fieldIndex] = e.target.value;
                          setSizeName([...Sizename]);
                        }} />

                    </div>

                    <div className='col-lg-6'>
                      <label className=" my-2">Description</label>
                      <input className=" form-control mb-3 input" type="text"
                        placeholder="Description"
                        required autoFocus
                        onChange={(e) => {
                          let fieldIndex = index + 1;
                          Sizedescription[fieldIndex] = e.target.value;
                          setSizeDescription([...Sizedescription]);
                        }} />
                    </div>

                    </div>
                    {/* <div className='col-lg-4'>
                          <label className=" my-2">Description</label>
                          <input className=" form-control mb-3 input" type="text"
                            placeholder="Description"
                            required autoFocus
                            onChange={(e) => {
                              let fieldIndex = index + 1 ;
                              description[fieldIndex] = e.target.value ;
                              setDescription([...description]);
                            }} />
                        </div> */}
                  </div>
                </div>

              </>
            )
          })

          }


                </form>
              </Modal.Body>
              <Modal.Footer className='justify-content-center'>
                {/* <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button> */}
                <Button className={`btnCreateAddd`} onClick={() => {
                  // if (funModal === true) {
                  //   handleFormSubmit()
                  // } else {
                  //   handleFormEditSubmit()
                  // }
                  addSizeOrWeight(productId)


                }}>
                  Save Changes
                </Button>
              </Modal.Footer>

              <button className={`close-my-modal`} onClick={handleClose} >
                   <img src={closeImg} alt=" close Image" style={{ width:"40px" , height:"40px" }}   />
              </button>
            </Modal>
           </>: <>

           {/* <Dropzone  id={productId} show={true}/> */}
           <Modal show={show} onHide={handleClose}>
              <Modal.Header >
                <Modal.Title>Add Certificate</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <label>Selet List Of Images</label>
                <Dropzone id={productId} close={handleClose} cert={'cert'} />
              </Modal.Body>
              {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button className={`btnCreate`} onClick={() => {
                  // if (funModal === true) {
                  //   handleFormSubmit()
                  // } else {
                  //   handleFormEditSubmit()
                  // }


                }}>
                  Save Changes
                </Button>
              </Modal.Footer> */}
                 <button className={`close-my-modal`} onClick={handleClose} >
                   <img src={closeImg} alt="close Image" style={{ width:"40px" , height:"40px" }}   />
              </button>
            </Modal>


           </>}
          </div>


        </div>
        {/* <table className="table table-hover bg-white">
        <thead>
          <tr>
              <th>#</th>
              <th>Products</th>
              <th>Address</th>
              <th>Description</th>
              <th>update</th>
              <th>delete</th>
          </tr>
        </thead>
        <tbody>

              {Products.map((Vendor,index) => {
              return(

                <tr key={index}>
                  <th scope="row " className='ms-2'>{index+1}</th>
                  <td className='text-nowrap p-2'>{Vendor.trans.name}</td>
                  <td className='text-nowrap p-2'>{Vendor.trans.address}</td>
                  <td className='text-nowrap p-2'>{Vendor.trans.description}</td>
                  <td>
                    <Link to={`/editvendor/${Vendor.org.id}`} className='fa-sharp fa-solid fa-pen-to-square text-danger fs-2 text-decoration-none'></Link>
                  </td>

                  <td>
                    <Link className='fa-sharp fa-solid fa-trash text-danger fs-2 text-decoration-none' onClick={()=>{
                      let id = Vendor.org.id ;
                        DeleteAlert(id);
                    }}>
                    </Link>
                  </td>
                </tr>
              )
              })
            }

        </tbody>
      </table>  */}
      </div>

    </>

  )

}
