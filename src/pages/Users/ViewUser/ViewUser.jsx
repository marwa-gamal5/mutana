import * as React from 'react';
import { useState, useEffect } from 'react';
import style from './ViewUser.module.css';

import Swal from "sweetalert2";
import axiosInstance from '../../../axiosConfig/instanse';

import { useSelector } from 'react-redux';
import Sidebar from '../../../components/AdminSidebar/AdminSidebar';
import { useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useParams } from 'react-router-dom';
function ViewUser(props) {


    const { id } = useParams();
    const [userInfo, setuserInfo] = useState();
    const [accountStatus, setaccountStatus] = useState();
    const [userPkg, setuserPkg] = useState();
    const [userImg, setUserImg] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate()
    function showAlert(message, icon) {
        Swal.fire({
            title: message,
            icon: icon,
            showConfirmButton: false,
            timer: 2000
        });
    }

    const userid = useSelector(state => state.userid.userid);

    function close(e) {
        e.preventDefault();
        let ViewUser = document.getElementById("View_User");
        ViewUser.classList.add("d-none");
    }

    let token = localStorage.getItem("token");
    const getOne = async () => {
        console.log("id is", id)
        await axiosInstance.post(`/user/user_single_user`, {
            id: id,
            token: token,
        })
            .then(response => {

                console.log("response one", response)
                setuserInfo(response.data.user_info)
                setaccountStatus(response.data.account_status[0])
                setuserPkg(response.data.user_pkg)
                const imageUrl = URL.createObjectURL(
                    new Blob([base64ToArrayBuffer(response.data.user_info.img)], { type: 'image/jpeg' })
                );

                setUserImg(imageUrl)

            })
            .catch(error => {
                console.log(error);
            });
    }


    const base64ToArrayBuffer = base64 => {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    };
    const handleViewData = (event) => {
        event.preventDefault();



    };
    console.log("userId is", userid);
    useEffect(() => {
        // if (userid !== '') {
            console.log("from useeffect")

            getOne();


        // } else (
        //     navigate('/users')
        // )


    }, []);
    console.log("from state is", userId);
    return (
        <>

            <section className='page-section py-2'>
                <div className='container px-3 min-vh-100' >
                    <div className='page_content'>
                        <div className="">
                            <div className="row justify-content-center mx-2">
                                <div className="col-lg-12 row my-4">
                                    <div className='col-6 p-0 text-start'>
                                        <h2 >User Information</h2>
                                    </div>

                                    <br />
                                    <br />
                                </div>
                            </div>



                        </div>
                        <div className="container-fluid">
                            <div className="row">
                                <Tabs
                                    defaultActiveKey="detailes"
                                    id="uncontrolled-tab-example"
                                    className="mb-3"
                                >
                                    <Tab eventKey="detailes" title="User Detailes">
                                        <div className='row'>
                                            <div className="col-md-12">

                                                <section className={`${style.main}`} >
                                                    <div className='container py-5'>
                                                        <div className='row'>
                                                            <div className='col-lg-4  position-relative'>
                                                                <div className='p-3' style={{ height: "100%" }}>
                                                                    <h4>User Information</h4>
                                                                    <div className={`${style.userInfo} p-3`}>
                                                                        <div className='text-center'>
                                                                            <img src={userImg}
                                                                                alt="avatar"
                                                                                className=" my-2 mb-5"
                                                                                // width={260}
                                                                                height={216}
                                                                                style={{ marginTop: '10px', width: "80%" }}
                                                                                fluid />
                                                                        </div>

                                                                        <h5>User Name: <p>{userInfo ? userInfo.full_name : ''}</p></h5>
                                                                        <h5> User Email: <p>{userInfo ? userInfo.email : ''}</p></h5>
                                                                        <h5>User Birthday: <p>{userInfo ? userInfo.birthday : ''}</p></h5>
                                                                        <h5>User Country: <p>{userInfo ? userInfo.country : ''}</p></h5>
                                                                        <h5>Nat ID: <p>{userInfo ? userInfo.national_id : ''}</p></h5>
                                                                        <h5>Joined Date: <p>{userInfo ? userInfo.date_joined : ''}</p></h5>
                                                                        {/* <p className="text-muted mb-1">Full Stack Developer</p> */}
                                                                        {/* <p className="text-muted mb-4"> Joined Date: {userInfo ? userInfo.date_joined : ''}</p> */}

                                                                    </div>
                                                                    {/* <ImageEdit handleInfo={handleInfo} /> */}
                                                                </div>
                                                            </div>
                                                            <div className='col-lg-8'>
                                                                <div className='p-3'>
                                                                    <div className={` my-2 mb-4`}>
                                                                        <h4>Account Status</h4>
                                                                        <div className=''>

                                                                            <div className={`${style.brdDiv} p-5`}>

                                                                                <h6>Account Status: <span className='mx-2  text-muted'> {accountStatus ? accountStatus.account_status : ''} </span></h6>
                                                                                <h6>Account Type: <span className='mx-2  text-muted'> {accountStatus ? accountStatus.acount_type : ''} </span></h6>
                                                                                <h6>Account Plan Code : <span className='mx-2  text-muted'> {accountStatus ? accountStatus.account_plan_code : ''} </span></h6>

                                                                                <h6 className="">Register Date :<span className='mx-2  text-muted'> {accountStatus ? accountStatus.reg_date : ''} </span></h6>
                                                                                <h6 className=" ">Expire Date : <span className='mx-2  text-muted'>{accountStatus ? accountStatus.exp_date : ''} </span> </h6>
                                                                                {/* <h6>Additional Properites: <span className='mx-2  text-muted'> {accountStatus ? accountStatus.additional_props : ''} </span></h6> */}

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <h4>User Package</h4>
                                                                        <div className={`${style.brdDiv} p-5 row`}>

                                                                            <h6 className='col-12 fw-bold'>Package Name: <span className='mx-2  text-muted'> {userPkg ? userPkg.pkg_name : ''} </span></h6>
                                                                            <h6 className='col-6'>Package OCR: <span className='mx-2  text-muted'> {userPkg ? userPkg.pkg_ocr : ''} </span></h6>
                                                                            <h6 className='col-6'>Package Voice: <span className='mx-2  text-muted'> {userPkg ? userPkg.pkg_voice : ''} </span></h6>
                                                                            <h6 className='col-6'>Max Containers : <span className='mx-2  text-muted'> {userPkg ? userPkg.max_containers : ''} </span></h6>

                                                                            <h6 className='col-6'>Max Folders :<span className='mx-2  text-muted'> {userPkg ? userPkg.max_folders : ''} </span></h6>
                                                                            <h6 className='col-6'>Max Images : <span className='mx-2  text-muted'>{userPkg ? userPkg.max_imgs : ''} </span> </h6>
                                                                            <h6 className='col-6'>Max Text Files: <span className='mx-2  text-muted'> {userPkg ? userPkg.max_text_files : ''} </span></h6>
                                                                            <h6 className='col-6'>Package One: <span className='mx-2  text-muted'> {userPkg ? userPkg.pkg_one : ''} </span></h6>
                                                                            <h6 className='col-6'>Package Two: <span className='mx-2  text-muted'> {userPkg ? userPkg.pkg_two : ''} </span></h6>
                                                                            <h6 className='col-6'>Package Three: <span className='mx-2  text-muted'> {userPkg ? userPkg.pkg_three : ''} </span></h6>
                                                                            <h6 className='col-6'>Package Four: <span className='mx-2  text-muted'> {userPkg ? userPkg.pkg_four : ''} </span></h6>
                                                                            <h6 className='col-6'>Package Five: <span className='mx-2  text-muted'> {userPkg ? userPkg.pkg_five : ''} </span></h6>
                                                                            <h6 className='col-6'>Package Six: <span className='mx-2  text-muted'> {userPkg ? userPkg.pkg_six : ''} </span></h6>
                                                                            <h6 className='col-6'>Package Seven: <span className='mx-2  text-muted'> {userPkg ? userPkg.pkg_seven : ''} </span></h6>
                                                                            <h6 className='col-6'>Package Eight: <span className='mx-2  text-muted'> {userPkg ? userPkg.pkg_eight : ''} </span></h6>
                                                                            <h6 className='col-6'>Package Nine: <span className='mx-2  text-muted'> {userPkg ? userPkg.pkg_nine : ''} </span></h6>
                                                                            <h6 className='col-6'>Package Ten: <span className='mx-2  text-muted'> {userPkg ? userPkg.pkg_ten : ''} </span></h6>


                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>



                                                </section>
                                            </div>

                                        </div>

                                    </Tab>
                                    <Tab eventKey="edit" title="User Edit">
                                        <div className='row'>
                                            <div className="col-md-12">

                                                <section >
                                                    <div className='container '>
                                                        <div className='row'>
                                                            <div className='col-lg-4  rounded-3 position-relative'>
                                                                <h3>User Information</h3>
                                                                <div className='text-center bg-light p-3'>
                                                                    <img src={userImg}
                                                                        alt="avatar"
                                                                        className="rounded-circle my-2"
                                                                        style={{ width: '150px', height: "150px", marginTop: '10px' }}
                                                                        fluid />
                                                                    <div class=" mb-3">
                                                                        <div class="form-group">
                                                                            <strong> User Name :</strong>
                                                                            <input disabled type="text" name="plan_name" value={userInfo ? userInfo.full_name : ''} class="form-control " placeholder="plan_name"
                                                                            // onChange={(e) => { setplanName(e.target.value) }}

                                                                            />
                                                                        </div>
                                                                        <p id="plan_name" className=' d-none text-danger mt-2'></p>
                                                                    </div>
                                                                    <div class=" mb-3">
                                                                        <div class="form-group">
                                                                            <strong> User Email:</strong>
                                                                            <input disabled type="text" name="plan_name" value={userInfo ? userInfo.email : ''} class="form-control " placeholder="plan_name"
                                                                            // onChange={(e) => { setplanName(e.target.value) }}

                                                                            />
                                                                        </div>
                                                                        <p id="plan_name" className=' d-none text-danger mt-2'></p>
                                                                    </div>
                                                                    <div class=" mb-3">
                                                                        <div class="form-group">
                                                                            <strong> User Birthday:</strong>
                                                                            <input disabled type="text" name="plan_name" value={userInfo ? userInfo.birthday : ''} class="form-control " placeholder="plan_name"
                                                                            // onChange={(e) => { setplanName(e.target.value) }}

                                                                            />
                                                                        </div>
                                                                        <p id="plan_name" className=' d-none text-danger mt-2'></p>
                                                                    </div>
                                                                    <div class=" mb-3">
                                                                        <div class="form-group">
                                                                            <strong> User Country:</strong>
                                                                            <input disabled type="text" name="plan_name" value={userInfo ? userInfo.country : ''} class="form-control " placeholder="country"
                                                                            // onChange={(e) => { setplanName(e.target.value) }}

                                                                            />
                                                                        </div>
                                                                        <p id="plan_name" className=' d-none text-danger mt-2'></p>
                                                                    </div>
                                                                    <div class=" mb-3">
                                                                        <div class="form-group">
                                                                            <strong> Nat ID:</strong>
                                                                            <input disabled type="text" name="plan_name" value={userInfo ? userInfo.national_id : ''} class="form-control " placeholder="plan_name"
                                                                            // onChange={(e) => { setplanName(e.target.value) }}

                                                                            />
                                                                        </div>
                                                                        <p id="plan_name" className=' d-none text-danger mt-2'></p>
                                                                    </div>
                                                                    <div class=" mb-3">
                                                                        <div class="form-group">
                                                                            <strong>  Joined Date:</strong>
                                                                            <input disabled type="text" name="plan_name" value={userInfo ? userInfo.date_joined : ''} class="form-control " placeholder="plan_name"
                                                                            // onChange={(e) => { setplanName(e.target.value) }}

                                                                            />
                                                                        </div>
                                                                        <p id="plan_name" className=' d-none text-danger mt-2'></p>
                                                                    </div>
                                                                    {/* <h3>User Name: {userInfo? userInfo.full_name :''}</h3>
                    <h6> User Email: {userInfo ? userInfo.email : ''}</h6>
                    <h6>User Birthday: {userInfo ? userInfo.birthday : ''}</h6>
                    <h6>User Country: {userInfo ? userInfo.country : ''}</h6>
                    <h6>Nat ID: {userInfo? userInfo.national_id : ''}</h6>
                    <p className="text-muted mb-1">Full Stack Developer</p>
                    <p className="text-muted mb-4"> Joined Date: { userInfo ? userInfo.date_joined : ''}</p> */}

                                                                </div>
                                                                {/* <ImageEdit handleInfo={handleInfo} /> */}

                                                            </div>
                                                            <div className='col-lg-8'>
                                                                <h3>Account Status</h3>
                                                                <div className=''>

                                                                    <div className='bg-light p-3'>
                                                                        <div class=" mb-3">
                                                                            <div class="form-group">
                                                                                <strong>Account Status:</strong>
                                                                                <input type="text" name="account_status" value={accountStatus ? accountStatus.account_status : ''} className="form-control " placeholder="Account Status"
                                                                                // onChange={(e) => { setplanName(e.target.value) }}

                                                                                />
                                                                            </div>
                                                                            <p id="account_status" className=' d-none text-danger mt-2'></p>
                                                                        </div>
                                                                        <div class=" mb-3">
                                                                            <div class="form-group">
                                                                                <strong>Account Type:</strong>
                                                                                <input type="text" name="account_type" value={accountStatus ? accountStatus.acount_type : ''} className="form-control " placeholder="Account Type"
                                                                                // onChange={(e) => { setplanName(e.target.value) }}

                                                                                />
                                                                            </div>
                                                                            <p id="account_type" className=' d-none text-danger mt-2'></p>
                                                                        </div>
                                                                        <div class=" mb-3">
                                                                            <div class="form-group">
                                                                                <strong>Account Plan Code :</strong>
                                                                                <input type="text" name="account_code" value={accountStatus ? accountStatus.account_plan_code : ''} className="form-control " placeholder="Account Plan Code "
                                                                                // onChange={(e) => { setplanName(e.target.value) }}

                                                                                />
                                                                            </div>
                                                                            <p id="account_code" className=' d-none text-danger mt-2'></p>
                                                                        </div>
                                                                        <div class=" mb-3">
                                                                            <div class="form-group">
                                                                                <strong>Register Date :</strong>
                                                                                <input type="text" name="account_reg" value={accountStatus ? accountStatus.reg_date : ''} className="form-control " placeholder="Register Date "
                                                                                // onChange={(e) => { setplanName(e.target.value) }}

                                                                                />
                                                                            </div>
                                                                            <p id="account_reg" className=' d-none text-danger mt-2'></p>
                                                                        </div>
                                                                        <div class=" mb-3">
                                                                            <div class="form-group">
                                                                                <strong>Expire Date :</strong>
                                                                                <input type="text" name="account_exp" value={accountStatus ? accountStatus.exp_date : ''} className="form-control " placeholder=" Expire Date "
                                                                                // onChange={(e) => { setplanName(e.target.value) }}

                                                                                />
                                                                            </div>
                                                                            <p id="account_exp" className=' d-none text-danger mt-2'></p>
                                                                        </div>
                                                                        {/* <div class=" mb-3">
                        <div class="form-group">
                            <strong>Additional Properites: </strong>
                            <input  type="text" name="account_add" value= {accountStatus ? accountStatus.additional_props : ''} className="form-control " placeholder="Additional Properites"
                                // onChange={(e) => { setplanName(e.target.value) }}

                            />
                        </div>
                        <p id="account_add" className=' d-none text-danger mt-2'></p>
                </div> */}
                                                                        {/* <h6>Account Status: <span className='mx-2  text-muted'> {accountStatus ? accountStatus.account_status : ''} </span></h6>
                        <h6>Account Type: <span className='mx-2  text-muted'> {accountStatus ? accountStatus.acount_type : ''} </span></h6>
                        <h6>Account Plan Code : <span className='mx-2  text-muted'> {accountStatus ? accountStatus.account_plan_code : ''} </span></h6>

                        <h6 className="">Register Date :<span className='mx-2  text-muted'> {accountStatus ? accountStatus.reg_date : ''} </span></h6>
                        <h6 className=" ">Expire Date : <span className='mx-2  text-muted'>{accountStatus ? accountStatus.exp_date : ''} </span> </h6>
                        <h6>Additional Properites: <span className='mx-2  text-muted'> {accountStatus ? accountStatus.additional_props : ''} </span></h6> */}

                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>



                                                </section>
                                            </div>

                                        </div>
                                    </Tab>

                                </Tabs>

                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ViewUser;


