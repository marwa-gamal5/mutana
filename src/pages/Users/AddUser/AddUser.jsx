import * as React from 'react';
import { useState } from 'react';
import { AiFillCloseCircle } from "react-icons/ai";
import style from './AddUser.module.css';
import Swal from "sweetalert2";
import axiosInstance from '../../../axiosConfig/instanse';
import { useForm } from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"

const schema = yup.object({
    userFullName : yup.string().required().min(4),
    userEmail : yup.string().required().matches(/^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email is not valid")
})
function AddUser(props) {
    const {handleSubmit ,
        register,
        formState:{errors}
    } = useForm({resolver:yupResolver(schema)});
    let token = localStorage.getItem("token");

// create user
    const addAdminUser = async (data)=>{


        await axiosInstance.post('user/create_admin_user', {
            token: token,
            email: data.userEmail,
            fullname:data.userFullName
        }, {
            headers: {
                "Authorization": `Token ${token}`,
            }
        }).then((res)=>{
            console.log("status", res)
            if(res.data.success){
                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Successfully added admin .',
                                    showConfirmButton: false,
                                    timer: 1500
                            })
            }
            console.log("statussssss", res.data.success)
        }).catch((err) => {
                console.log("err", err)
            });
    }

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
        let addUser = document.getElementById("add_User");
        addUser.classList.add("d-none");
    }


    return (
        <>

            <div className={`${style.contain}`}>
                <div className="row justify-content-center  mx-1 mb-5">
                    <div className="col-lg-12 mb-4">
                        <div className={` ${style.pull_left}`}>
                            <h2>Add User Urls</h2>
                        </div>
                    </div>

                    <form
                   className={`${style.create_accont}`} >

                        <div className="row">
                            <div className={` col-12`}>
                                <button
                                    className={`${style.pull_right} outline-none fa-solid fa-square-xmark fs-4  text-danger`}
                                    style={{border: "none"}} onClick={close}><AiFillCloseCircle/>
                                </button>
                            </div>

                            {/* user full name */}
                            <div className="col-12 mb-3">
                                <div className="form-group">
                                    <strong className='d-block mb-2'>User Name:</strong>
                                    <input type="text" className="form-control" placeholder="User Full Name"
                                           {...register("userFullName")}
                                    />
                                    <p className="text-danger ">{errors.userFullName?.message}</p>

                                </div>
                            </div>

                            {/* user email */}
                            <div className="col-12 mb-3">
                                <div className="form-group">
                                    <strong className='d-block mb-2'>User Email:</strong>
                                    <input type="email" className="form-control" placeholder="User Email"
                                           {...register("userEmail")}
                                    />
                                    <p className="text-danger">{errors.userEmail?.message}</p>

                                </div>
                            </div>


                            <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                                <button onClick={handleSubmit((data)=>{addAdminUser(data);
                                    console.log(data,"ggggggggggg")})} className={`btn ${style.btnCreate} mb-3`}>Create</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default AddUser;


