
import * as React from 'react';
import { Link } from 'react-router-dom';
import style from './Navbar.module.css';
import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
// import imgLogo from "../../img/logovalue.webp";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import cookies from 'js-cookie'
import classNames from 'classnames'
import { useDispatch, useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import chatImg from '../../img/chat (1) 1.png';
// import langImg from '../../img/internet 1.png';
// import searchImg from '../../img/search.png';
  import changeWebTrans from '../../store/Actions/webTrans';
import axiosInstance from '../../axiosConfig/instanse';

import changeLangList from '../../store/Actions/langlist';
import changeLanguage from '../../store/Actions/language';
import logo from '../../assets/baraka-logo.webp';
import langImg from '../../assets/language.webp';
import searchImg from '../../assets/search.webp'
import userImg from '../../assets/profile (2).webp'
function NavBar() {


  const [language, setLanguage] = useState([]);

  const [userImg, setUserImg] = useState("");

// //   dispatch(lang(currentLanguageCode));
//   const valueurl = useSelector((state) => state.valueurl);

//   const listLang = useSelector((state) => state.listlang);
const [navitems, setNavitems] = useState({
  signin: "d-block",
  signout: "d-none",
  welcome: "d-block",
  admin:"d-none",
});

const navigate = useNavigate();

const userinfo =   useSelector(state=>state.userinfo.userinfo);


const userinfoooo = localStorage.getItem("user_info");


const user_info = JSON.parse(userinfoooo)




// console.log("user_info", user_info)

// console.log("userinfo",userinfo)
const base64ToArrayBuffer = base64 => {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};


  let token = localStorage.getItem('token');
  console.log("token", token)



  async function logout() {
    console.log("token in fun", token)
    await axiosInstance.post(`/user/logout/`, {
      token: token,
    },{
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json"

    }
      }
    ).then(res => {
      if (res.data.success) {

        navigate('/', { replace: true });
        localStorage.removeItem('token');
        localStorage.removeItem('user_info');
        // dispatch(isload(false));
        // dispatch(isAuth({}));
      }else{
        if (res.data.error == "too_many_requests") {
        //   dispatch(error_many(true));
          navigate("/", {replace: true});
        }
      }

    }).catch(error => {
      console.log(error);
      if(error.message === "Request failed with status code 403"){
        navigate('/', { replace: true });
        localStorage.removeItem('token');
      }
    });
  }


  const currentLanguageCode = useSelector((state) => state.language.lang);
  const dispatch = useDispatch();

  const listRef = React.useRef({});
  listRef.current = useSelector((state) => state.webList);
//   const GlobeIcon = ({ width = 24, height = 24 }) => (
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width={width}
//         height={height}
//         fill="currentColor"
//         className="bi bi-globe d-inline"
//         viewBox="0 0 16 16" >

//         <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
//     </svg>
// )


useEffect(() => {

  const fetchData = async () => {
      try {
          const response = await axios.post(`http://192.168.11.100:8015/user/langList`);
          console.log("response: " , response)
          setLanguage(response.data.languages);
           dispatch(changeLangList(response.data.languages))
          dispatch(changeWebTrans(currentLanguageCode));

          if (currentLanguageCode) {
              const currentLanguage = response.data.languages.find(
                  (l) => l.code === currentLanguageCode
              );

              if (currentLanguage.rtl == false) {
                  document.body.dir = 'ltr';
              } else {
                  document.body.dir = 'rtl';
              }
          }
      } catch (error) {
          console.log(error);
      }
  };

  fetchData();
}, [currentLanguageCode]);
//   async function check() {
//     axios.post(`${valueurl}/user/check/`,
//       {
//         token: token
//       }).then(res => {
//         if (res.data.name) {
//           dispatch(isAuth(res.data));
//           dispatch(isload(true));
//           dispatch(istest(true));
//         } else {
//           navigate('/', { replace: true });
//           localStorage.removeItem("token")
//           dispatch(isAuth({}));
//           dispatch(isload(false));
//           dispatch(istest(false));
//         }

//         if (res.data.error == "too_many_requests") {
//           dispatch(error_many(true));
//           navigate("/", {replace: true});
//         }


//       }).catch(err => {
//         // console.log(err);
//       })
//   }




 




useEffect(() => {
    if (token) {
      // check();
      setNavitems({
        ...navitems,
        signin: "d-none",
        signout: "d-block",
        welcome: "d-block",
      });
   if(user_info){
    if(user_info.usertype === "Super_user"){
      setNavitems({
        ...navitems,
        signin: "d-none",
        signout: "d-block",
        welcome: "d-block",
        admin: "d-block",
      });
    }
  }else{
    setNavitems({
      ...navitems,
      signin: "d-block",
      signout: "d-none",
      welcome: "d-block",
      admin:"d-none"
    });
  }
   }else{
    setNavitems({
      ...navitems,
      signin: "d-block",
      signout: "d-none",
      welcome: "d-none",
    });
   }
 

    // if (user.error) {
    //   setNavitems({
    //     ...navitems,
    //     signin: "d-block",
    //     signout: "d-none",
    //   })
    //   navigate("/home");
    // }

  
    if(user_info){
      const imageUrl = URL.createObjectURL(
        new Blob([base64ToArrayBuffer(user_info.user_img)], { type: 'image/jpeg' })
      );
  
      setUserImg(imageUrl)
    }
  }, [token]);

  return (
    <>
  
   <Navbar bg="light" expand="lg" fixed='top'  style={{background: "#FFFFFF",borderBottom: "2px solid #E7E7E7"}}>
      {/* <Container className='w-100' style={{maxWidth:"1400px !important"}}> */}
          {/* <div class="search-container">
            <input type="text" placeholder='Search...'/>
            <i class="fa fa-search"></i>
          
          </div> */}
      
      <Navbar.Brand href="#home" className='ms-5'>
        <img src={logo} width={72} height={72} alt=""/>
      </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className=' justify-content-end me-5'>
                <Nav id="mainBtns" className='flex-row'>
            
                
            <Nav.Link className={`  nav-link   text-capitalize  fw-bold   ${navitems.admin}  mt-2`} as={Link} to="/adminhome" style={{color:'#00517D'}}><i className="fa-solid fa-toolbox fs-4"></i></Nav.Link>
            <Nav.Link className={`  nav-link btn  text-capitalize  fw-bold ${style.btnMainLogin} ${navitems.signin}`} as={Link} to="/login">Login</Nav.Link>
            <Nav.Link className={`  nav-link btn  text-capitalize  fw-bold ${style.btnMainRegister} ${navitems.signin} ms-3`} as={Link} to="/register">Register</Nav.Link>
            <Nav.Link className={`  nav-link btn  text-capitalize  fw-bold  ms-3`} as={Link} to="">
              <img src={searchImg} className='mt-2' alt="" width={24} height={24} />
            </Nav.Link>
            <Dropdown>
                              <Dropdown.Toggle variant="transparent" id="dropdown-basic" className='mt-2'>
                                  {/* <GlobeIcon /> */}
                                  <img src={langImg} width={22} height={22} alt=""/>
                              </Dropdown.Toggle>


                              <Dropdown.Menu>
                                  <Dropdown.Item>
                                      <span className="dropdown-item-text">language</span>
                                  </Dropdown.Item>

                                  {language.map(({ code, name }, index) => (
                                      <Dropdown.Item key={index}
                                          className={classNames('dropdown-item', {
                                              disabled: currentLanguageCode === code,
                                          })}
                                          onClick={() => {
                                              // dispatch(getLanguage(code));
                                              dispatch(changeLanguage(code))
                                              dispatch(changeWebTrans(code));
                                          }}>
                                          {name}
                                      </Dropdown.Item>
                                  ))}
                              </Dropdown.Menu>
                          </Dropdown>
            <Dropdown className={"d-flex drop-user  align-items-center mt-2 " + navitems.signout}>

        <Dropdown.Toggle name='lang' variant="transparent" id="dropdown-basic" className={`text-white d-flex align-items-center dropnav testPad  ${navitems.signout}`}>

        <img className={"rounded-circle mx-2 " + navitems.signout} src={userImg} alt="" width={22} height={22} />
        <p className={"text-end   mb-0 " + navitems.signout} style={{color:'#134A04'}}>{user_info ? user_info.username : ''} &nbsp;  </p>

        </Dropdown.Toggle>

        <Dropdown.Menu className='my-2 '>
        <Dropdown.Item  to="/userprofile" as={Link}>Profile</Dropdown.Item>

        <Dropdown.Item onClick={() => {

        logout();
        }}>logout</Dropdown.Item>
        </Dropdown.Menu>
            </Dropdown>
            {/* <Nav.Link className={`  nav-link btn  text-capitalize  fw-bold ${style.btnMainRegister} ${navitems.signout} ms-3`} as={Link} onClick={() => {
              logout();
            }}>Logout</Nav.Link> */}
                </Nav>
        </Navbar.Collapse>
     
      {/* </Container> */}
    </Navbar>
 
      {/* <Navbar  className='py-2'fixed='top' expand="lg" bg='light'>
        <Container>
      

          <div className=''>
          <div class="search-container">
            <input type="text" placeholder='Search...'/>
            <i class="fa fa-search"></i>
          
          </div>
  
          </div>
          <Nav id="mainBtns" className='flex-row'>
     
         
            <Nav.Link className={`  nav-link   text-capitalize  fw-bold   ${navitems.admin}  mt-2`} as={Link} to="/adminhome" style={{color:'#00517D'}}><i className="fa-solid fa-toolbox fs-4"></i></Nav.Link>
            <Nav.Link className={`  nav-link btn  text-capitalize  fw-bold ${style.btnMainLogin} ${navitems.signin}`} as={Link} to="/login">Login</Nav.Link>
            <Nav.Link className={`  nav-link btn  text-capitalize  fw-bold ${style.btnMainRegister} ${navitems.signin} ms-3`} as={Link} to="/register">Register</Nav.Link>
            <Nav.Link className={`  nav-link btn  text-capitalize  fw-bold  ms-3`} as={Link} to="">
          
            </Nav.Link>
            <Dropdown>
                              <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                                  <GlobeIcon />
                              </Dropdown.Toggle>


                              <Dropdown.Menu>
                                  <Dropdown.Item>
                                      <span className="dropdown-item-text">language</span>
                                  </Dropdown.Item>

                                  {language.map(({ code, name }, index) => (
                                      <Dropdown.Item key={index}
                                          className={classNames('dropdown-item', {
                                              disabled: currentLanguageCode === code,
                                          })}
                                          onClick={() => {
                                                dispatch(changeLanguage(code))
                                              dispatch(changeWebTrans(code));
                                          }}>
                                          {name}
                                      </Dropdown.Item>
                                  ))}
                              </Dropdown.Menu>
                          </Dropdown>
            <Dropdown className={"d-flex drop-user  align-items-center  " + navitems.signout}>

<Dropdown.Toggle name='lang' variant="transparent" id="dropdown-basic" className={`text-white d-flex align-items-center dropnav testPad  ${navitems.signout}`}>

 
  <p className={"text-end   mb-0 " + navitems.signout} style={{color:'#00517D'}}>{user_info ? user_info.username : ''} &nbsp;  </p>

</Dropdown.Toggle>

<Dropdown.Menu className='my-2 '>
  <Dropdown.Item  to="/userprofile" as={Link}>Profile</Dropdown.Item>

  <Dropdown.Item onClick={() => {

    logout();
  }}>logout</Dropdown.Item>
</Dropdown.Menu>
            </Dropdown>
           
          </Nav>

        </Container>
      </Navbar> */}
    </>
  )

}
export default NavBar;
// import * as React from 'react';
// import { NavLink , Link } from 'react-router-dom';
// import  style  from './Navbar.module.css';
// import imgNavbar from "../../img/nav-Icon.png";
// import { useState , setState, useEffect } from 'react';
// import Dropdown from 'react-bootstrap/Dropdown';

