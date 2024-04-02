
import * as React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/AdminSidebar/AdminSidebar';
import style from './Users.module.css';
import { useState, useEffect, useRef } from 'react';

import AddUser from '../AddUser/AddUser';
import EditUser from '../EditUser/EditUser';
import Swal from "sweetalert2";
import '../../../index.css'
import axiosInstance from '../../../axiosConfig/instanse';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import changeUserId from '../../../store/Actions/userid';
import changeUserSetting from '../../../store/Actions/usersetting';

import {userType} from "../../../store/Actions/userinfo"

import './table.css'
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
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '@fortawesome/fontawesome-free/css/solid.css'
import '@fortawesome/fontawesome-free/css/regular.css'
import '@fortawesome/fontawesome-free/css/brands.css'

import imgView from '../../../assets/product/veiw.webp'
import imgDelete from '../../../assets/product/delete.webp'

import imgAddbtn from '../../../assets/add-button.webp'

import searchImg from '../../../assets/search.webp'
import userSetImg from '../../../assets/user settings (3) 1.webp'



const Users = () => {


    const [User, setUser] = useState([])
    const [UserId, setUserId] = useState('')
    const [UserName, setUserName] = useState('')
    const [endpoint, setEndpoint] = useState('')
    const [Createbtn, setCreatebtn] = useState(true)
    const [Editbtn, setEditbtn] = useState(true)
    const [Deletebtn, setDeletebtn] = useState(true)
    const [Showbtn, setShowbtn] = useState(true)
    const [showAddUser, setShowAddUser] =useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();






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

            }
        })
    }







    let token = localStorage.getItem("token");

///////////// fetchUser admin ///////////////
    const fetchUser = async () => {

        await axiosInstance.post(`user/view_users_active_deactive`, {
            token: token,
        })
            .then(response => {
                setUser(response.data.success)

            })
            .catch(error => {
                console.log("error", error);
            });
    };

