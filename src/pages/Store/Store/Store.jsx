import React, { useState, useEffect } from 'react'

import Swal from "sweetalert2";
import axiosInstance from '../../../axiosConfig/instanse';
import cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../../../components/AdminSidebar/AdminSidebar';
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
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../../index.css'
import imgEdit from '../../../assets/product/edit.webp'
import imgView from '../../../assets/product/veiw.webp'
import imgDelete from '../../../assets/product/delete.webp'
import imgAdd from '../../../assets/product/add.webp'
import imgAddbtn from '../../../assets/add-button.webp'
import closeImg from "../../../assets/exit-icon.webp";
import searchImg from '../../../assets/search.webp'
export default function Store() {

  const [Store, setStore] = useState([]);
  const [itemId, setItemId] = useState();
  const [name, setName] = useState([]);
  const [address, setAddress] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [stateError, setStateError] = useState(false);
  const [addOrEdit, setAddOrEdit] = useState('')
  const [testModal, setTestModal] = useState('');
  const [funModal, setFunModal] = useState();
  const langList = useSelector(state => state.langList.langList);

  console.log(langList);

  let token = localStorage.getItem("token");

  const currentLanguageCode = useSelector((state) => state.language.lang);
  const [show, setShow] = useState(false);

  const handleClose = () => {
      setShow(false)
      setTestModal('')
      setName([])
      setAddress([])
    
  };
  const handleShow = () => setShow(true);

  
  function showAlert(message, icon) {
    Swal.fire({
      title: message,
      icon: icon,
      showConfirmButton: false,
      timer: 1500
    });
  }
  async function getStore() {
    await axiosInstance.post(`store/view_all_stores`, {
      token: token,
      lang: currentLanguageCode,
      seller_id: 1
    }).then(res => {
      console.log("all store", res);
      setStore(res.data.success);
    }).catch(err => {
      console.log(err);
    });
  }


  const fetchOneItem = async (id) => {

    await axiosInstance.post(`store/view_one_store`, {
      id: id,
      token: token,
      seller_id: 1
    }).then(res => {
      console.log("view one store", res);

      name[0] = res.data.success.org_store.name;
      address[0] = res.data.success.org_store.address;
      // description[0] = res.data.success.org_store.description;

      res.data.success.translations.map((ele, index) => {
        name[index + 1] = ele.name;
        address[index + 1] = ele.address;
        // description[index+1] = ele.description;
      })

      setName([...name]);
      setAddress([...address]);
      // setDescription([...description]);

    }).catch(err => {
      console.log(err);
    });
  };
  useEffect(() => {
    getStore();
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
        DaleteStore(id)
      }
    })
  }


  function afterDelete(message, icon) {
    Swal.fire({
      title: message,
      icon: icon,
      showConfirmButton: false,
      timer: 1500
    });
  }


  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };



  const DaleteStore = async (storeId) => {
    await axiosInstance.post(`store/delete_store`, {
      token: token,
      id: storeId,
      seller_id: 1
    }).then(res => {
      if (res.data.success) {

        let index = Store.findIndex(ele => ele.org.id === storeId);
        Store.splice(index, 1)
        setStore([...Store]);

        // languageList.map((lang, index)=>{
        //   let LangIndex = index + 1;
        //   let langCode = lang.code ;
        //   console.log(stateError);
        //   if(stateError == false){
        //     console.log(stateError);
        deleteStoreT(storeId);
        // }
        // })
        getStore();
      } else {
        let message = res.data.error;
        afterDelete(message, 'error');
      }
    });
  }


  async function deleteStoreT(storeId) {
    await axiosInstance.post(`store/delete_store`,
      {
        token: token,
        id: storeId,
        seller_id: 1
      }
    ).then(res => {
      // console.log("res t", res);
      if (res.data.error) {
        console.log("res t from if error :", res.data.error);
        afterDelete(res.data.error, "error");
        // setStateError(true);
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

  const handleFormEditSubmit = (e) => {
    e.preventDefault();
    let { data } = axiosInstance.post(`store/update_store`, {
      token: token,
      id: itemId,
      name: name[0],
      address: address[0],
      seller_id: 1
    }).then(res => {
      console.log("from org :", res);
      if (res.data.success) {
        languageList.map((lang, index) => {
          let langCode = lang.code;
          let LangIndex = index + 1;
          console.log(langCode);
          console.log(stateError);
          if (stateError == false) {
            console.log(stateError);
            editStoresT(langCode, LangIndex);
          }
        });
      } else {
        console.log("res one from else :", res.data.error);
        showAlert(res.data.error, "error");
      }
    }).catch(err => {
      console.log("err one", err);
    });
  };
  async function editStoresT(langCode , LangIndex){
    let lang = langCode;
    let index = LangIndex;
    await axiosInstance.post(`store/update_store_T`,
        {
          token: token,
          id: itemId,
          lang:lang,
          name: name[index],
          address: address[index],
          seller_id: 1
        }
    ).then(res => {
        console.log("res ttt", res);
        if(res.data.error){
          console.log("res t from if error :", res.data.error);
          showAlert(res.data.error, "error");
          setStateError(true);
        }else{
          console.log(LangIndex);
          console.log(languageList.length);
            if(LangIndex == languageList.length){
                showAlert(res.data.success, "success");
          
            }
        }

    }).catch(err => {
      console.log("err t", err);
    });

}


  const handleFormSubmit = (e) => {
    e.preventDefault();
    let { data } = axiosInstance.post(`store/add_store`, {
      token: token,
      name: name[0],
      address: address[0],
      seller_id: 1
    }).then(res => {
      if (res.data.success) {
        console.log("add res", res)
        let storeId = res.data.id;
        languageList.map((lang, index) => {
          let langCode = lang.code;
          let LangIndex = index + 1;
          console.log(langCode);
          console.log(stateError);
          if (stateError == false) {
            console.log(stateError);
            addStoreT(storeId, langCode, LangIndex);
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


  async function addStoreT(storeId, langCode, LangIndex) {
    console.log("addStoreT", storeId)
    let id = storeId;
    let lang = langCode;
    let index = LangIndex;
    console.log(name[index],
      address[index]);
    await axiosInstance.post(`store/add_store_T`,
      {
        token: token,
        id: id,
        lang: lang,
        name: name[index],
        address: address[index],
        // description: description[index] ,
        seller_id: 1

      }
    ).then(res => {
      console.log("res t", res);
      if (res.data.error) {
        console.log("res t from if error :", res.data.error);
        showAlert(res.data.error, "error");
        setStateError(true);
      } else {
        console.log(LangIndex);
        console.log(languageList.length);
        if (LangIndex == languageList.length) {
          showAlert(res.data.success, "success");
       
        }
      }



    }).catch(err => {
      console.log("err t", err);
    });

  }

  useEffect(() => {

    const endpoint = window.location.pathname.split('/')[1];
    // setEndpoint(endpoint);
    // testUrl(endpoint);


    if (testModal === 'add') {
     setName([])
     setAddress([])
      handleShow()
      setFunModal(true)
      setAddOrEdit('Add')
    } else if (testModal === 'edit') {
      fetchOneItem(itemId)
      handleShow();
      setFunModal(false)
      setAddOrEdit('Edit')
    
    }
  }, [testModal, itemId]);


  console.log("address", address)
  return (

    <>

      <Sidebar />

      <div id='home_page' className='page-section-home min-vh-100'>

        <div className='d-flex justify-content-between'>
          <h3 className="m-2" >
            {/* <i className="fa-solid fa-table-list me-3" style={{ color: "#CD5C5C " }}></i> */}
            Store
          </h3>
          {/* <Link to="/addStore" className='fa-regular fa-square-plus text-danger fs-2 text-decoration-none'></Link> */}

        </div>

        <div className='row'>
          <div className="col-md-12 p-3">
            <div className='row justify-content-center '>
              <div className='col-12 '>
                <div className=' row align-items-end justify-content-end'>
                  <div className='col-lg-3'>

                    <div className="search-container mx-lg-3 my-2">
                      <input type="text" onChange={handleSearch} placeholder="Search with name "/>
                      <img src={searchImg} className='search-icon' width={16} height={16} alt=""/>

                    </div>


                  </div>
                  <div className={` text-end mx-lg-3 col-lg-2 my-2`}>
                    <Link className={` btn   btnCreateAdd d-flex w-lg-75 mx-auto`} type="button" onClick={()=>{
                      setTestModal('add');
                    }}>  <img src={imgAddbtn} className=' me-2' width={24} height={24} alt=""/> Store </Link>

                  </div>
                </div>
              </div>

            </div>
            <TableContainer className='TableContainer' component={Paper}>



              <Table className='Table'>
                <TableHead>
                  <TableRow >
                    <TableCell className='TableHeadCell fw-bold'>ID</TableCell>
                    <TableCell className='TableHeadCell fw-bold'>Store</TableCell>
                    <TableCell className='TableHeadCell fw-bold'>Address</TableCell>

                    <TableCell className='TableHeadCell fw-bold'>Edit</TableCell>
                    <TableCell className='TableHeadCell fw-bold'>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Store
                    .filter((item) =>
                      item.trans.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((item, index) => (
                      <TableRow className='TableRow' key={index}>
                        <TableCell className='TableCell'>{index + 1}</TableCell>
                        <TableCell className='TableCell'>{item.trans.name}</TableCell>
                        <TableCell className='TableCell'>{item.trans.address}</TableCell>

                        <TableCell className='TableCell '>
                          <div className="table-data-feature justify-content-between">

                            <Link type='button' className="item" onClick={()=>{
                              setItemId(item.org.id)
                               setTestModal('edit')
                            }}  >

                              <img src={imgEdit} width={16} height={16} alt=""/>

                            </Link>


                          </div>

                        </TableCell>
                        <TableCell className='TableCell '>
                          <div className="table-data-feature justify-content-between">
                            <form className='item'>
                              <Link className=' ' onClick={() => {
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

          </div>



          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{addOrEdit} Store</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form method="POST"  className="my-3 create_accont">
                <div className='row'>
                  <div className='col-lg-6'>
                    <label className="text-muted my-2">Store Name</label>
                    <input className=" form-control mb-3 input" type="text"
                      placeholder="Store Name"
                      required autoFocus value={name[0]}
                      onChange={(e) => {
                        // setName([e.target.value])
                        name[0] = e.target.value;
                        setName([...name]);
                      }} />

                  </div>
                  <div className='col-lg-6'>
                    <label className="text-muted my-2">Address</label>
                    <input className=" form-control mb-3 input" type="text"
                      placeholder="Address"
                      required autoFocus value={address[0]}
                      onChange={(e) => {
                        // setAddress([e.target.value])
                        address[0] = e.target.value;
                        setAddress([...address]);
                      }} />

                  </div>
                  {/* <div className='col-lg-4'>
              <label className="text-muted my-2">Description</label>
              <input className=" form-control mb-3 input" type="text"
                placeholder="Description"
                required autoFocus
                onChange={(e) => {
                  // setDescription([e.target.value])
                  description[0] = e.target.value ;
                  setDescription([...description]);
                }} />
            </div> */}

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
                          <div className='col-lg-6'>
                            <label className="text-muted my-2">Store Name</label>
                            <input className=" form-control mb-3 input" type="text"
                              placeholder="Store Name"
                              required autoFocus value={name[index+1]}
                              onChange={(e) => {
                                let fieldIndex = index + 1;
                                name[fieldIndex] = e.target.value;
                                setName([...name]);
                              }} />

                          </div>
                          <div className='col-lg-6'>
                            <label className="text-muted my-2">Address</label>
                            <input className=" form-control mb-3 input" type="text"
                              placeholder="Address"
                              required autoFocus value={address[index+1]}
                              onChange={(e) => {
                                let fieldIndex = index + 1;
                                address[fieldIndex] = e.target.value;
                                setAddress([...address]);
                              }} />

                          </div>

                        </div>
                      </div>

                    </>
                  )
                })

                }


              </form>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button className={`btnCreate`} onClick={() => {
                if (funModal === true) {
                  handleFormSubmit()
                } else {
                  handleFormEditSubmit()
                }

              }}>
                Save Changes
              </Button>
            </Modal.Footer>
            <button className={`close-my-modal`} onClick={handleClose} >
              <img src={closeImg} alt=" close Image" style={{ width:"40px" , height:"40px" }}   />
            </button>
          </Modal>

        </div>



      </div>

    </>

  )

}