// function Navbar(){


//     const [open, setOpen] = useState([]);
  
//     let token= localStorage.getItem('token');

//     const handleOpen = () => {
//         setOpen(!open);
//       };

//     if(token){
//         return(
        
//             <nav className={`${style.myNav} navbar navbar-expand-lg navbar-light `}>
//                 <div className="container">
//                     <NavLink className="navbar-brand"  to="/dashboard">
//                         {/* <img className="" width={"70px"} height={"55px"} src={imgNavbar}  alt="" /> */}
//                         ADL
//                     </NavLink>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
//                             data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
//                             aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className={`${style.myNavbar} navbar-nav ms-auto mb-2 mb-lg-0`}>
//                         {/* <li className="nav-item active">
//                             <NavLink className={`${style.navLink} nav-link active`} aria-current="page" to="/Home" >Home</NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink className={`${style.navLink} nav-link `} >About</NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink className={`${style.navLink} nav-link `} >Services</NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink className="nav-link" >contact</NavLink>
//                         </li> */}
    
//                     </ul>
//                     <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                   
                      
    
//                                 {/* <li class="nav-item">
//                                 <NavLink className={`${style.btnMainLogin} nav-link btn  me-3`} to="/login"> Login</NavLink>
//                             </li>
    
                           
    
