import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from './Reset.module.css';

import Swal from "sweetalert2";
import axios from "axios";
import { useState, useEffect, useRef } from 'react';
import ReactLoading from "react-loading";
import { useSelector , useDispatch } from "react-redux";

import axiosInstance from '../../axiosConfig/instanse';
// import FixedNavbar from '../../components/FixedNavbar/FixedNavbar'

function Reset() {

  const { token } = useParams();
  const [isBusy, setIsBusy] = useState(false);

  const [password, setPassword] = useState();
  const [repassword, setRePassword] = useState();

  const navigate = useNavigate();

  const dispatch = useDispatch();


  function showAlert(message, icon) {
    Swal.fire({
      title: message,
      icon: icon,
      showConfirmButton: false,
      timer: 1500
    });
  }


  async function check() {
    await axiosInstance.post(`user/chk_tok`, {
      token: token
    }).then(res => {
      console.log(res)
      if (res.data.error) {
        if (res.data.error == "too_many_requests") {
          navigate("/", {replace: true});
        }else{
          showAlert(res.data.error, "error");
          navigate('/', { replace: true })
        }
      } else {
        setIsBusy(true);
      }
    })
  }


  async function sendPassword(e) {
    e.preventDefault();
    if (machErrorValidation === true) {
      await axiosInstance.post(`user/reset_pass/`, {
        token: token,
        password: password,
        re_password: repassword
      }).then(res => {
        if (res.data.success) {
          showAlert("password changed successfuly", "success");
          navigate('/login', { replace: true })
        } else {
          if (res.data.error == "too_many_requests") {
            navigate("/", {replace: true});
          }else{
            showAlert(res.data.error, "error");
          }
        }
      })
    }
  }

const [machError, setMachError] = useState('');
const [machErrorValidation, setMachErrorValidation] = useState('');

function machingPassword(value) {

  let eleErr = document.getElementById("rePassword");
    if (value === password) {
      eleErr.classList.add('d-none');
      return true;
    } else {
      setMachError("passwords not match");
      eleErr.classList.remove('d-none');
      return false;
    }
  }


  useEffect(() => {
    check();
  }, []);


  return (
    <>
      { isBusy ? (

          <section className={`${style.login}`}>
            {/* <FixedNavbar />  */}
            <div className='d-flex align-items-center justify-content-center'>
              <div className="w-50">
                <div className={`${style.row} row  mt-5`}>
                  <div className=" my-5 form ">
                    <div className="forText">
                      <div className='form-contain'>
                        <form className="my-3 " onSubmit={sendPassword}>
                          <div className='return' >
                            <h2 className="text-center">Reset Your password</h2>
                          </div>
                          <input className=" form-control mb-3" type="password" placeholder="enter new password" onChange={(e) => {
                            setPassword(e.target.value);
                          }} required autoFocus />

                          <input className=" form-control mb-3" type="password" placeholder="confirm password" onChange={(e) => {
                            machingPassword(e.target.value)
                            setMachErrorValidation(machingPassword(e.target.value));
                            setRePassword(e.target.value);
                          }} required autoFocus />
                          <p id="rePassword" className='d-none text-danger mt-2'>{machError}</p>
                          <div className='d-flex justify-content-center'>
                             <button type="submit" class={`${style.btn_login} btn text-capitalize `}>password reset</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        ) : (

          <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <div>
              <ReactLoading type="spin" color="#CD5C5C" height={100} width={50} />
            </div>
          </div>

        )}

    </>

  );
}

export default Reset;