import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactLoading from "react-loading";
import Footer from './components/Footer/Footer';
import NavBar from './components/Navbar/NavBar';
import Login from './components/Login/Login';
import Reset from './components/Reset/Reset';
import Forget from './components/Forget/Forget';
import Sidebar from './components/AdminSidebar/AdminSidebar';
import { useSelector } from 'react-redux';
import PrivateRoutes from './utils/PrivateRoutes';

const LazyHome = React.lazy(() => import('./pages/Home/Home'));
const LazyUsers = React.lazy(() => import('./pages/Users/Users/Users'));
const LazyViewUser = React.lazy(() => import('./pages/Users/ViewUser/ViewUser'));
const LazyPermission = React.lazy(() => import('./pages/Permissions/Permission/Permission'));
const LazyEditUser = React.lazy(() => import('./pages/Users/EditUser/EditUser'));
const LazyVendors = React.lazy(() => import('./pages/Vendors/Vendors/Vendors'));
const LazyAddVendor = React.lazy(() => import('./pages/Vendors/AddVendors/AddVendors'));
const LazyNewAddVendor = React.lazy(() => import('./pages/Vendors/AddVendors/NewAddVendor'));
const LazyEditVendor = React.lazy(() => import('./pages/Vendors/EditVendors/EditVendors'));
const LazyStore = React.lazy(() => import('./pages/Store/Store/Store'));
const LazyNewStore = React.lazy(() => import('./pages/Store/Store/NewStore'));
const LazyAddStore = React.lazy(() => import('./pages/Store/AddStore/AddStore'));
const LazyEditStore = React.lazy(() => import('./pages/Store/EditStore/EditStore'));
const LazyCategory = React.lazy(() => import('./pages/Categories/Category/Category'));
const LazyProduct = React.lazy(() => import('./pages/Products/Product/Product'));
const LazyAddProduct = React.lazy(() => import('./pages/Products/AddProduct/AddProduct'));
const LazyEditProduct = React.lazy(() => import('./pages/Products/EditProduct/EditProduct'));
const LazyViewProduct = React.lazy(() => import('./pages/Products/ViewProduct/ViewProduct'));
const LazyDropzone = React.lazy(() => import('./pages/Products/Dropzone/Dropzone'));
const LazyCrop = React.lazy(() => import('./pages/Products/CropImage/CropImage'));
const LazyProfile = React.lazy(() => import('./pages/Users/profile/Profile'));
const LazyShipping = React.lazy(() => import('./pages/Shipping/Shipping'));
const LazyOrder = React.lazy(() => import('./pages/Order/Order/Order'));
const LazyNote = React.lazy(() => import('./pages/Notification/Notification'));
function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
    };

    console.log('isSidebarOpen:', isSidebarOpen);
    console.log('toggleSidebar:', toggleSidebar);

    const urls = useSelector((state) => state.whitelist.whitelist);
    const loadingMarkup = (
        <div className='d-flex justify-content-center align-items-center ' style={{ height: "100vh" }}>
            <div>
                <ReactLoading type="spin" color="#00537f" height={100} width={50} />
            </div>
        </div>
    );

    return (
        <>
            <Router>
                <div className="app">
                    <NavBar />
                    <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar}/>
                    <div className={`content ${isSidebarOpen ? 'wide' : 'narrow'}`}>
                        <Routes>
                            <Route element={<PrivateRoutes />}>
                                <Route
                                    exact
                                    path="/"
                                    element={
                                        <React.Suspense fallback={loadingMarkup}>
                                            <LazyHome />
                                        </React.Suspense>
                                    }
                                />

                                <Route exact path="/users" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyUsers />
                                    </React.Suspense>
                                } />

                                <Route exact path="/newusers" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyUsers />
                                    </React.Suspense>
                                } />
                                <Route exact path="/approvedusers" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyUsers />
                                    </React.Suspense>
                                } />
                                <Route exact path="/blockedusers" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyUsers />
                                    </React.Suspense>
                                } />
                                <Route exact path="/home" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyHome />
                                    </React.Suspense>
                                } />



                                <Route exact path="/viewuser/:id" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyViewUser />
                                    </React.Suspense>
                                } />
                                <Route exact path="/edituser" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyEditUser />
                                    </React.Suspense>
                                } />

                                <Route exact path="/permission" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyPermission />
                                    </React.Suspense>
                                } />
                                <Route exact path="/vendors" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyVendors />
                                    </React.Suspense>
                                } />
                                <Route exact path="/addVendor" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyAddVendor />
                                    </React.Suspense>
                                } />
                                    <Route exact path="/newAddVendor" element={
                                                <React.Suspense fallback={loadingMarkup}>
                                                    <LazyNewAddVendor />
                                                </React.Suspense>
                                            } />

                                <Route exact path="/editvendor/:id" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyEditVendor />
                                    </React.Suspense>


                                } />
                                <Route exact path="/store" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyStore />
                                    </React.Suspense>
                                } />     <Route exact path="/newStore" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyNewStore />
                                    </React.Suspense>
                                } />
                                <Route exact path="/addstore" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyAddStore />
                                    </React.Suspense>
                                } />

                                <Route exact path="/editstore/:id" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyEditStore />
                                    </React.Suspense>


                                } />


                                <Route exact path="/categories" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyCategory />
                                    </React.Suspense>


                                } />
                                <Route exact path="/product" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyProduct />
                                    </React.Suspense>
                                } />
                                <Route exact path="/addproduct" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyAddProduct />
                                    </React.Suspense>
                                } />
                                <Route exact path="/editproduct/:id" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyEditProduct />
                                    </React.Suspense>
                                } />
                                <Route exact path="/viewproduct/:id" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyViewProduct />
                                    </React.Suspense>
                                } />
                                <Route exact path="/dropzone" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyDropzone />
                                    </React.Suspense>
                                } />
                                <Route exact path="/crop" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyCrop />
                                    </React.Suspense>
                                } />
                                <Route exact path="/shipping" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyShipping />
                                    </React.Suspense>
                                } />
                                <Route exact path="/orders" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyOrder />
                                    </React.Suspense>
                                } />
                                <Route exact path="/notification" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyNote />
                                    </React.Suspense>
                                } />
                                <Route exact path="/profile/:id" element={
                                    <React.Suspense fallback={loadingMarkup}>
                                        <LazyProfile />
                                    </React.Suspense>
                                } />
                                {/* Add other routes */}
                            </Route>
                            <Route exact path="/login" element={<Login />} />
                            <Route exact path="/reset/:token" element={<Reset />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </>
    );
}

