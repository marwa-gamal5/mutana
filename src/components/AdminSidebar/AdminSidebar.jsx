

import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import './AdminSidebr.css';


import { useSelector } from "react-redux";

import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import homeImg from '../../assets/sidebar/home (5) 1.webp';
import usersImg from '../../assets/sidebar/users.webp';
import coustImg from '../../assets/sidebar/customers.webp';
import vendorImg from '../../assets/sidebar/vendor.webp';
import storeImg from '../../assets/sidebar/store.webp'
import categoryImg from '../../assets/sidebar/categories.webp'
import productImg from '../../assets/sidebar/product 1.webp'
import  productsImg from '../../assets/sidebar/products.webp'
import ordersImg from '../../assets/sidebar/orders.webp'
import shippingImg from '../../assets/sidebar/shipping.webp'
import notificationImg from '../../assets/sidebar/notification 1.webp'

import permissionImg from '../../assets/sidebar/permission.webp'
function AdminSidebar({isOpen, onClose}){


console.log("is open propss",isOpen, onClose)
    const handleClose = () => {
        onClose();
        console.log("close ", onClose)
    };
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    // const [isActive, setActive] = useState("false");
    // const ToggleClass = () => {
    //     setActive(!isActive);
    // };

    const [isActive, setActive] = useState("false");
    const [isHidden, setHidden] = useState("false");
    const ToggleClass = () => {
        setActive(!isActive);
        var cookieName = "myCookie";
        var cookieValue = !isActive;

        document.cookie = cookieName + "=" + cookieValue + "; expires=Thu, 18 May 2023 12:00:00 UTC; path=/";

        localStorage.setItem("toggleClass", !isActive)
        
    };
    const ToggleClass2 = () => {

        setHidden(!isHidden);
    };


    useEffect(() => {



    }, []);

    return (
        <div  className={`sidebar ${isOpen ? 'open' : 'closed'}  d-lg-block d-none`}>

            <div className={`side-bar  ${isActive ? " " : "opened"}`}>

                {/* <button type="button" className="btn side-bar__btn-toggler d-block d-lg-none" onClick={ToggleClass}>
                    <i className="fa fa-angle-right open font-weight-bold" aria-hidden="true"></i>
                    <i className="fa fa-times close" aria-hidden="true"></i>
                </button> */}

                <div>
                    <Link className="page-section-link w-100 text-decoration-none   side-bar-cont text-start">


                        {/*<h1 className=" fw-bold text-start  ms-1 title">Elbaraka</h1>*/}
                        {/*<button className="close-button"  onClick={(e)=>{*/}
                        {/*    e.preventDefault()*/}
                        {/*    handleClose()*/}
                        {/*}}>*/}
                        {/*    Close*/}
                        {/*</button>*/}
                    </Link>
                    <ul className="side-bar__items list-unstyled">
                        <li className=" text-center w-100 ">

                        </li>

                        <li className="side-bar__item side__item--menu terms ">
                            <Link to="/home" className="page-section-link">
                                <img src={homeImg} width={18} height={18} alt=""/>
                              
                                <span className="side-bar__item--text">Home</span>
                            </Link>
                        </li>
                        <li className="side-bar__item side__item--menu terms ">
                            <Link to="/users" className="page-section-link">
                            <img src={usersImg} width={18} height={18} alt=""/>

                                <span className="side-bar__item--text">Users</span>
                            </Link>
                        </li>
                        <li className="side-bar__item side__item--menu terms  "
                        >
                            {/*<Link className="page-section-link drop" onClick={() => setOpen1(!open1)}*/}
                            {/*    aria-controls="example-collapse-text"*/}
                            {/*    aria-expanded={open1}>*/}

                            {/*    <img src={coustImg} width={18} height={18} alt=""/>*/}

                            {/*    <span className="side-bar__item--text">Customers</span>*/}
                            {/*</Link>*/}

                            {/*<Collapse in={open1}>*/}
                            {/*    <div id="example-collapse-text">*/}
                            {/*        <li className="side-bar__item side__item--menu ps-2 ">*/}
                            {/*            <Link to="/newusers" className="page-section-link chiled-item">*/}


                            {/*                */}
                            {/*                <span className="side-bar__item--text">New Users</span>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*        <li className="side-bar__item side__item--menu ps-2 ">*/}
                            {/*            <Link to="/approvedusers" className="page-section-link chiled-item ">*/}



                            {/*                <span className="side-bar__item--text">Approved Users</span>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*        <li className="side-bar__item side__item--menu ps-2 ">*/}
                            {/*            <Link to="/blockedusers" className="page-section-link chiled-item">*/}



                            {/*                <span className="side-bar__item--text">Blocked Users</span>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*    </div>*/}
                            {/*</Collapse>*/}
                            {/* <Link  className="page-section-link" onClick={ToggleClass2}>

                                <i class=" side-bar__item--icon   fs-2 fa-solid fa-sheet-plastic"></i>

                                <span className="side-bar__item--text">Plans</span>
                            </Link>
                            <div className={` nav-link  list-unstyled  list_data ${isHidden ? "hidden" : "null"}`}>
                                <li className="side-bar__item side__item--menu ps-2 ">
                                    <Link to="/plane" className="page-section-link">
                                 
                                        <i class=" side-bar__item--icon   fs-2 bi bi-person-vcard"></i>

                                        <span className="side-bar__item--text">User Plans</span>
                                    </Link>
                                </li>
                                <li className="side-bar__item side__item--menu ps-2 ">
                                    <Link to="/orgplane" className="page-section-link">

                                        <i class=" side-bar__item--icon   fs-2 bi bi-building-check"></i>

                                        <span className="side-bar__item--text">Organization Plans</span>
                                    </Link>
                                </li>


                            </div> */}

                        </li>
                        <li className="side-bar__item side__item--menu terms ">
                            <Link to="/newAddVendor" className="page-section-link">
                            <img src={vendorImg} width={18} height={18} alt=""/>

                                <span className="side-bar__item--text">Vendors</span>
                            </Link>
                        </li>
                        <li className="side-bar__item side__item--menu terms ">
                            <Link to="/store" className="page-section-link">

                            <img src={storeImg} width={18} height={18} alt=""/>

                                <span className="side-bar__item--text">Store</span>
                            </Link>
                        </li>
                        <li className="side-bar__item side__item--menu terms ">
                            <Link to="/categories" className="page-section-link">


                                <img src={categoryImg} width={18} height={18} alt=""/>
                                <span className="side-bar__item--text">Categories</span>
                            </Link>
                        </li>
                        <li className="side-bar__item side__item--menu terms ">
                            <Link to="/product" className="page-section-link">


                                <img src={productsImg} width={18} height={18} alt=""/>
                                <span className="side-bar__item--text">Products</span>
                            </Link>
                        </li>
                        <li className="side-bar__item side__item--menu terms  "
                        >
                            {/*<Link className="page-section-link drop" onClick={() => setOpen(!open)}*/}
                            {/*    aria-controls="example-collapse-text"*/}
                            {/*    aria-expanded={open}>*/}
                            {/*    */}
                            {/*    <img src={productImg} width={18} height={18} alt=""/>*/}
                            {/*    <span className="side-bar__item--text">Products</span>*/}
                            {/*</Link>*/}

                            {/*<Collapse in={open}>*/}
                            {/*    <div id="example-collapse-text">*/}
                            {/*        <li className="side-bar__item side__item--menu ps-2 ">*/}
                            {/*            <Link to="/plane" className="page-section-link chiled-item">*/}

                            {/*              */}
                            {/*                <img src={categoryImg} width={18} height={18} alt=""/>*/}
                            {/*                <span className="side-bar__item--text">Categories</span>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*        <li className="side-bar__item side__item--menu ps-2 ">*/}
                            {/*            <Link to="/product" className="page-section-link chiled-item">*/}

                            {/*               */}

                            {/*                <span className="side-bar__item--text">Product</span>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*        <li className="side-bar__item side__item--menu ps-2 ">*/}
                            {/*            <Link to="/orgplane" className="page-section-link chiled-item">*/}

                            {/*                <span className="side-bar__item--text">Size</span>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*    </div>*/}
                            {/*</Collapse>*/}


                        </li>
                        <li className="side-bar__item side__item--menu terms ">
                            <Link to="/permission" className="page-section-link">
                                <img src={permissionImg} width={18} height={18} alt=""/>
                                <span className="side-bar__item--text">Permission</span>
                            </Link>
                        </li>
                        <li className="side-bar__item side__item--menu terms ">
                            <Link to="/permission" className="page-section-link">

                                <span className="side-bar__item--text">Discount</span>
                            </Link>
                        </li>
                        <li className="side-bar__item side__item--menu terms ">
                            <Link to="/shipping" className="page-section-link">
                                <img src={shippingImg} width={18} height={18} alt=""/>
                                <span className="side-bar__item--text">Shipping</span>
                            </Link>
                        </li>
                        <li className="side-bar__item side__item--menu terms ">
                            <Link to="/permission" className="page-section-link">


                                <span className="side-bar__item--text">Payments</span>
                            </Link>
                        </li>
                        <li className="side-bar__item side__item--menu terms ">
                            <Link to="/permission" className="page-section-link">


                                <span className="side-bar__item--text">Walets</span>
                            </Link>
                        </li>
                        <li className="side-bar__item side__item--menu terms ">
                            <Link to="/orders" className="page-section-link">
                                <img src={ordersImg} width={18} height={18} alt=""/>

                                <span className="side-bar__item--text">Orders</span>
                            </Link>
                        </li>
                        <li className="side-bar__item side__item--menu terms ">
                            <Link to="/notification" className="page-section-link">
                                <img src={notificationImg} width={18} height={18} alt=""/>

                                <span className="side-bar__item--text">Notification</span>
                            </Link>
                        </li>
                        <li className="side-bar__item side__item--menu terms ">
                            <Link to="/permission" className="page-section-link">


                                <span className="side-bar__item--text">Transactions</span>
                            </Link>
                        </li>
                        <li className="side-bar__item side__item--menu terms ">
                            <Link to="/permission" className="page-section-link">


                                <span className="side-bar__item--text">Transactions</span>
                            </Link>
                        </li>
                        <li className="side-bar__item side__item--menu terms ">
                            <Link to="/permission" className="page-section-link">


                                <span className="side-bar__item--text">Refounds</span>
                            </Link>
                        </li>
                        <li className="side-bar__item side__item--menu terms ">
                            <Link to="/permission" className="page-section-link">



                                <span className="side-bar__item--text">Returns</span>
                            </Link>
                        </li>
                        {/*
                            <Link to="/cities" className="page-section-link">
                               
                                <i className="side-bar__item--icon   fs-2 fa-solid fa-city"></i>
                                <span className="side-bar__item--text"> Cities</span>
                            </Link>
                        </li>

                        <li className="side-bar__item side__item--menu">
                            <Link to="/offers" className="page-section-link">
                            
                            <i className="side-bar__item--icon   fs-2 bi bi-building-gear"></i>
                               
                                <span className="side-bar__item--text">Offers</span>
                            </Link>
                        </li>
                        <li className="side-bar__item side__item--menu terms ">
                            <Link to="/speaciality" className="page-section-link">
                          
                            <i class="side-bar__item--icon   fs-2 fa-solid fa-building-user"></i>
                                <span className="side-bar__item--text">Speciality</span>
                            </Link>
                        </li> */}

                    </ul>


                </div>
            </div>
        </div>

    )

}

export default AdminSidebar;