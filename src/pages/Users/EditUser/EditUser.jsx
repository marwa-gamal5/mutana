import * as React from 'react';
import { useState, useEffect } from 'react';
import style from './EditUser.module.css';

import Swal from "sweetalert2";
import axiosInstance from '../../../axiosConfig/instanse';

import { useSelector } from 'react-redux';
import Sidebar from '../../../components/AdminSidebar/AdminSidebar';
import AddUser from '../AddUser/AddUser'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

import { FaRegEdit } from "react-icons/fa";

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
import Select from 'react-select'
// import userEvent from '@testing-library /user-event';
import imgAddbtn from '../../../assets/add-button.webp'
import { RiDeleteBinFill } from "react-icons/ri";
export default function EditUser(props) {
  console.log(props)
    const [userInfo, setuserInfo] = useState();
    const [userName, setuserName] = useState('');
    const [accountStatus, setaccountStatus] = useState();
    const [userImg, setUserImg] = useState('');
    const [stop, setstop] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [endpoint, setEndpoint] = useState('')
    const [urlId, setUrlId] = useState();
    const [urlName, setUrlName] = useState();
    
    const [urls, setUrls] = useState([]);
    const [userUrls, setUserUrls] = useState([]);
    const [permms, setPermms] = useState([]);
    const [show, setShow] = useState(false);
    const [funModal, setFunModal] = useState();
    const [addOrEdit, setAddOrEdit] = useState('');
    const [cc, setCC] = useState();
    const [dd, setDD] = useState();
    const [uu, setUU] = useState();
    const [rr, setRR] = useState();
    const handleClose = () => {
        setShow(false)
        setTestModal('')
    
      };
    const handleShow = () => setShow(true);
  
    const navigate = useNavigate()
    const [testModal, setTestModal] = useState('');
    function showAlert(message, icon) {
        Swal.fire({
            title: message,
            icon: icon,
            showConfirmButton: false,
            timer: 2000
        });
    }

    const userinfo = useSelector((state) => {
        console.log("state: " , state.usersetting.usersetting)
        return state.usersetting.usersetting});

    console.log("userinfooo", userinfo);
    function close(e) {
        e.preventDefault();
        let EditUser = document.getElementById("Edit_User");
        EditUser.classList.add("d-none");
    }

    let token = localStorage.getItem("token");
    const getOne = async (endPoint,id) => {
        await axiosInstance.post(`/user/get_user_urls`, {
            id: id,
            token: token,
            url:endPoint
           
        })
            .then(response => {

                console.log("response oneeeeeee", response)

                setUserUrls(response.data.urls)
              
            })
            .catch(error => {
                console.log(error);
            });
    }
    


    const handleAddUserPerms = async() => {
        // event.preventDefault();
        console.log(userinfo.id, token,endpoint,urlId,permms)
        await axiosInstance.post(`/user/add_user_perms`, {
            id:userinfo.id,
            token: token,
            url: endpoint,
            list: [urlId,permms, urlName]

        })
            .then(response => {
                console.log("response add user urls", response)
                if (response.data.success) {

                    showAlert(response.data.success, 'success')
                    // props.fetchData()
                    // fetchUrlss(endpoint)
                    handleClose()
                }else{
                    showAlert(response.data.error, 'error')
                }

                //  setUser(response.data.user_list)
            })
            .catch(error => {
                console.log(error);
                showAlert(error.message, 'error')
            });


    };



 
    const handleFormEditSubmit = async () => {
        // event.preventDefault();
        console.log(userinfo.id, token,endpoint,urlId,permms)
        await axiosInstance.post(`/user/set_user_perms`, {
            id:userinfo.id,
            token: token,
            url: endpoint,
            list: [urlId,permms, urlName]

        })
            .then(response => {
                console.log("response edit user urls", response)
                if (response.data.success) {

                    showAlert(response.data.success, 'success')
                   
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
    function close(e) {
        e.preventDefault();
        let addUser = document.getElementById("edit_User");
        addUser.classList.add("d-none");
    }

     let urlsss =[];
    const fetchUrlss = async (url) => {
        console.log("fetch urlssssssssss")
    await axiosInstance.post(`/user/get_all_urls`, {
        token: token,
        url:url
    })
        .then(response => {

            console.log("response urlssssssss", response)
            response.data.urls.map((ele, index) => {
                urlsss.push({ value: ele[0], label: ele[1] });
              })
            setUrls(urlsss)
        })
        .catch(error => {
            console.log(error);
        });
};

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

async function deleteData(id) {
    let message;
    let icon;
       console.log('id',id)

    try {

        const response = await axiosInstance.post(`/user/del_user_perms`, {
            token:token,
            id:userinfo.id,
            url:endpoint,
            url_id: id
        });

          console.log("res in delete",response)
        if ('success' in response.data) {
            let message = response.data.success;
            showAlert(message, 'success');
            let index = userUrls.findIndex(ele => ele.url_id === id);
        setUserUrls(userUrls.splice(index, 1));
        getOne(endpoint, userinfo.id)
        } else if ('error' in response.data) {
            let error = response.data.error;
            showAlert(error, 'error');
        }

        

    } catch (error) {
        console.log(error)
        message = error.message;
        icon = "error";
        showAlert(message, icon);
    }



}
//   console.log("userId is", userid);
    useEffect(() => {
        const endpoint = window.location.pathname.split('/')[1];
        setEndpoint(endpoint);  


        if (userinfo.id) {
            console.log("from useeffect")
                setuserName(userinfo.username)
            getOne(endpoint, userinfo.id);
            fetchUrlss(endpoint)

        }else{
            navigate('/users')
        }
      

        if(testModal === 'add'){
            // setOneUrl({})
            setPermms([])
            handleShow()
            setFunModal(true)
            setAddOrEdit('Add')
            setCC(false)
            setDD(false)
            setRR(false)
            setUU(false)
        }else if(testModal === 'edit'){
            // fetchOneurl(UrlId)
            handleShow();
            setFunModal(false)
            setAddOrEdit('Edit')
        }

    }, [userinfo,stop,testModal]);

    console.log("account status is", accountStatus);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = (id) => {
        // const filteredData = data.filter((item) => item.id !== id);
        // setData(filteredData);
    };

    let perms=[]

    console.log("permissions", cc,dd,uu,rr);
    console.log("perms", permms);

    return (
        <>
            <Sidebar />
            <section id='home_page' className='page-section-home py-2 min-vh-100'>
                <div className=' px-3 mb-5' >
                    <div className='page_content'>
                        <div className="">




                        </div>
                        <div className="container-fluid">
                            <div className="row p-3" style={{ backgroundColor: '#eee' }}>

                                    
                                <div className="col-md-12">
                                <h3>User Name : {userName}</h3>
                                <div id="add_user" className='d-none'>

                            </div>
                                 <section >
                                        <div className=' '>
                                            <div className='row'>
                                           

                                            <TableContainer className='TableContainer pt-5 ' component={Paper}>


                                        <div className='row justify-content-center '>
                                            <div className='col-12 row'>
                                            <div className='col-lg-7 d-flex align-items-end justify-content-end'>
                                 
                                 <div class="search-container">
                                 <input  type="text" onChange={handleSearch} placeholder="Search with name "  />
                                
                                 {/* <img src={searchImg} alt="" width={20} height={20}/> */}
                                 </div>
                                 
                               
                                 </div>
                                 <div className={` text-end col-lg-5 d-flex align-items-end justify-content-start`}>
                                     <Link className={` btn   btnCreateAdd `} type="button" onClick={() => {
                                         setTestModal('add');
                                      
                                     }}>  <img src={imgAddbtn} className=' me-2' width={24} height={24} alt=""/> Url</Link>
                                 </div>
                                           
                                            </div>
                                           
                                        </div>
                                      
                                         <Table className='Table'>
                                                <TableHead>
                                                    <TableRow >
                                                        <TableCell className='TableHeadCell fw-bold'>ID</TableCell>
                                                        <TableCell className='TableHeadCell fw-bold'>Url Name</TableCell>
                                                        
                                                        <TableCell className='TableHeadCell fw-bold'>Actions</TableCell>
                                                        <TableCell className='TableHeadCell fw-bold'>Edit Url</TableCell>
                                                        <TableCell className='TableHeadCell fw-bold'>Edlete Url</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {userUrls.filter((item) =>
                                                            item.url.toLowerCase().includes(searchTerm.toLowerCase())
                                                        )
                                                        .map((item, index) => (
                                                            <TableRow className='TableRow' key={index}>
                                                                <TableCell className='TableCell'>{index + 1}</TableCell>
                                                                <TableCell className='TableCell'>{item.url}</TableCell>
                                                                <TableCell className='TableCell'>
                                                                <div className='d-flex justify-content-between'>
                                                                    <div>
                                                                        <input className='me-2' type="checkbox"disabled checked={item.C} id="CC" name="CC" value="CC"  onChange={(e)=>{
                                                                            console.log("CC")
                                                                          
                                                                        setPermms([...permms,e.target.value])
                                                                            console.log("perms", perms)
                                                                        }}/>
                                                                        <label htmlFor="CC"> Create</label>
                                                                   
                                                                   </div>
                                                                   <div>
                                                                    <input className='me-2' checked={item.R}disabled type="checkbox" id="RR" name="RR" value="RR"
                                                                    onChange={(e)=>{
                                                                    setPermms([...permms,e.target.value])
                                                                    }}/>
                                                                    <label htmlFor="RR"> Read</label>
                                                                   </div>
                                                                   <div>
                                                                   <input className='me-2' checked={item.U} disabled type="checkbox" id="UU" name="UU" value="UU"onChange={(e)=>{
                                                                    setPermms([...permms,e.target.value])
                                                                    }}/>
                                                                    <label htmlFor="UU"> Update</label>
                                                                    </div>
                                                                    <div>
                                                                    <input className='me-2' checked={item.D} disabled type="checkbox" id="DD" name="DD" value="DD"onChange={(e)=>{
                                                                        setPermms([...permms,e.target.value])
                                                                    }}/>
                                                                    <label htmlFor="DD"> Delete</label>
                                                                    </div>
                                                                
                                                                </div>

                                                                </TableCell>
                                                                <TableCell className='TableCell '>
                                                                <div className="table-data-feature justify-content-between">
                                                                      
                                                                       

                                                                        <form>
                                                                            <Link type='button' className='item'
                                                                                onClick={() => {
                                                                                    // DeleteAlert(User.userp)
                                                                                 setPermms([])
                                                                                    console.log("clicke edit")
                                                                                    setUrlName(item.url)
                                                                                    setUrlId(item.url_id)
                                                                                    setTestModal('edit')
                                                                                    let editperm = [];
                                                                                    setCC(item.C)
                                                                                    setUU(item.U)
                                                                                    setRR(item.R)
                                                                                    setDD(item.D)
                                                                                    if(item.C === true){
                                                                                        editperm.push('CC')
                                                                                    }
                                                                                    if(item.D === true){
                                                                                        editperm.push('DD')

                                                                                    }
                                                                                    if(item.R === true){
                                                                                        editperm.push('RR')
                                                                                    }

                                                                                    if(item.U === true){
                                                                                        editperm.push('UU')
                                                                                    }

                                                                                    console.log("edit permiis",editperm)
                                                                                    setPermms([...editperm])
                                                                                }}>
                                                                             
                                                                                <i className='fas fa-trash icon-color'><FaRegEdit /></i>
                                                                                
                                                                              
                                                                            </Link>
                                                                        </form>
                                                                    </div>
                                                                 
                                                                </TableCell>
                                                                <TableCell className='TableCell '>
                                                                <div className='table-data-feature justify-content-between'>
                                                                <form id="">
                                                                            <Link type='button' className="item"
                                                                                onClick={() => {
                                                                                    let id = item.url_id;
                                                                                    DeleteAlert(id)
                                                                                }}>
                                                                                 <i className='fas fa-trash icon-color'><RiDeleteBinFill /></i>
                                                                             
                                                                            </Link>
                                                                        </form>
                                                                </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                </TableBody>
                                            </Table>
                                    </TableContainer>


                                    

                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>{addOrEdit} url to user</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                        <form className={`${style.create_accont}`} >

                                            <div className="row">
                                               

                                                <div className="col-12 mb-3">
                                                    <div className="form-group">
                                                        {testModal === 'add' ? <><strong className='d-block mb-2'>Select Urls:</strong>
                                                        <Select options={urls} onChange={(e)=>{
                                                            console.log("selected urllllllllllllll", e)
                                                            setUrlId(e.value)
                                                            setUrlName(e.label)
                                                           
                                                        }} /></> : <>
                                                        <strong className='d-block mb-2'> Url Name:</strong>
                                                         <input type="text"
                                                            onChange={(e) => {
                                                               
                                                            }}
                                                            className="form-control" placeholder="Url Name" value={urlName} />
                                                        
                                                        </>}
                                                       

                                                    </div>
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <div className="form-group">
                                                        <strong className='d-block mb-2'>User Permission:</strong>
                                                        <div >
                                                            <input className='me-2' type="checkbox" checked={cc} id="CC" name="CC" value="CC"  onChange={(e)=>{
                                                                console.log("CC")
                                                                let index = permms.indexOf(e.target.value);
                                                                console.log("imdex of permss", index);
                                                                if(index == -1){
                                                                    setPermms([...permms,e.target.value])
                                                                }else{
                                                                    permms.splice(index, 1)
                                                                    setPermms([...permms]);
                                                                }
                                                           
                                                             if(cc == true){
                                                                setCC(false)
                                                             }else{
                                                                setCC(true)
                                                             }
                                                                console.log("perms", perms)
                                                            }}/>
                                                            <label for="CC"> Create</label><br/>
                                                            <input className='me-2' type="checkbox" checked={rr} id="RR" name="RR" value="RR"
                                                            onChange={(e)=>{
                                                                let index = permms.indexOf(e.target.value);
                                                                console.log("imdex of permss", index);
                                                                if(index == -1){
                                                                    setPermms([...permms,e.target.value])
                                                                }else{
                                                                    permms.splice(index, 1)
                                                                    setPermms([...permms]);
                                                                }
                                                            if(rr == true){
                                                                setRR(false)
                                                             }else{
                                                                setRR(true)
                                                             }
                                                            }}/>
                                                            <label for="RR"> Read</label><br/>
                                                            <input className='me-2'  type="checkbox" checked={uu} id="UU" name="UU" value="UU"onChange={(e)=>{
                                                           let index = permms.indexOf(e.target.value);
                                                           console.log("imdex of permss", index);
                                                           if(index == -1){
                                                               setPermms([...permms,e.target.value])
                                                           }else{
                                                               permms.splice(index, 1)
                                                               setPermms([...permms]);
                                                           }
                                                            if(uu == true){
                                                                setUU(false)
                                                             }else{
                                                                setUU(true)
                                                             }
                                                            }}/>
                                                            <label for="UU"> Update</label><br/>
                                                            <input className='me-2' type="checkbox" checked={dd} id="DD" name="DD" value="DD"onChange={(e)=>{
                                                                let index = permms.indexOf(e.target.value);
                                                                console.log("imdex of permss", index);
                                                                if(index == -1){
                                                                    setPermms([...permms,e.target.value])
                                                                }else{
                                                                    permms.splice(index, 1)
                                                                    setPermms([...permms]);
                                                                }
                                                                if(dd == true){
                                                                    setDD(false)
                                                                 }else{
                                                                    setDD(true)
                                                                 }
                                                            }}/>
                                                            <label htmlFor="DD"> Delete</label><br/><br/>
                                                        
                                                        </div>

                                                    </div>
                                                </div>
                                               
                                            </div>
                                        </form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={(e)=>{
                                            e.preventDefault()
                                            if(funModal === true){
                                                handleAddUserPerms()
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



                                    </section>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

