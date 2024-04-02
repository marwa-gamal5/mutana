import React, {useEffect, useState} from "react";
import searchImg from "../../../assets/search.webp";
import {Link} from "react-router-dom";
import imgAddbtn from "../../../assets/add-button.webp";
import axiosInstance from '../../../axiosConfig/instanse';
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
import {useSelector} from "react-redux";
import imgEdit from "../../../assets/product/edit.webp";
import imgDelete from "../../../assets/product/delete.webp";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import closeImg from "../../../assets/exit-icon.webp";


const NewStore = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const langList = useSelector(state => state.langList.langList);
    let token = localStorage.getItem("token");
    const currentLanguageCode = useSelector((state) => state.language.lang);
    const [Store, setStore] = useState([]);
    const [show, setShow] = useState(false);
    const [testModal, setTestModal] = useState('');

    const [languageList, setLanguageList] = useState([]);


    const handleClose = () => {
        setShow(false)
        setTestModal('')
        // setName([])
        // setAddress([])

    };
    const handleShow = () => setShow(true);


//////  view all stores ///////
    const viewAllStores = async ()=>{
        await axiosInstance.post(`store/view_all_stores`, {
            token: token,
            lang: currentLanguageCode,
            seller_id: 1
        }).then((res)=>{
            setStore(res.data.success)
        }).catch((err)=>{
            console.log(err)
        })

    }

    ////
    const addStore = async ()=>{
        await axiosInstance.post(`store/add_store`,{
            token: token,
            seller_id: 1
        }).then((res)=>{
            console.log("add res", res)
        }).catch((err)=>{
            console.log("add err", err)
        })
    }

    useEffect(() => {
        viewAllStores()

    }, []);
    useEffect(() => {
        setLanguageList(langList);

    }, [langList]);


    return (<>
            <div id='home_page' className='page-section-home'>
                <div className='d-flex justify-content-between'>
                    <h3 className="m-2">
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
                                            <input type="text"  placeholder="Search with name "/>
                                            <img src={searchImg} className='search-icon' width={16} height={16} alt=""/>

                                        </div>


                                    </div>
                                    <div className={` text-end mx-lg-3 col-lg-2 my-2`}>
                                        <Link className={` btn   btnCreateAdd d-flex w-lg-75 mx-auto`} type="button" onClick={()=>{
                                            setTestModal('add');
                                            handleShow()
                                        }}>  <img src={imgAddbtn} className=' me-2' width={24} height={24} alt=""/> Store </Link>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <TableContainer className='TableContainer' component={Paper}>

                            <Table className='Table'>

                                {/* TableHead */}
                                <TableHead>
                                    <TableRow >
                                        <TableCell className='TableHeadCell fw-bold'>ID</TableCell>
                                        <TableCell className='TableHeadCell fw-bold'>Store</TableCell>
                                        <TableCell className='TableHeadCell fw-bold'>Address</TableCell>

                                        <TableCell className='TableHeadCell fw-bold'>Edit</TableCell>
                                        <TableCell className='TableHeadCell fw-bold'>Delete</TableCell>
                                    </TableRow>
                                </TableHead>

                                {/* TableBody */}
                                <TableBody>
                                    {Store.filter((item)=>
                                        item.trans.name.toLowerCase().includes(searchTerm.toLowerCase())

                                    ).map((item, index)=>(
                                        <TableRow className='TableRow' key={index}>
                                            <TableCell className='TableCell'>{index +1}</TableCell>
                                            <TableCell className='TableCell'>{item.trans.name}</TableCell>
                                            <TableCell className='TableCell'>{item.trans.address}</TableCell>

                                            <TableCell className='TableCell '>
                                                <div className="table-data-feature justify-content-between">

                                                    <Link type='button' className="item" onClick={()=>{
                                                        // setItemId(item.org.id)
                                                        // setTestModal('edit')
                                                    }}  >

                                                        <img src={imgEdit} width={16} height={16} alt=""/>

                                                    </Link>


                                                </div>

                                            </TableCell>
                                            <TableCell className='TableCell '>
                                                <div className="table-data-feature justify-content-between">
                                                    <form className='item'>
                                                        <Link className=' ' onClick={() => {
                                                            // let id = item.org.id;
                                                            // DeleteAlert(id);
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
                            <Modal.Title>Add Store</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form method="POST"  className="my-3 create_accont">
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <label className="text-muted my-2">Store Name</label>
                                        <input className=" form-control mb-3 input" type="text"
                                               placeholder="Store Name"
                                               required autoFocus
                                               onChange={() => {
                                               }} />

                                    </div>
                                    <div className='col-lg-6'>
                                        <label className="text-muted my-2">Address</label>
                                        <input className=" form-control mb-3 input" type="text"
                                               placeholder="Address"
                                               required autoFocus
                                               onChange={() => {
                                               }} />
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
                                                    <div className='col-lg-6'>
                                                        <label className="text-muted my-2">Store Name</label>
                                                        <input className=" form-control mb-3 input" type="text"
                                                               placeholder="Store Name"
                                                               required autoFocus
                                                               onChange={() => {

                                                               }} />

                                                    </div>
                                                    <div className='col-lg-6'>
                                                        <label className="text-muted my-2">Address</label>
                                                        <input className=" form-control mb-3 input" type="text"
                                                               placeholder="Address"
                                                               required autoFocus
                                                               onChange={() => {

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
                                addStore()


                            }}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                        <button className={`close-my-modal`} onClick={handleClose} >
                            {/*<img src={closeImg} alt=" close Image" style={{ width:"40px" , height:"40px" }}   />*/}
                        </button>
                    </Modal>
                        </div>
                <h1>Fatma</h1>


            </div>

        </>

    );
};

export default NewStore;