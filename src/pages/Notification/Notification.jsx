

import React, { useState, useEffect, useRef } from 'react'
import style from './Notification.module.css'
import '../../index.css'
import Swal from "sweetalert2";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import axiosInstance from "../../axiosConfig/instanse.jsx";
import closeImg from "../../assets/exit-icon.webp";

export default function  Notification() {

    const [msgTitle, setMsgTitle] = useState('');
    const [msgBody, setMsgBody] = useState('');
    const [allMsg, setAllMsg] = useState([]);
    const [show, setShow] = useState(false);
    const [itemId, setItemId] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

let token = localStorage.getItem("token");

    function showAlert(message, icon) {
        Swal.fire({
            title: message,
            icon: icon,
            showConfirmButton: false,
            timer: 2000
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let { data } = axiosInstance.post(`user/create_default_notification_msg`,{
            token: token,
           title:msgTitle,
            body:msgBody
        }).then(res => {

            if(res.data.success){
                showAlert("Notification Added Successfully", "success");
                e.target.reset();
                getAllItems()
            }

        }).catch(err => {
            console.log("err one", err);
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        let { data } = axiosInstance.post(`user/update_default_notification_msg`,{
            id:itemId,
            token: token,
            title:msgTitle,
            body:msgBody
        }).then(res => {

            if(res.data.success){
                showAlert("Notification Updated Successfully", "success");
                e.target.reset();
                getAllItems()
            }

        }).catch(err => {
            console.log("err one", err);
        });
    };
    const getAllItems = async () => {

        await axiosInstance.post(`user/view_all_default_notification_msg`, {
            token: token,


        })
            .then(response => {

                console.log("response all msg", response)
                setAllMsg(response.data.success)

            })
            .catch(error => {
                console.log("error", error);
            });
    };
    const fetchOneItem = async (id) => {

        await axiosInstance.post(`user/view_one_default_notification_msg`, {
            id: id,
            token: token,

        }).then(res => {
            console.log("view one notification", res);

              setMsgTitle(res.data.success.title);
                setMsgBody(res.data.success.body);
        }).catch(err => {
            console.log(err);
        });
    };

    const [optionsOpen, setOptionsOpen] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);

    const handleThreePointsClick = (itemId) => {
        setOptionsOpen((prevState) => ({
            ...prevState,
            [itemId]: !prevState[itemId],
        }));
        setSelectedItem(itemId);
    };






    function DeleteAlert(id) {
        Swal.fire({
            title: "Are you sure ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1dbf73',
            cancelButtonColor: '#d33',
            confirmButtonText: "delete",
            cancelButtonText: "cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                DaleteItem(id)
            }
        })
    }


    function afterDelete(message, icon) {
        Swal.fire({
            title: message,
            icon: icon,
            showConfirmButton: false,
            timer: 1500
        });
    }

    const DaleteItem = async (itemId) => {
        await axiosInstance.post(`user/delete_default_notification_msg`, {
            token: token,
            id: itemId

        }).then(res => {
            console.log("delete item", res);
            afterDelete("Notification Deleted Successfully", "success");
            getAllItems()
        });
    }

    useEffect(() => {
        getAllItems();
    }, []);
    return (
       <section id='home_page' className={`page-section-home`}>
           <div>
               <h3>Notification</h3>
           </div>

           <div className={`${style.main}`}>
               <form method="POST"  className="my-3 create_accont" onSubmit={handleSubmit}>
                   <div className='row'>
                       <div className='col-lg-6'>
                           <label className={`${style.label} mb-2`}>Notification Title</label>
                           <textarea className=" form-control mb-3 input" type="text" rows={5}

                                  required autoFocus
                                  onChange={(e)=>{

                                     setMsgTitle(e.target.value)
                                  }} ></textarea>

                       </div>
                       <div className='col-lg-6'>
                           <label className={`${style.label} mb-2`}>Notification Body</label>
                           <textarea className=" form-control mb-3 input" type="text" rows={5}

                                  required autoFocus
                                  onChange={(e) => {

                                          setMsgBody(e.target.value)
                                  }} ></textarea>

                       </div>
                       <div className={`text-center`}>
                            <button className="btn btnCreateAddd btn-block my-3" type="submit">Add</button>
                       </div>


                   </div>




               </form>
               <hr className={`${style.hr}`}/>
              <div className={`p-4`}>
                  <div className={`p-2`} style={{maxHeight:'400px', overflowY:"scroll"}}>
                      {allMsg.map((item) => {
                          const itemId = item[0];
                          const optionsVisible = optionsOpen[itemId] || false;

                          return (
                              <div key={itemId} className={`${style.msg} p-5 my-2`}>
                                  <div className={`${style.msgTitle} d-flex justify-content-between`}>
                                      <h5>{item[1]}</h5>
                                      <div style={{ position: "relative" }}>
                                          <div
                                              onClick={() => handleThreePointsClick(itemId)}
                                              style={{
                                                  cursor: "pointer",
                                                  display: "flex",
                                                  flexDirection: "column",
                                              }}
                                          >
                                              <span className={`${style.point}`}></span>
                                              <span className={`${style.point}`}></span>
                                              <span className={`${style.point}`}></span>
                                          </div>
                                          {optionsVisible && (
                                              <div
                                                  style={{
                                                      position: "absolute",
                                                      top: "30px",
                                                      right: "0",
                                                      background: "#fff",
                                                      borderRadius: "4px",
                                                      border: "1px solid #5EB645",
                                                  }}
                                              >
                                                  <div
                                                      onClick={() => {
                                                          setItemId(item[0]);
                                                          fetchOneItem(item[0]);
                                                          handleShow();
                                                      }}
                                                      className={`px-2 py-1`}
                                                      style={{ cursor: "pointer" }}
                                                  >
                                                      Edit
                                                  </div>
                                                  <hr className={`${style.hr}`} />
                                                  <div
                                                      onClick={() => DeleteAlert(item[0])}
                                                      className={`px-2 py-1`}
                                                      style={{ cursor: "pointer" }}
                                                  >
                                                      Delete
                                                  </div>
                                              </div>
                                          )}
                                      </div>
                                  </div>
                                  <div className={`${style.msgBody}`}>
                                      <p>{item[2]}</p>
                                  </div>
                              </div>
                          );
                      })}

                  </div>
              </div>




               <Modal  size="lg"
                       aria-labelledby="contained-modal-title-vcenter" show={show} onHide={handleClose}>
                   <Modal.Header >
                       <Modal.Title>Edit Notification</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                       <form method="POST"  className="my-3 create_accont" onSubmit={handleEditSubmit}>
                           <div className='row'>
                               <div className='col-lg-6'>
                                   <label className={`${style.label} mb-2`}>Notification Title</label>
                                   <textarea className=" form-control mb-3 input" type="text" rows={5}
                                             value={msgTitle}
                                             required autoFocus
                                             onChange={(e)=>{

                                                 setMsgTitle(e.target.value)
                                             }} ></textarea>

                               </div>
                               <div className='col-lg-6'>
                                   <label className={`${style.label} mb-2`}>Notification Body</label>
                                   <textarea className=" form-control mb-3 input" type="text" rows={5}
                                             value={msgBody}
                                             required autoFocus
                                             onChange={(e) => {

                                                 setMsgBody(e.target.value)
                                             }} ></textarea>

                               </div>
                               <div className={`text-center`}>
                                   <button className="btn btnCreateAddd btn-block my-3" type="submit">Update</button>
                               </div>


                           </div>




                       </form>
                   </Modal.Body>

                   <button className={`close-my-modal`} onClick={handleClose} >
                       <img src={closeImg} alt=" close Image" style={{ width:"40px" , height:"40px" }}   />
                   </button>
               </Modal>
           </div>

       </section>
    );
}