//                                 <li class="nav-item">
//                                     <NavLink  className={`${style.btnMainRegister} nav-link btn  me-3`} to="/register"> Register</NavLink>
//                                 </li> */}
    
//                     </ul>

//                     {/* <div className={`${style.dropdown}`}>
//                         <button onClick={handleOpen}>Dropdown</button>
//                         {open ? (
//                             <ul className={`${style.menu}`}>
//                             <li className={`${style.menu_item}`}>
//                                 <button>Menu 1</button>
//                             </li>
//                             <li className={`${style.menu_item}`}>
//                                 <button>Menu 2</button>
//                             </li>
//                             </ul>
//                         ) : null}
//                         {open ? <div>Is Open</div> : <div className='d-none'>Is Closed</div>}
//                     </div> */}
//                         <Dropdown>
//                             <Dropdown.Toggle variant="transparent" id="dropdown-basic" className='text-white'>
//                                 User
//                             </Dropdown.Toggle>

//                             <Dropdown.Menu className='my-2'>
//                                 <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//                                 <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//                                 <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//                             </Dropdown.Menu>
//                          </Dropdown>

                                
//                     {/* <div className="account-wrap">
//                         <div className="account-item account-item--style2 clearfix js-item-menu">
//                             <div className="content">
//                                 <Link className="js-acc-btn" to="#">user</Link>
//                             </div>
//                             <div className="account-dropdown js-dropdown">
//                                 <div className="account-dropdown__body">
//                                     <div className="account-dropdown__item">
//                                         <Link to="{{ route('profile.show',Auth::user()->id) }}">
//                                             <i className="zmdi zmdi-account"></i>Profile</Link>
//                                     </div>
                                    
