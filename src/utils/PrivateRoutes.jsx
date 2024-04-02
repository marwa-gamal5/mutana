import { Outlet, Navigate } from "react-router-dom";
import react, { useEffect, useState } from 'react';
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import changeIsAuth from "../store/Actions/isauth";
import axios from 'axios';

// import { error_many } from "../store/action";

// import { useRouteMatch } from 'react-router-dom';
const PrivateRoutes = () => {

    const [isBusy, setIsBusy] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [authent, setAuthent] = useState(true)


    const endpoint = window.location.pathname.split('/')[1];

    const urls = useSelector((state) => state.whitelist.whitelist)
    

   const  zeft = async() =>{

   for (let index = 0; index < urls.length; index++) {

         if(urls[index][0]=== endpoint){

           dispatch(changeIsAuth(true));
            setAuthent(true) 
         }else{

            dispatch(changeIsAuth(false));
            setAuthent(false) 
         }
     }

    
    }



    async function check() {
        axios.post(`http://192.168.11.100:8015/user/check/`,
            {
                token: token
            }).then(res => {
               setIsBusy(true);


                if (res.data.name) {

                    dispatch(changeIsAuth(true));
                    setAuthent(true) 
                //    zeft();
                    // let index;
                    
                //    async function test (){
                //     console.log("test")
                //     const testpath = endpoint.split('/')[1];
                  
                //     //  index = await urls.findIndex((item) => item[0] === testpath)
                   
                //     //  console.log(" sfterawite", index)
                //     //  console.log(" sfterawite", index)
                //     //  console.log("test")
                //    }
                //    console.log(" sfterawite", index)
                //    test();
                    // console.log("index", index ,ele)
                    setTimeout(()=>{
                        
                    },2000)
                   
                }
                if (res.data.error == "too_many_requests") {
                   
                    navigate("/", {replace: true});
                }
          

            }).catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {

        if (token) {
            check();

        } else {
            navigate('/login');
        }


    }, [token]);

    return (
        <>
            {
                isBusy ? (authent? <Outlet /> : <Navigate to="/login" />) : (<div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
                    <div>
                        <ReactLoading type="spin" color="#00537f"
                            height={100} width={50} />
                    </div>

                </div>)

            }


        </>
    )


}


export default PrivateRoutes;