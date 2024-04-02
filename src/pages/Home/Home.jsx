import * as React from 'react';
import { Link } from 'react-router-dom';


import Swal from "sweetalert2";

import axios from "axios";
import { useState, useEffect , useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector , useDispatch  } from "react-redux";

import axiosInstance from '../../axiosConfig/instanse';
import SideBar from '../../components/AdminSidebar/AdminSidebar';
// import FixedNavbar from '../../components/FixedNavbar/FixedNavbar'
import '../../index.css'

function Home() {
   const ref = useRef()
    const testSide= useState()
    const myVariable = localStorage.getItem('toggleClass')
    // setTestSide(myVariable)
    ref.current = localStorage.getItem('toggleClass');
  useEffect(() => {
   
    
console.log("myVariable", myVariable , testSide)
    const element = document.getElementById('home_page');
    console.log("element in use effect",element)
    if (ref.current) {
        if(element.classList.contains('sideOpend')== true){
            element.classList.remove('sideOpend');
        }else{
            element.classList.add('sideOpend');
        }
    
    }
        // if(element.classList.contains('sideOpend')){
        //     element.classList.remove('sideOpend');
        // }else{
        //     element.classList.add('sideOpend');
        // }

  }, [ref.current])
  return (
    <>

      <section >
        <SideBar/>
       <div id='home_page' className={`page-section-home `}>






       </div>
                
               
      </section>

    </>
  )
}

export default Home;




