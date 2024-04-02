
import * as React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/AdminSidebar/AdminSidebar';
import style from './Permission.module.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CreateUrl from '../CreateUrl/CreateUrl';
import EditUrl from '../EditUrl/EditUrl';
import Swal from "sweetalert2";
import "../../../index.css";
import { useSelector } from "react-redux";

import axiosInstance from '../../../axiosConfig/instanse';

import imgEdit from '../../../assets/product/edit.webp'
import imgView from '../../../assets/product/veiw.webp'
import imgDelete from '../../../assets/product/delete.webp'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useDispatch } from 'react-redux';
import  changeEndpoint  from '../../../store/Actions/endpoint';
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
import DeleteIcon from '@mui/material/Icon';
import imgAddbtn from "../../../assets/add-button.webp";
import imgAdd from '../../../assets/product/add.webp'
import searchImg from '../../../assets/search.webp'

function Permission() {
    const dispatch = useDispatch();
    const [Permission, setPermission] = useState([]);
    // const [subCategorie, setSubPermission] = useState([]);
    const [UrlId, setUrlId] = useState();
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [urlType, seturlType] = useState('private');
    const [urlName, seturlName] = useState('');
    const [testModal, setTestModal] = useState('');
    const [funModal, setFunModal] = useState();
    const [oneUrl, setOneUrl] = useState([]);

    const [Createbtn, setCreatebtn] = useState(true)
    const [Editbtn, setEditbtn] = useState(true)
    const [Deletebtn, setDeletebtn] = useState(true)
    const [Showbtn, setShowbtn] = useState(true)
    const [endpoint, setEndpoint] = useState('')
    const [addOrEdit, setAddOrEdit] = useState('')

    let token = localStorage.getItem('token');
    const valueurl = useSelector((state) => state.valueurl);
   
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setTestModal('')
    seturlName('')
    seturlType('')
  };
  const handleShow = () => setShow(true);
    function afterDelete(message, icon) {
        Swal.fire({
            title: message,
            icon: icon,
            showConfirmButton: false,
            timer: 1500
        });
    }


    function DeleteAlert(id) {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(id);
            }
        })
    }
   

    function showAlert(message, icon) {
        Swal.fire({
            title: message,
            icon: icon,
            showConfirmButton: false,
            timer: 2000
        });
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = (id) => {
        const filteredData = data.filter((item) => item.id !== id);
        setData(filteredData);
    };
   
    const fetchUrls = async (endPoint) => {

        await axiosInstance.post(`/user/get_all_urls`, {
            token: token,
            url:endPoint
        })
            .then(response => {



                setPermission(response.data.urls)
            })
            .catch(error => {
                console.log(error);
            });
    };


    async function deleteData(id) {
        let message;
        let icon;


        try {

            const response = await axiosInstance.post(`/user/delete_urll`, {
                token:token,
                url:endpoint,
                url_id: id
            });


            if ('success' in response.data) {
                let message = response.data.success;
                afterDelete(message, 'success');
            } else if ('error' in response.data) {
                let error = response.data.error;
                afterDelete(error, 'error');
            }

            let index = Permission.findIndex(ele => ele.id === id);
            setPermission(Permission.splice(index, 1));
            fetchUrls();

        } catch (error) {
            console.log(error)
            message = error.message;
            icon = "error";
            afterDelete(message, icon);
        }



    }



    const fetchOneurl = async (id) => {

        await axiosInstance.post(`/user/get_one_url`, {
           
            token: token,
            url:endpoint,
            id: id
        },{
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"


            }
        })
            .then(response => {



                setOneUrl(response.data.urls[0] )
                seturlName(response.data.urls[0][1])
                seturlType(response.data.urls[0][2])
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleFormEditSubmit = async () => {
        
console.log("Submit edit", urlName, urlType)
        await axiosInstance.post(`/user/update_urll`, {
            id:UrlId,
            token: token,
            url: endpoint,
            url_name: urlName,
            url_type: urlType

        })
            .then(response => {

                if (response.data.success) {

                    showAlert(response.data.success, 'success')

                    fetchUrls()
                    handleClose()
                }else{
                    showAlert(response.data.error, 'error')
                }


            })
            .catch(error => {
                console.log(error);
                showAlert(error.message, 'error')
            });
    };
    const handleFormSubmit = async () => {
      
console.log("Submit", urlName, urlType)
        await axiosInstance.post(`/user/create_urll`, {
            token: token,
            url: endpoint ,
            url_name: urlName,
            url_type: urlType

        })
            .then(response => {

                if (response.data.success) {

                    showAlert(response.data.success, 'success')
                    fetchUrls()
                    handleClose()

                }else{
                    showAlert(response.data.error, 'error')
                }


            })
            .catch(error => {
                console.log(error);
                showAlert(error.message, 'error')
            });
    };

    const handleTypeChange = (event) => {
        seturlType(event.target.value);
      }
    const tableRef = useRef(null);





    const testUrl = async (endPoint)=>{
        await axiosInstance.post(`/user/get_my_urls`, {
           
            token: token,
            url:endPoint
        })
            .then(response => {

                if(response.data.success) {
                    setCreatebtn(response.data.success.C);
                    setDeletebtn(response.data.success.D);
                    setShowbtn(response.data.success.R);
                    setEditbtn(response.data.success.U)
                  
                }
                fetchUrls(endPoint)



            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {

        const endpoint = window.location.pathname.split('/')[1];
        setEndpoint(endpoint);
        testUrl(endpoint);
       dispatch(changeEndpoint(endpoint));


        if(testModal === 'add'){
            setOneUrl({})
            handleShow()
            setFunModal(true)
            setAddOrEdit('Add')
        }else if(testModal === 'edit'){
            fetchOneurl(UrlId)
            handleShow();
            setFunModal(false)
            setAddOrEdit('Edit')
        }
    }, [testModal,UrlId]);

// pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


    // Assuming you have the 'Products' array defined

    const filteredItems = Permission.filter((item) =>
        item[1].toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    console.log("currentItems", currentItems);

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
            
            <Sidebar />
            <section id='home_page' className='page-section-home py-2 min-vh-100'>
                <div className=' px-3'>
                    <div className='page_content'>
                        <div className=" ">
                            <div className="row justify-content-center mx-2">
                                <div className="col-lg-12 row my-4">
                                    <div className='col-6 p-0'>
                                        <h2 >Permission</h2>
                                    </div>
                                   
                                    <br />
                                    <br />
                                </div>
                            </div>

                            <div id="create_Url" className='d-none'>
                                <CreateUrl fetchdata={fetchUrls}
                                 />
                            </div>



                            <div id="edit_Url" className='d-none'>
                                <EditUrl id={UrlId} fetchData={fetchUrls}/>
                            </div>


                        </div>
                        <div className="container-fluid">
                            <div className="row">

                                    <div className='col-12 mb-4'>
                                        <div className=' row align-items-end justify-content-end'>
                                            <div className='col-lg-3 my-2'>

                                                <div className="search-container mx-lg-3">
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
                                                <Link className={` btn   btnCreateAdd d-flex w-lg-75 mx-auto `}
                                                      type="button" onClick={(e) => {
                                                    e.preventDefault();
                                                    setTestModal('add');
                                                }}><img src={imgAddbtn} className=' me-2' width={24} height={24}
                                                        alt=""/>Add Url </Link>
                                            </div>
                                        </div>
                                    </div>

                            <TableContainer className='TableContainer' component={Paper}>

                                       
                                <div className='row'>


                                   </div>
                                            <Table className='Table mt-3'>
                                                <TableHead>
                                                    <TableRow >
                                                        <TableCell className='TableHeadCell fw-bold'>ID</TableCell>
                                                        <TableCell className='TableHeadCell fw-bold'>URL Name</TableCell>
                                                        <TableCell className='TableHeadCell fw-bold'>URL Type</TableCell>
                                                        <TableCell className='TableHeadCell fw-bold'>Actions</TableCell>
                                                        
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {currentItems.map((Url, index) => (
                                                        <TableRow className='TableRow' key={index}>
                                                            <TableCell className='TableCell'>{index + 1}</TableCell>
                                                            <TableCell className='TableCell'>{Url[1]}</TableCell>
                                                            <TableCell className='TableCell'>{Url[2]}</TableCell>
                                                            <TableCell className='TableCell '>
                                                                <div className="table-data-feature justify-content-between">

                                                                    <Link className="item" type='button' onClick={()=>{
                                                                        setUrlId(Url[0]);
                                                                        setTestModal('edit')

                                                                    }}>

                                                                        <img src={imgEdit} width={16} height={16} alt=""/>
                                                                    </Link>

                                                                    <form id="">
                                                                        <Link type='button' className="item"
                                                                              onClick={() => {
                                                                                  let id = Url[0];
                                                                                  DeleteAlert(id)
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
                                

                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>{addOrEdit} URL</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>

                                        <form className={`${style.create_accont}`} >

                            <div className="row">


                                <div class="col-xs-6 col-sm-6 col-md-6 mb-3">
                                    <div class="form-group">
                                        <strong className='d-block pb-1'> Name :</strong>
                                        <input type="text" name="url_Name" class="form-control" placeholder="Url Name" value={urlName}
                                            onChange={(e) => { seturlName(e.target.value) }}

                                        />
                                    </div>
                                    <p id="url_name" className=' d-none text-danger mt-2'></p>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 mb-3">
                                    <div class="form-group ">
                                        <strong className='d-block pb-1'>Type:</strong>
                                        <select name="type" id="type" className='form-control' placeholder='Select Type' onChange={handleTypeChange} value={urlType}>
                                            <option value="private">Private</option>
                                            <option value="public">Public</option>
                                        </select>
                                        {/* <select name="type" id="type" className='form-control'  placeholder='Select Type'  onChange={(e) => { seturlType(e.target.value) }} value={oneUrl[2]} >
                                            <option value="private">Private</option>
                                            <option value="public">Public</option>
                                          
                                        </select> */}
                                        {/* <input type="text" name="url_type" class="form-control" placeholder="Url Type"
                                            onChange={(e) => { seturlType(e.target.value) }} /> */}
                                    </div>
                                </div>




                             
                            </div>
                        </form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button className={`${style.btnCreate}`} onClick={()=>{
                                           if(funModal === true){
                                            handleFormSubmit()
                                           }else{
                                            handleFormEditSubmit()
                                           }
                                            
                                        }}>
                                            Save Changes
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>

                            </div>

                            
                        </div>
                    </div>
                </div>
            </section>
          
        </>
    )
}

export default Permission;





