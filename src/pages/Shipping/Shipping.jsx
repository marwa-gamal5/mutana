import React, { useState, useEffect } from 'react'

import Swal from "sweetalert2";
import axiosInstance from '../../axiosConfig/instanse';
import cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/AdminSidebar/AdminSidebar';
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
import '../../index.css'
import imgEdit from '../../assets/product/edit.webp'
import imgView from '../../assets/product/veiw.webp'
import imgDelete from '../../assets/product/delete.webp'
import imgAdd from '../../assets/product/add.webp'
import imgAddbtn from '../../assets/add-button.webp'
import closeImg from '../../assets/exit-icon.webp'
import style from './Shipping.module.css'

import Select from 'react-select'

import { useRef} from "react";

export default function Shipping() {

    const [Shipping, setShipping] = useState([]);
    const [itemId, setItemId] = useState();
    const [name, setName] = useState([]);
    const [address, setAddress] = useState([]);
    const [languageList, setLanguageList] = useState([]);
    const [stateError, setStateError] = useState(false);
    const [addOrEdit, setAddOrEdit] = useState('')
    const [testModal, setTestModal] = useState('');
    const [funModal, setFunModal] = useState();
    const langList = useSelector(state => state.langList.langList);

    console.log("langList",langList);

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
        await axiosInstance.post(`user/view_shipping_statuses`, {
            token: token,
            lang: currentLanguageCode,


        }).then(res => {
            console.log("all shipping", res);
            setShipping(res.data.success.org_with_trans);
        }).catch(err => {
            console.log(err);
        });
    }


    const objRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const fetchOneItem = async (id) => {

        await axiosInstance.post(`user/view_one_shipping_statuses_trans`, {
            idd: statusId,
            token: token,
            url:endpoint,
            lang:langStatus

        }).then(res => {

            console.log("view one trans", res);
    let langg = langStatus;
            name[0] = res.data.success.name;

            setLangOptionDefault({ value: res.data.success.lang_code, label:res.data.success.lang_name})

            objRef.current = { value: res.data.success.lang_code, label: res.data.success.lang_name };


            setLangStatus(res.data.success.lang_code)
            setIsLoaded(true);



        }).catch(err => {
            console.log(err);
        });
    };
    useEffect(() => {
        getStore();
    }, [currentLanguageCode])









    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };








  const la =[];
    const [langOption, setLangOption] = useState([]);
    useEffect(() => {
        setLanguageList(langList);

        langList.map((lang, index) => {
            la.push({value: lang.code, label: lang.name})

        })
           setLangOption(la);
    }, [langList]);

    const handleFormEditSubmit = () => {
        let { data } = axiosInstance.post(`user/add_shipping_statuses_trans`, {
            token: token,
            url: endpoint,
            lang: langStatus,
            idd:statusId,
            status:name[0]

        }).then(res => {

            if (res.data.success) {

                showAlert(res.data.success, "success");

            } else {
                console.log("res one from else :", res.data.error);
                showAlert(res.data.error, "error");
            }

        }).catch(err => {
            console.log("err one", err);
        })
    };


    const [endpoint, setEndpoint] = useState('')

    useEffect(() => {
        const endpoint = window.location.pathname.split('/')[1];
        setEndpoint(endpoint);


        if(objRef.current != null){
            console.log("selectclass", document.getElementsByClassName(" css-1dimb5e-singleValue")[0]);
            document.getElementsByClassName(" css-1dimb5e-singleValue")[0].innerHTML = objRef.current.label;
        }


    }, [objRef.current]);

    const [langStatus, setLangStatus] = useState('')
    const [langOptionDefualt, setLangOptionDefault] = useState('')
    const [statusId, setStatusId] = useState('')
    const handleFormSubmit = (e) => {
     console.log("iddddd", statusId)
        let { data } = axiosInstance.post(`user/add_shipping_statuses_trans`, {
            token: token,
            url: endpoint,
            lang: langStatus,
            idd:statusId,
            status:name[0]

        }).then(res => {

            if (res.data.success) {

                    showAlert(res.data.success, "success");

            } else {
                console.log("res one from else :", res.data.error);
                showAlert(res.data.error, "error");
            }

        }).catch(err => {
            console.log("err one", err);
        })
    };




    useEffect(() => {




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

                        Shipping
                    </h3>
                    <div className="search-container mx-lg-3 my-2">
                        <input type="text" onChange={handleSearch} placeholder="Search with name "/>
                        <i className="fa fa-search"></i>

                    </div>



                </div>

                <div className='row'>
                    <div className="col-md-12 p-3">
                        <div className='row justify-content-center '>
                            <div className='col-12 '>
                                <div className=' row align-items-end justify-content-end'>
                                    <div className='col-lg-3'>



                                    </div>

                                </div>
                            </div>

                            <div className={`${style.main} p-0`}>
                                {Shipping.map((item, index) => {
                                    return(
                                        <div key={index} className={`mt-5 `}>

                                            <div className={`${style.transShipping} px-lg-5 px-3 py-2 d-flex justify-content-between align-items-center`}>
                                                <div>
                                                    <h3>{item.name}</h3>
                                                </div>
                                                <div>
                                                    <div className={` text-lg-end mx-lg-3 my-2`}>
                                                        <Link className={` btn   btnCreateAdd  mx-auto`} type="button" onClick={()=>{
                                                            setStatusId(item.id);
                                                            setTestModal('add');
                                                        }}>  <img src={imgAddbtn} className=' me-2' width={24} height={24} alt=""/> Add</Link>

                                                    </div>
                                                </div>

                                            </div>
                                            <div>
                                                {item.translation.map((lang, index) => {
                                                    let langDir = "ltr";
                                                    if (lang.lang == 'العربية') {
                                                        langDir = "rtl";
                                                    } else {
                                                        langDir = "ltr";
                                                    }
                                                    return (
                                                        <>
                                                            <div key={index} dir={langDir} className={`px-lg-5 px-3 py-2`}>
                                                               <div className={`d-flex align-items-center`}>
                                                                 <div className={`mx-2`}>
                                                                     <h5>{lang.lang}</h5>
                                                                     <p className={`${style.par}`}>{lang.name}</p>
                                                                 </div>
                                                                   <div className={`${style.img} mx-2 d-flex justify-content-center align-items-center`}>
                                                                       <img src={imgEdit} alt={''} type={"button"} width={16} height={16} onClick={()=>{
                                                                           console.log("from /clickkkkkkk", item.id)
                                                                           setStatusId(item.id);
                                                                           setLangStatus(lang.lang);
                                                                           setTestModal('edit');

                                                                       }} />
                                                                   </div>
                                                               </div>

                                                            </div>

                                                        </>
                                                    )
                                                })

                                                }
                                            </div>
                                        </div>

                                    )
                                })}

                            </div>

                        </div>


                    </div>



                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header >
                            <Modal.Title>{addOrEdit} Shipping status Translation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {testModal === 'add' ? (
                                    <form method="POST"  className="my-3 create_accont">
                                        <div className='row'>
                                            <div className='col-lg-6'>
                                                <label className="text-muted my-2">Select Language</label>
                                                {langOption.length !== 0 ?(
                                                    <Select options={langOption}
                                                            defaultValue={{
                                                                value: `${langOption[0].value}`,
                                                                label: `${langOption[0].label}`
                                                            }}
                                                            onChange={(e) => {
                                                                setLangStatus(e.value);




                                                            }} />
                                                ):(
                                                    <Select options={langOption}

                                                            onChange={(e) => {




                                                            }} />
                                                )}
                                            </div>
                                            <div className='col-lg-6'>
                                                <label className="text-muted my-2">Name</label>
                                                <input className=" form-control mb-3 input" type="text"
                                                       placeholder="Name"
                                                       required autoFocus value={name[0]}
                                                       onChange={(e) => {
                                                           // setAddress([e.target.value])
                                                           name[0] = e.target.value;
                                                           setName([...name]);
                                                       }} />

                                            </div>


                                        </div>






                                    </form>):(
                                <form method="POST"  className="my-3 create_accont">
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <label className="text-muted my-2">Select Language</label>


                                                {isLoaded === true ?(
                                                    <Select
                                                        options={langOption}
                                                        defaultValue={objRef.current}
                                                        onChange={(e) => {
                                                            // Handle the selected option
                                                            setLangStatus(e.value);
                                                        }}
                                                    />
                                                ):(<div></div>)}


                                        </div>
                                        <div className='col-lg-6'>
                                            <label className="text-muted my-2">Name</label>
                                            <input className=" form-control mb-3 input" type="text"
                                                   placeholder="Name"
                                                   required autoFocus value={name[0]}
                                                   onChange={(e) => {
                                                       // setAddress([e.target.value])
                                                       name[0] = e.target.value;
                                                       setName([...name]);
                                                   }} />

                                        </div>


                                    </div>






                                </form>
                            )}

                        </Modal.Body>
                        <button className={`close-my-modal`} onClick={handleClose} >
                            <img src={closeImg} alt=" close Image" style={{ width:"40px" , height:"40px" }}   />
                        </button>
                        <Modal.Footer>

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
                    </Modal>

                </div>



            </div>

        </>

    )

}
