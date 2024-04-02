import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from '../../../axiosConfig/instanse';


import cookies from 'js-cookie';
import { useSelector ,useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/AdminSidebar/AdminSidebar';
export default function AddVendors() {


  const [name ,  setName] = useState([]);
  const [address ,  setAddress] = useState([]);
  const [description ,  setDescription] = useState([]);
  const [languageList , setLanguageList] = useState([]);
  const [stateError , setStateError] = useState(false);

  const langList =  useSelector(state=>state.langList.langList);

  // console.log(langList);

  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  const currentLanguageCode = useSelector((state) => state.language.lang);

  function showAlert(message, icon) {
    Swal.fire({
      title: message,
      icon: icon,
      showConfirmButton: false,
      timer: 1500
    });
  }


  const handleSubmit = (e) => {

      let { data } = axiosInstance.post(`store/add_vendor`,{
        token: token,
        name: name[0],
        address: address[0],
        description: description[0] 
      }).then(res => {

          if(res.data.success){
            let vendorId = res.data.id;
            languageList.map((lang, index)=>{
              let langCode = lang.code ;
              let LangIndex = index + 1;

              if(stateError == false){


                addVendorsT(vendorId , langCode , LangIndex); 
              }
 
            })

          }else{
            console.log("res one from else :", res.data.error);
            showAlert(res.data.error, "error");
          }
                    
      }).catch(err => {
        console.log("err one", err);
      })
  };


  async function addVendorsT(vendorId , langCode , LangIndex){
    let id = vendorId;
    let lang = langCode;
    let index = LangIndex;


    await axiosInstance.post(`store/add_vendor_T`,
        {
          token: token,
          id: id,
          lang:lang,
          name: name[index],
          address: address[index],
          description: description[index] 
        }
    ).then(res => {

        if(res.data.error){

          showAlert(res.data.error, "error");
          setStateError(true);
        }else{

            if(LangIndex == languageList.length){
                showAlert(res.data.success, "success");
                navigate("/vendors");
            }
        }



    }).catch(err => {
      console.log("err t", err);
    });

}


    useEffect(() => {
      setLanguageList(langList);

    }, [langList , name ,address , description ]);



  return (

    <>

   <Sidebar />
        <div id='home_page' className='page-section-home'>

            <div className='row '>
                <h3 className="col-lg-6">
                    {/* <i className="fa-regular fa-square-plus me-3" style={{ color: "#CD5C5C " }}></i> */}
                    Add Vendors
                </h3>
                {/* <Link to="/vendors" className='col-lg-6'> Back To All Vendor</Link> */}
            </div>

            <form method="POST" onSubmit={handleSubmit} className="my-3 create_accont">
                <div className='row'>
                    <div className='col-lg-4'>
                        <label className="text-muted my-2">Vendors Name</label>
                        <input className=" form-control mb-3 input" type="text"
                               placeholder="Vendors Name"
                               required autoFocus
                               onChange={(e) => {
                                   // setName([e.target.value])
                                   name[0] = e.target.value;
                                   setName([...name]);
                               }}/>

                    </div>
                    <div className='col-lg-4'>
                        <label className="text-muted my-2">Address</label>
                        <input className=" form-control mb-3 input" type="text"
                               placeholder="Address"
                               required autoFocus
                               onChange={(e) => {
                                   // setAddress([e.target.value])
                                   address[0] = e.target.value;
                                   setAddress([...address]);
                               }}/>

                    </div>
                    <div className='col-lg-4'>
                        <label className="text-muted my-2">Description</label>
                        <input className=" form-control mb-3 input" type="text"
                               placeholder="Description"
                               required autoFocus
                               onChange={(e) => {
                                   // setDescription([e.target.value])
                                   description[0] = e.target.value;
                                   setDescription([...description]);
                               }}/>
                    </div>

                </div>

                {languageList.map((lang, index) => {
                    let langDir = "ltr";
                    if (lang.rtl == true) {
                        langDir = "rtl";
                    } else {
                        langDir = "ltr";
                    }
                    return (
                        <>
                            <div dir={langDir}>
                                <h2>{lang.name}</h2>
                                <div className='row'>
                                    <div className='col-lg-4'>
                                        <label className="text-muted my-2">Vendors Name</label>
                                        <input className=" form-control mb-3 input" type="text"
                                               placeholder="Vendors Name"
                                               required autoFocus
                                               onChange={(e) => {
                                                   let fieldIndex = index + 1;
                                                   name[fieldIndex] = e.target.value;
                                                   setName([...name]);
                                               }}/>

                                    </div>
                                    <div className='col-lg-4'>
                                        <label className="text-muted my-2">Address</label>
                                        <input className=" form-control mb-3 input" type="text"
                                               placeholder="Address"
                                               required autoFocus
                                               onChange={(e) => {
                                                   let fieldIndex = index + 1;
                                                   address[fieldIndex] = e.target.value;
                                                   setAddress([...address]);
                                               }}/>

                                    </div>
                                    <div className='col-lg-4'>
                                        <label className="text-muted my-2">Description</label>
                                        <input className=" form-control mb-3 input" type="text"
                                               placeholder="Description"
                                               required autoFocus
                                               onChange={(e) => {
                                                   let fieldIndex = index + 1;
                                                   description[fieldIndex] = e.target.value;
                                                   setDescription([...description]);
                                               }}/>
                                    </div>
                                </div>
                            </div>

                        </>
                    )
                })

                }

                <div className='d-flex justify-content-center'>
                    <button type="submit" className={` btn btn-danger mt-3 text-capitalize  fw-bold `}>Add</button>
                </div>
            </form>
        </div>

    </>

  )

}
