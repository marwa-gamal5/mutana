import * as React from 'react';
import { Link } from 'react-router-dom';
import style from './Forget.module.css';

import Swal from "sweetalert2";

import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector , useDispatch  } from "react-redux";

import axiosInstance from '../../../axiosConfig/instanse';
// import FixedNavbar from '../../components/FixedNavbar/FixedNavbar'

function Forget() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  async function sendEmail(e) {
    e.preventDefault();
    await axiosInstance.post(`user/forget/`, {
      email: email,
    }).then(res => {
      console.log(res);
      if (res.data.error) {
        if (res.data.error == "too_many_requests") {
          navigate("/", {replace: true});
        }else{
          showAlert(res.data.error, "error");
        }
      } else {
        showAlert("check your email", "success");
        document.getElementById("form").innerHTML = `<div className="text-center ">
       <h4 className="text-capitalize fw-bold">
       "check your email"    
       </h4>
       </div>` ;
      }
    });
  }

  function showAlert(message, icon) {
    Swal.fire({
      title: message,
      icon: icon,
      showConfirmButton: false,
      timer: 1500
    });
  }


  return (
    <>

      <section className={`${style.login}`}>
      {/* <FixedNavbar />  */}
        <div className='d-flex justify-content-center align-items-center'>
          <div className="w-50 ">
            <div className={`${style.row} row  mt-5`}>
              <div className=" my-5 form ">
                <div className="forText">
                  <div className='form-contain'>
                    <h2 className="text-center">Reset password</h2>

                    <form id="form" className="my-3" onSubmit={sendEmail} >
                      {/* <div className='return' >
                        <Link to='/Login' className='text-decoration-none text-uppercase'>
                          <p ><img src={returnImg} alt="return" className='me-2' />{weblist.back_sign_in}</p>
                        </Link>
                      </div> */}
                      <p className='text-capitalize'>
                        enter your email to reset your password
                      </p>

                      <input className=" form-control mb-3" type="email" onChange={(e) => {
                        setEmail(e.target.value);
                      }} placeholder="email" required autoFocus />
                      <div className='d-flex justify-content-center'>
                        <button type="submit" class={`${style.btn_login} btn text-capitalize `}>reset password</button>
                       </div>
                     
                    </form>
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

export default Forget;




