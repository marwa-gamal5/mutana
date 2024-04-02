
import * as React from 'react';
import { Link } from 'react-router-dom';
// import SideBar from '../AdminSidebar/AdminSidebar';

import style from './CreateUrl.module.css';
// import CSRFToken from "./../../components/CSRFTOKEN/csrftoken";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import axiosInstance from '../../../axiosConfig/instanse';
import { SketchPicker } from 'react-color'
import { BlockPicker } from "react-color";

function CreateUrl(props) {

    const [urlType, seturlType] = useState('private');
    const [urlName, seturlName] = useState('');
    const [reponsibleName, setReponsibleName] = useState('');

    const [isHidden, setHidden] = useState("false");
    // destructuring rgba from state

    function showAlert(message, icon) {
        Swal.fire({
            title: message,
            icon: icon,
            showConfirmButton: false,
            timer: 2000
        });
    }


    function close(e) {
        e.preventDefault();
        let CreateUrl = document.getElementById("create_Url");
        CreateUrl.classList.add("d-none");
    }





    let token = localStorage.getItem("token");
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        await axiosInstance.post(`/user/create_urll`, {
            token: token,
            url: "ViewPermissionUrls",
            url_name: urlName,
            url_type: urlType

        })
            .then(response => {

                if (response.data.success) {

                    showAlert(response.data.success, 'success')
                  
                    props.fetchdata()
                    
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



    const ToggleClass2 = () => {

        setHidden(!isHidden);
    };

    const handleClose = () => {


        setHidden(false);
    };





    useEffect(() => {
        // fetchData();
        // rgbaToHex(rgbaColor)
        seturlType('private')
    }, []);


    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'



    return (
        <>
            {/* <SideBar /> */}
            <div >
                <div className='container-fluid '>
                    <div className="row justify-content-center">
                        <div className="col-lg-12 mb-4">
                            <div className={` ${style.pull_left}`}>
                                <h2>Add New Url</h2>
                            </div>

                        </div>



                        <form className={`${style.create_accont}`} onSubmit={handleFormSubmit}>
                            {/* <CSRFToken /> */}
                            <div className="row">
                                <div className={` col-12`}>
                                    <button className={`${style.pull_right} fa-solid fa-square-xmark fs-4  text-danger`} onClick={close}> </button>
                                </div>

                                <div class="col-xs-6 col-sm-6 col-md-6 mb-3">
                                    <div class="form-group">
                                        <strong> Name :</strong>
                                        <input type="text" name="url_Name" class="form-control" placeholder="Url Name"
                                            onChange={(e) => { seturlName(e.target.value) }}

                                        />
                                    </div>
                                    <p id="url_name" className=' d-none text-danger mt-2'></p>
                                </div>
                                <div class="col-xs-6 col-sm-6 col-md-6 mb-3">
                                    <div class="form-group ">
                                        <strong>Type:</strong>
                                        <select name="type" id="type" className='form-control' placeholder='Select Type'  onChange={(e) => { seturlType(e.target.value) }} >
                                            <option value="private">Private</option>
                                            <option value="public">Public</option>
                                          
                                        </select>
                                        {/* <input type="text" name="url_type" class="form-control" placeholder="Url Type"
                                            onChange={(e) => { seturlType(e.target.value) }} /> */}
                                    </div>
                                </div>




                                <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                                    <button type="submit" className={`btn ${style.btnCreate} mb-3`}>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateUrl;