export default App;

// import React, { useState } from 'react';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
// import {BrowserRouter, BrowserRouter as Router, Route, Switch,Routes} from 'react-router-dom';
// import ReactLoading from "react-loading";
// import Footer from './components/Footer/Footer';
// import NavBar from './components/Navbar/NavBar';
// import Login from './components/Login/Login';
// import Reset from './components/Reset/Reset';
// import Forget from './components/Forget/Forget';
//
// import Sidebar from './components/AdminSidebar/AdminSidebar';
// import { useSelector } from 'react-redux';
// import PrivateRoutes from './utils/PrivateRoutes';
//
//
// const LazyHome = React.lazy(() => import('./pages/Home/Home'))
//
// const LazyUsers = React.lazy(() => import('./pages/Users/Users/Users'))
// // const LazyAdminHome = React.lazy(() => import('./pages/Home/Home'))
//
// const LazyViewUser = React.lazy(() => import('./pages/Users/ViewUser/ViewUser'))
//
// const LazyPermission = React.lazy(() => import('./pages/Permissions/Permission/Permission'))
// const LazyEditUser = React.lazy(() => import('./pages/Users/EditUser/EditUser'))
// const LazyVendors = React.lazy(() => import('./pages/Vendors/Vendors/Vendors'))
// const LazyAddVendor = React.lazy(() => import('./pages/Vendors/AddVendors/AddVendors'))
// const LazyEditVendor = React.lazy(() => import('./pages/Vendors/EditVendors/EditVendors'))
// const LazyStore = React.lazy(() => import('./pages/Store/Store/Store'))
// const LazyAddStore = React.lazy(() => import('./pages/Store/AddStore/AddStore'))
// const LazyEditStore = React.lazy(() => import('./pages/Store/EditStore/EditStore'))
// const LazyCategory = React.lazy(() => import('./pages/Categories/Category/Category'))
// const LazyProduct = React.lazy(() => import('./pages/Products/Product/Product'))
// const LazyAddProduct = React.lazy(() => import('./pages/Products/AddProduct/AddProduct'))
// const LazyEditProduct = React.lazy(() => import('./pages/Products/EditProduct/EditProduct'))
// const LazyViewProduct = React.lazy(() => import('./pages/Products/ViewProduct/ViewProduct'))
// const LazyDropzone = React.lazy(() => import('./pages/Products/Dropzone/Dropzone'))
// const LazyCrop = React.lazy(() => import('./pages/Products/CropImage/CropImage'))
// const LazyProfile = React.lazy(() => import('./pages/Users/profile/Profile'))
//
//
//
// const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//
// const toggleSidebar = () => {
//     setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
// };
// function App() {
//
//
//
//
//   const urls = useSelector((state) => state.whitelist.whitelist)
//   const loadingMarkup = (
//     <div className='d-flex justify-content-center align-items-center ' style={{ height: "100vh" }}>
//       <div>
//         <ReactLoading type="spin" color="#00537f"
//           height={100} width={50} />
//       </div>
//     </div>)
//   return ( <>
//
//
//           <BrowserRouter>
//               <div className="app">
//                   <NavBar/>
//                   <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
//                   <div className={`content ${isSidebarOpen ? 'wide' : 'narrow'}`}>
//                       <Routes>
//                           <Route element={<PrivateRoutes/>}>
//                               <Route exact path="/" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyHome />
//                                   </React.Suspense>
//                               } />
//
//
//
//                               <Route exact path="/users" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyUsers />
//                                   </React.Suspense>
//                               } />
//                               <Route exact path="/newusers" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyUsers />
//                                   </React.Suspense>
//                               } />
//                               <Route exact path="/approvedusers" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyUsers />
//                                   </React.Suspense>
//                               } />
//                               <Route exact path="/blockedusers" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyUsers />
//                                   </React.Suspense>
//                               } />
//                               <Route exact path="/home" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyHome />
//                                   </React.Suspense>
//                               } />
//
//
//
//                               <Route exact path="/viewuser/:id" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyViewUser />
//                                   </React.Suspense>
//                               } />
//                               <Route exact path="/edituser" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyEditUser />
//                                   </React.Suspense>
//                               } />
//
//                               <Route exact path="/permission" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyPermission />
//                                   </React.Suspense>
//                               } />
//                               <Route exact path="/vendors" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyVendors />
//                                   </React.Suspense>
//                               } />
//                               <Route exact path="/addVendor" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyAddVendor />
//                                   </React.Suspense>
//                               } />
//
//                               <Route exact path="/editvendor/:id" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyEditVendor />
//                                   </React.Suspense>
//
//
//                               } />
//                               <Route exact path="/store" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyStore />
//                                   </React.Suspense>
//                               } />
//                               <Route exact path="/addstore" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyAddStore />
//                                   </React.Suspense>
//                               } />
//
//                               <Route exact path="/editstore/:id" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyEditStore />
//                                   </React.Suspense>
//
//
//                               } />
//
//
//                               <Route exact path="/categories" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyCategory />
//                                   </React.Suspense>
//
//
//                               } />
//                               <Route exact path="/product" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyProduct />
//                                   </React.Suspense>
//                               } />
//                               <Route exact path="/addproduct" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyAddProduct />
//                                   </React.Suspense>
//                               } />
//                               <Route exact path="/editproduct/:id" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyEditProduct />
//                                   </React.Suspense>
//                               } />
//                               <Route exact path="/viewproduct/:id" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyViewProduct />
//                                   </React.Suspense>
//                               } />
//                               <Route exact path="/dropzone" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyDropzone />
//                                   </React.Suspense>
//                               } />
//                               <Route exact path="/crop" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyCrop />
//                                   </React.Suspense>
//                               } />
//                               <Route exact path="/profile/:id" element={
//                                   <React.Suspense fallback={loadingMarkup}>
//                                       <LazyProfile />
//                                   </React.Suspense>
//                               } />
//
//
//                           </Route>
//
//
//                           <Route exact path="/login" element={<Login/>} />
//
//
//                           <Route exact path="/reset/:token" element={<Reset />} />
//                       </Routes>
//                   </div>
//               </div>
//           </BrowserRouter>
//
//
//   </>
//
//   );
// }
//
// export default App;
//
//
//
//