//                                         <div className="account-dropdown__item">
//                                             <Link to="{{ route('users.index') }}">
//                                                 <i className="zmdi zmdi-settings"></i>Users</Link>
//                                         </div>
                                        
                                    
//                                         <div className="account-dropdown__item">
//                                             <Link to="{{ route('roles.index') }}">
//                                                 <i className="zmdi zmdi-money-box"></i>Roles</Link>
//                                         </div>
                                        
//                                     </div>
//                                     <div className="account-dropdown__footer">
//                                         <Link to="{{ route('logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();" className="nav-link nav_link_sub_css">
//                                         <i className="zmdi zmdi-power"></i>Logout
//                                         </Link>
//                                         <form id="logout-form" action="{{ route('logout') }}" method="POST" className="d-none">
                                        
//                                         </form>
//                                     </div>
//                             </div>
//                         </div>
//                      </div> */}
//                 </div>
//             </div>
    
//         </nav>
//         )

//     }else{
//         return(
        
//             <nav className={`${style.myNav} navbar navbar-expand-lg navbar-dark bg-dark  `}>
//                 <div className="container">
//                     <NavLink className={`${style.navBrand} navbar-brand`}  to="/dashboard">
//                                <h1>ADL</h1> 
//                     </NavLink>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
//                             data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
//                             aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className={` ${style.myNavbar} collapse navbar-collapse`} id="navbarSupportedContent">
//                     <ul className={` navbar-nav ms-auto mb-2 mb-lg-0 `}>
//                        <li className={`nav-item`}>
//                             <NavLink className={`${style.navLink} nav-link active`} aria-current="page" to="#">Home</NavLink>
//                        </li>
//                         <li className="nav-item dropdown">
//                             <NavLink className={`${style.navLink} nav-link dropdown-toggle`} to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                 services
//                             </NavLink>
//                             <ul className="dropdown-menu">
//                                 <li><NavLink className="dropdown-item" to="#">Action</NavLink></li>
//                                 <li><NavLink className="dropdown-item" to="#">Another action</NavLink></li>
//                                 <li><hr className="dropdown-divider"/></li>
//                                 <li><NavLink className="dropdown-item" to="#">Something else here</NavLink></li>
//                             </ul>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink className={`${style.navLink} nav-link `} aria-current="page" to="#">OCR Pricing</NavLink>
//                        </li>
//                         <li className="nav-item">
//                             <NavLink className={`${style.navLink} nav-link `} aria-current="page" to="#">issues</NavLink>
//                        </li>
//                         <li className="nav-item">
//                             <NavLink className={`${style.navLink} nav-link `} aria-current="page" to="#">Help</NavLink>
//                        </li>
                                        
    
//                     </ul>
//                     <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//                             <li className="nav-item">
//                                 <NavLink className={`${style.btnMainLogin} nav-link btn  me-3 mb-3`} to="/login"> Login</NavLink>
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink  className={`${style.btnMainRegister} nav-link btn  me-3 mb-4`} to="/register"> Register</NavLink>
//                             </li>
//                             <Dropdown>
//                             <Dropdown.Toggle variant="transparent" id="dropdown-basic" className='text-white'>
//                                 User
//                             </Dropdown.Toggle>

//                             <Dropdown.Menu className='my-2'>
//                                 <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//                                 <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//                                 <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//                             </Dropdown.Menu>
//                          </Dropdown>
//                     </ul>
//                 </div>
//             </div>
    
//         </nav>
        
//         )
//     }
    
// }


// export default Navbar;