///////////// fetchUser customers ///////////////
//     view_customers_users




    const testUrl = async (endPoint) => {
        await axiosInstance.post(`/user/get_my_urls`, {

            token: token,
            url: endPoint
        })
            .then(response => {

                if (response.data.success) {
                    setCreatebtn(response.data.success.C);
                    setDeletebtn(response.data.success.D);
                    setShowbtn(response.data.success.R);
                    setEditbtn(response.data.success.U)

                } else {
                    //    afterDelete(response.data.error, "error")
                    //     navigate('/adminhome')
                }
                fetchUser();
                console.log("response test url", response)

                // setOnePlan(response.data.success)
            })
            .catch(error => {
                console.log(error,"--------------------");
            });
    }

    useEffect(() => {



        const endpoint = window.location.pathname.split('/')[1];
        console.log(endpoint,'ttttttttttttttttt')
        setEndpoint(endpoint);


        testUrl(endpoint);
    }, []);


    console.log("endpoint", endpoint);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = (id) => {
        const filteredData = data.filter((item) => item.id !== id);
        setData(filteredData);
    };


    return (
        <>


            <section id='home_page' className='page-section-home py-2'>
                <div className=' min-vh-100' >
                    <div className='page_content'>
                        <div className="">
                            <div className="row justify-content-center mx-2">
                                <div className="col-lg-12 row my-4">
                                    <div className='col-lg-6 p-0 text-start'>
                                        <h2 >Users</h2>
                                        {/* <i className='fab fa-github'></i> */}
                                    </div>
                                    <div className='col-lg-6 '>
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


                                </div>
                                <div>
                                    <button type="button" onClick={(()=>{showAddUser?setShowAddUser(false):setShowAddUser(true)})}
                                            className="btn btn-success">Add User</button>
                                </div>
                            </div>

                            <div id="add_User" className={showAddUser ? 'd-block' : 'd-none'}>

                                <AddUser/>
                            </div>


                            <div id="edit_User" className='d-none'>
                                <EditUser id={UserId} name={UserName} url={endpoint} fetchData={fetchUser} />
                            </div>


                        </div>
                        <div className="container-fluid">
                            <div className="row">

                                <div className="col-md-12 p-3">
                                    <h1>Admin users</h1>
                                    <div className='editTabs mt-5'>
                                        <Tabs
                                            defaultActiveKey={User.length > 0 ? `${User[0].status}` : "active"}
                                            id="uncontrolled-tab-example"
                                            className="mb-3"
                                        >
                                            {User.map((item, index) => {
                                                return (
                                                    <Tab eventKey={`${item.status}`} key={index}
                                                         title={`${item.status}`}>
                                                        <TableContainer className='TableContainer' component={Paper}>
                                                            <Table className='Table'>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell
                                                                            className='TableHeadCell fw-bold'>ID</TableCell>
                                                                        <TableCell
                                                                            className='TableHeadCell fw-bold'>Name</TableCell>
                                                                        <TableCell
                                                                            className='TableHeadCell fw-bold'>Email</TableCell>
                                                                        <TableCell
                                                                            className='TableHeadCell fw-bold'>Actions</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {item.users
                                                                        .filter(user => user.user_type === 'admin') // Filter users with user_type === 'customer'
                                                                        .filter(user => user.fullname.toLowerCase().includes(searchTerm.toLowerCase())) // Filter by search term
                                                                        .map((user, index) => (
                                                                            <TableRow className='TableRow' key={index}>
                                                                                <TableCell
                                                                                    className='TableCell'>{index + 1}</TableCell>
                                                                                <TableCell
                                                                                    className='TableCell'>{user.fullname}</TableCell>
                                                                                <TableCell
                                                                                    className='TableCell'>{user.email}</TableCell>
                                                                                <TableCell className='TableCell '>
                                                                                    <div
                                                                                        className="table-data-feature justify-content-between">
                                                                                        <Link type='button'
                                                                                              to={`/profile/${user.userp}`}
                                                                                              className="item"
                                                                                              onClick={() => {
                                                                                                  console.log(user.user_type, "fffffffffffffffffffff")
                                                                                                  dispatch(userType(user.user_type))
                                                                                              }}>
                                                                                            <img src={imgView}
                                                                                                 width={20} height={20}
                                                                                                 alt=""/>
                                                                                        </Link>
                                                                                        <Link type='button'
                                                                                              className="item"
                                                                                              onClick={(e) => {
                                                                                                  e.preventDefault();
                                                                                                  console.log("edit user")
                                                                                                  setUserId(user.userp);
                                                                                                  setUserName(user.fullname);
                                                                                                  dispatch(changeUserSetting({
                                                                                                      username: user.fullname,
                                                                                                      id: user.userp
                                                                                                  }))
                                                                                                  navigate('/edituser')
                                                                                              }}>
                                                                                            <img src={userSetImg}
                                                                                                 width={20} height={20}
                                                                                                 alt=""/>
                                                                                        </Link>
                                                                                        <form>
                                                                                            <Link type='button'
                                                                                                  className="item"
                                                                                                  onClick={() => {
                                                                                                      DeleteAlert(user.userp)
                                                                                                  }}>
                                                                                                <img src={imgDelete}
                                                                                                     width={16}
                                                                                                     height={16}
                                                                                                     alt=""/>
                                                                                            </Link>
                                                                                        </form>
                                                                                    </div>
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Tab>


                                                )
                                            })}

                                        </Tabs>


                                    </div>
                                    <h1>Customer users</h1>
                                    <div className='editTabs mt-5'>
                                        <Tabs
                                            defaultActiveKey={User.length > 0 ? `${User[0].status}` : "active"}
                                            id="uncontrolled-tab-example"
                                            className="mb-3"
                                        >
                                            {User.map((item, index) => {
                                                return (
                                                    <Tab eventKey={`${item.status}`} key={index}
                                                         title={`${item.status}`}>
                                                        <TableContainer className='TableContainer' component={Paper}>
                                                            <Table className='Table'>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell
                                                                            className='TableHeadCell fw-bold'>ID</TableCell>
                                                                        <TableCell
                                                                            className='TableHeadCell fw-bold'>Name</TableCell>
                                                                        <TableCell
                                                                            className='TableHeadCell fw-bold'>Email</TableCell>
                                                                        <TableCell
                                                                            className='TableHeadCell fw-bold'>Actions</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {item.users
                                                                        .filter(user => user.user_type === 'customer') // Filter users with user_type === 'customer'
                                                                        .filter(user => user.fullname.toLowerCase().includes(searchTerm.toLowerCase())) // Filter by search term
                                                                        .map((user, index) => (
                                                                            <TableRow className='TableRow' key={index}>
                                                                                <TableCell
                                                                                    className='TableCell'>{index + 1}</TableCell>
                                                                                <TableCell
                                                                                    className='TableCell'>{user.fullname}</TableCell>
                                                                                <TableCell
                                                                                    className='TableCell'>{user.email}</TableCell>
                                                                                <TableCell className='TableCell '>
                                                                                    <div
                                                                                        className="table-data-feature justify-content-between">
                                                                                        <Link type='button'
                                                                                              to={`/profile/${user.userp}`}
                                                                                              className="item"
                                                                                              onClick={() => {
                                                                                                  console.log(user.user_type, "fffffffffffffffffffff")
                                                                                                  dispatch(userType(user.user_type))
                                                                                              }}>
                                                                                            <img src={imgView}
                                                                                                 width={20} height={20}
                                                                                                 alt=""/>
                                                                                        </Link>
                                                                                        <Link type='button'
                                                                                              className="item"
                                                                                              onClick={(e) => {
                                                                                                  e.preventDefault();
                                                                                                  console.log("edit user")
                                                                                                  setUserId(user.userp);
                                                                                                  setUserName(user.fullname);
                                                                                                  dispatch(changeUserSetting({
                                                                                                      username: user.fullname,
                                                                                                      id: user.userp
                                                                                                  }))
                                                                                                  navigate('/edituser')
                                                                                              }}>
                                                                                            <img src={userSetImg}
                                                                                                 width={20} height={20}
                                                                                                 alt=""/>
                                                                                        </Link>
                                                                                        <form>
                                                                                            <Link type='button'
                                                                                                  className="item"
                                                                                                  onClick={() => {
                                                                                                      DeleteAlert(user.userp)
                                                                                                  }}>
                                                                                                <img src={imgDelete}
                                                                                                     width={16}
                                                                                                     height={16}
                                                                                                     alt=""/>
                                                                                            </Link>
                                                                                        </form>
                                                                                    </div>
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Tab>


                                                )
                                            })}

                                        </Tabs>


                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Users;


