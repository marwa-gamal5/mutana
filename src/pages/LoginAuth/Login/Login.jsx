import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import style from './Login.module.css';
import Swal from "sweetalert2";

import '../../index.css';

import { useSelector, useDispatch } from "react-redux";

import axiosInstance from '../../../axiosConfig/instanse';

// import FixedNavbar from '../../components/FixedNavbar/FixedNavbar'
import axios from 'axios'
function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const [authenticated, setauthenticated] = useState(
    //     localStorage.getItem(localStorage.getItem("authenticated") || false)
    // );

    function showAlert(message, icon) {
      Swal.fire({
        title: message,
        icon: icon,
        showConfirmButton: false,
        timer: 1500
      });
    }
  

    const [username, setName] = React.useState('');
    const [password, setPassword] = React.useState('');

    // let visittoken = localStorage.getItem("visitToken");

    const handleSubmit = (e) => {
        e.preventDefault();
        let { data } = axios.post(`http://192.168.11.100:8015/user/login/`, {
            username: username.toLowerCase(),
            password: password
        }).then(res => {
            console.log("res login", res.data);
         
            // if (response.data.token) {
            //     localStorage.setItem("asefToken", response.data.token);
            //     if(visittoken != null){
            //         updateToken(response.data.token, visittoken);
            //     }else{
            //         navigate("/home");
            //     }
                    
            // }

            // if (response.data.usertype == 'Super_user') {
            //     dispatch(is_s_admin(true));

            // }


            if(res.data.error){
              if(res.data.error == "too_many_requests") {
                navigate("/", {replace: true});
              }else{
                showAlert(res.data.error, "error");
                document.getElementById('error').innerHTML = res.data.error;
              }
            }else{
              localStorage.setItem("isLogged", true);
              navigate("/home");
              localStorage.setItem("EcomToken", res.data.token);
            }


            
        });
    };


    // function updateToken(token,visittoken) {

    //     console.log("udpate")
    //     axiosInstance.post(`/courses/update_cart`, {
    //         user_token: token,
    //         vst_token : visittoken
    //       })
    //         .then(res => {
      
    //           console.log("UpdateToken: " , res)
    //           if ('success' in res.data) {
    //              localStorage.setItem("visitToken", token)
    //         } else if ('error' in res.data) {
 
    //         }
    //          navigate("/home");
      
    //         })
    //         .catch(error => {
    //             console.log("error", error)
    //         });  
    // }

    // function checkUser() {
    //     if (localStorage.getItem("asefToken")) {
    //         navigate("/home");
    //     }
    // }

    const showPass= (e) =>{
      e.preventDefault();
    
      let pass =  document.getElementById('pass');
      let input =document.getElementById("password");

      if(document.getElementById('pass').classList.contains("fa-eye") == true) {
          pass.classList.remove("fa-eye");
          pass.classList.add("fa-eye-slash");
          if (input.getAttribute('type') == 'text') {
            input.setAttribute('type', 'password');
          };
      }else{
          pass.classList.remove("fa-eye-slash");
          pass.classList.add("fa-eye");
          if (input.getAttribute('type') == 'password') {
            input.setAttribute('type', 'text');
        };
          
      }
   
  }


    // useEffect(() => {
    //     checkUser();
    // }, []);


    return (
        <>
            <section className={`${style.login}`}>
            {/* <FixedNavbar />  */}
                <div className='d-flex justify-content-center align-items-center'>
                    <div className="w-50">
                        <div className={`${style.row} row  mt-5`}>

                            <div className=" my-5 form ">
                                <div className="forText">
                                    <div className='form-contain'>
                                        <h2 className="text-center">Login</h2>


                                        <form method="POST" onSubmit={handleSubmit} className="my-3 ">
                                            <label className="text-muted my-2">user name</label>
                                            <input name="username" className=" form-control mb-3 input" type="text"
                                                placeholder="username"
                                                required autoFocus
                                                value={username}
                                                onChange={e => setName(e.target.value.toLowerCase())} />

                                            <label className="text-muted my-2">password</label>
                                            <div className='position-relative'>
                                                <input id="password" name="password" className="form-control mb-3  input position-relative"
                                                    type="password" placeholder="password"
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    required
                                                    autoComplete="current-password" />
                                                <span id="pass" className={` ${style.show_pass} fa-solid fa-eye-slash position-absolute`} onClick={(e) => {
                                                    showPass(e)
                                                }}></span>
                                            </div>
                                            <div className=" d-flex justify-content-between content-forget">
                                                <label>
                                                    <input type="checkbox" className='m-2' />
                                                    remember me
                                                </label>
                                                <Link className={`${style.sign_up} text-decoration-none  `} to="/forget">forgot password</Link>
                                            </div>
                                            <p id="error" style={{ color: "red", fontWeight: "bold" }}></p>
                                           
                                            <div className='d-flex justify-content-center'>
                                                <button type="submit" value="login" className={`${style.btn_login} btn mt-3 text-capitalize  fw-bold `}>login</button>
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

export default Login;