// <BrowserRouter>
//
//     <NavBar/>
//
//     <Routes>
//
//         <Route element={<PrivateRoutes/>}>
//             <Route exact path="/" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyHome />
//                 </React.Suspense>
//             } />
//
//
//
//             <Route exact path="/users" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyUsers />
//                 </React.Suspense>
//             } />
//             <Route exact path="/newusers" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyUsers />
//                 </React.Suspense>
//             } />
//             <Route exact path="/approvedusers" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyUsers />
//                 </React.Suspense>
//             } />
//             <Route exact path="/blockedusers" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyUsers />
//                 </React.Suspense>
//             } />
//             <Route exact path="/home" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyHome />
//                 </React.Suspense>
//             } />
//
//
//
//             <Route exact path="/viewuser/:id" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyViewUser />
//                 </React.Suspense>
//             } />
//             <Route exact path="/edituser" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyEditUser />
//                 </React.Suspense>
//             } />
//
//             <Route exact path="/permission" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyPermission />
//                 </React.Suspense>
//             } />
//             <Route exact path="/vendors" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyVendors />
//                 </React.Suspense>
//             } />
//             <Route exact path="/addVendor" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyAddVendor />
//                 </React.Suspense>
//             } />
//
//             <Route exact path="/editvendor/:id" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyEditVendor />
//                 </React.Suspense>
//
//
//             } />
//             <Route exact path="/store" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyStore />
//                 </React.Suspense>
//             } />
//             <Route exact path="/addstore" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyAddStore />
//                 </React.Suspense>
//             } />
//
//             <Route exact path="/editstore/:id" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyEditStore />
//                 </React.Suspense>
//
//
//             } />
//
//
//             <Route exact path="/categories" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyCategory />
//                 </React.Suspense>
//
//
//             } />
//             <Route exact path="/product" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyProduct />
//                 </React.Suspense>
//             } />
//             <Route exact path="/addproduct" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyAddProduct />
//                 </React.Suspense>
//             } />
//             <Route exact path="/editproduct/:id" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyEditProduct />
//                 </React.Suspense>
//             } />
//             <Route exact path="/viewproduct/:id" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyViewProduct />
//                 </React.Suspense>
//             } />
//             <Route exact path="/dropzone" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyDropzone />
//                 </React.Suspense>
//             } />
//             <Route exact path="/crop" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyCrop />
//                 </React.Suspense>
//             } />
//             <Route exact path="/profile/:id" element={
//                 <React.Suspense fallback={loadingMarkup}>
//                     <LazyProfile />
//                 </React.Suspense>
//             } />
//
//
//         </Route>
//
//
//         <Route exact path="/login" element={<Login/>} />
//
//
{/*        <Route exact path="/reset/:token" element={<Reset />} />*/}



{/*    </Routes>*/}
{/*    <Footer/>*/}
{/*</BrowserRouter>*/}