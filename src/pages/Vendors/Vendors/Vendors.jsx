import React,{useState,useEffect,useRef} from 'react'

import Swal from "sweetalert2";
import axiosInstance from '../../../axiosConfig/instanse';

// import FixedNavbar from '../../../components/FixedNavbar/FixedNavbar'
import cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
// import { Sidebar } from 'semantic-ui-react';
import Sidebar from '../../../components/AdminSidebar/AdminSidebar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../../index.css'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from '@mui/material';

import imgCert from '../../../assets/product/certificate.webp'
import imgEdit from '../../../assets/product/edit.webp'
import imgView from '../../../assets/product/veiw.webp'
import imgDelete from '../../../assets/product/delete.webp'
import imgAdd from '../../../assets/product/add.webp'
import imgAddbtn from '../../../assets/add-button.webp'
import searchImg from '../../../assets/search.webp'
import {VendorValidation} from '../../../components/validation.js'
import {ref} from "yup";
export default function Vendors() {
    const [vendorValues, setValues]=useState({})
    const [errors, setErrors]=useState({})
    const [isAdd,setIsAdd] = useState(false)
    const inputRef = useRef(null);
    const inputRefName = useRef(null);
    const inputRefAddress = useRef(null);
    const inputRefDescription = useRef(null);
    const inputRefvendorNameAR = useRef(null);
    const inputRefvendorNameEN = useRef(null);
    const inputRefvendorAddressAR = useRef(null);
    const inputRefvendorAddressEN = useRef(null);
    const inputRefvendorDescriptionAR = useRef(null);
    const inputRefvendorDescriptionEN = useRef(null);
    const inputRefs = [inputRefName, inputRefAddress, inputRefDescription];
    const handleInput=(theName, theValue)=>{
        const newData ={...vendorValues,[theName]:theValue}
        setValues(newData)
        console.log(vendorValues,"sssssssssssss")
    }



    const validationFunction = ()=>{
        if(testModal==="add"){
            setErrors( VendorValidation(vendorValues))
            let allErrors =  VendorValidation(vendorValues)
            if(Object.keys(allErrors).length == 0){
                console.log(Object.keys(allErrors).length ,allErrors, "no errors ");
                    handleFormSubmit()
            }


        }else{
            const newData = {
                ...vendorValues,
                vendorName: inputRefName.current.value,
                vendorAddress: inputRefAddress.current.value,
                vendorDescription: inputRefDescription.current.value,
                vendorNameAR:inputRefvendorNameAR.current.value,
                vendorNameEN:inputRefvendorNameEN.current.value,
                vendorAddressAR:inputRefvendorAddressAR.current.value,
                vendorAddressEN:inputRefvendorAddressEN.current.value,
                vendorDescriptionAR:inputRefvendorDescriptionAR.current.value,
                vendorDescriptionEN:inputRefvendorDescriptionEN.current.value,
                // vendorDescription: inputRefDescreption.current.value,
            };
            setErrors( VendorValidation(newData))
            let allErrors =  VendorValidation(newData)
            if(Object.keys(allErrors).length == 0){
                console.log(Object.keys(allErrors).length ,allErrors, "no errors ");
                console.log("fromEditForm No errors")
                    handleFormEditSubmit()

            }
        }

        // setErrors( VendorValidation(vendorValues))
        // let allErrors =  VendorValidation(vendorValues)
        //
        // if(Object.keys(allErrors).length == 0){
        //     console.log(Object.keys(allErrors).length ,allErrors, "no errors ");
        //     if(testModal==="add"){
        //     handleFormSubmit()
        //     }else{
        //
        //         handleFormEditSubmit()
        //     }
        //     // setIsLoading(true)
        //
        //
        // }

        // console.log(Object.keys(allErrors).length ,allErrors, "qqqq" + " ");
    }







    const [Vendors,setVendors] = useState([]);
   const [name ,  setName] = useState([]);
   const [address ,  setAddress] = useState([]);
   const [description ,  setDescription] = useState([]);

   const [languageList , setLanguageList] = useState([]);
   const [stateError , setStateError] = useState(false);
 
   const langList =  useSelector(state=>state.langList.langList);
   const [searchTerm, setSearchTerm] = useState('');
   const [itemId, setItemId] = useState();
   const [addOrEdit, setAddOrEdit] = useState('')
   const [testModal, setTestModal] = useState('');
   const [funModal, setFunModal] = useState();
   const [showAdd, setShowAdd] = useState(false);
   const [showEdit, setShowEdit] = useState(false);
   /////////////// old data to edit form ///////////////
    const[currentVendorName , setCurrentVendorName] = useState('')
    const[currentVendorAdress , setCurrentVendorAdress] = useState('')
    const[currentVendorDesc , setCurrentVendorDesc] = useState('')
    const[currentVendorNameAR , setCurrentVendorNameAR] = useState('')
    const[currentVendorDescAR , setCurrentVendorDescAR] = useState('')
    const[currentVendorAdressAR , setCurrentVendorAdressAR] = useState('')
    const[currentVendorDescEN , setCurrentVendorDescEN] = useState('')
    const[currentVendorNameEN , setCurrentVendorNameEN] = useState('')
    const[currentVendorAdressEN , setCurrentVendorAdressEN] = useState('')




   function showAlert(message, icon) {
    Swal.fire({
      title: message,
      icon: icon,
      showConfirmButton: false,
      timer: 1500
    });
  }
   const handleClose = () => {
       setShowAdd(false)
       setShowEdit(false)
       setTestModal('')
       setName([])
       setAddress([])
     
   };
   const handleShowAdd = () => setShowAdd(true);
   const handleShowEdit = () => setShowEdit(true);

    let token = localStorage.getItem("token");


    const currentLanguageCode = useSelector((state) => state.language.lang);

   async function getVendors() {
    await axiosInstance.post(`store/view_all_vendors`,{
      token: token,
      lang:currentLanguageCode
    }).then(res => {
        console.log(res.data.success,"ttrtrttrtr")

      setVendors(res.data.success);
    }).catch(err =>{
      console.log(err);
    });
  }

  const handleFormSubmit = () => {

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
              showAlert(res.data.success, "success");
            }

          })

        }else{

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
        
          }
      }



  }).catch(err => {
    console.log("err t", err);
  });

}

  const fetchOneItem = async (id) => {

    await axiosInstance.post(`store/view_one_vendor`, {
      id: id,
      token: token,
      seller_id: 1
    }).then(res => {
console.log(res,"lllllllklklklkll")
        setCurrentVendorName(res.data.success.org_vendor.name)
        setCurrentVendorAdress(res.data.success.org_vendor.address)
        setCurrentVendorDesc(res.data.success.org_vendor.description)
      name[0] = res.data.success.org_vendor.name;
      address[0] = res.data.success.org_vendor.address;
      description[0] = res.data.success.org_vendor.description;
        console.log( description[0],"ddffddff")

      res.data.success.translations.map((ele, index) => {
        name[index + 1] = ele.name;
        address[index + 1] = ele.address;
        description[index+1] = ele.description;
          setCurrentVendorDescEN(description[2])
          setCurrentVendorAdressEN(address[0])
          setCurrentVendorDescAR(description[1])
          setCurrentVendorAdressAR(address[1])
          setCurrentVendorNameAR(name[1])
          setCurrentVendorNameEN(name[0])
        console.log( name[index],"ddffddff::::")
      })

      setName([...name]);
      setAddress([...address]);
      setDescription([...description]);

    }).catch(err => {
      console.log(err);
    });
  };



  const handleFormEditSubmit = (e) => {

    let { data } = axiosInstance.post(`store/update_vendor`,{
      token: token,
      id: itemId,
      name: name[0],
      address: address[0],
      description: description[1]

    }).then(res => {
console.log(res,description[0],"ddddddddddddssssssssssss")
        if(res.data.success){
          languageList.map((lang, index)=>{
            let langCode = lang.code ;
            let LangIndex = index + 1;

            if(stateError == false){

              editVendorsT(langCode , LangIndex);
                showAlert(res.data.success, "success");
            }
          });
        }else{

          showAlert(res.data.error, "error");
        }         
    }).catch(err => {
      console.log("err one", err);
    });
};


async function editVendorsT(langCode , LangIndex){
  let lang = langCode;
  let index = LangIndex;
  await axiosInstance.post(`store/update_vendor_T`,
      {
        token: token,
        id: itemId,
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
             
          }
      }

  }).catch(err => {
    console.log("err t", err);
  });

}


  useEffect(() => {

    const endpoint = window.location.pathname.split('/')[1];
    // setEndpoint(endpoint);
    // testUrl(endpoint);


    if (testModal === 'add') {
     setName([])
     setAddress([])
      handleShowAdd()
      setFunModal(true)
      setAddOrEdit('Add')
    } else if (testModal === 'edit') {

      fetchOneItem(itemId)

        handleShowEdit()
      setFunModal(false)
      setAddOrEdit('Edit')
    
    }
  }, [testModal, itemId]);

    useEffect(()=>{
      getVendors();
    }, [currentLanguageCode])


    function DeleteAlert(id){
      Swal.fire({
          title: "Are you sure ?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#1dbf73',
          cancelButtonColor: '#d33',
          confirmButtonText: "delete",
          cancelButtonText:"cancel",
      }).then((result) => {
      if (result.isConfirmed) {
        DaleteVendors(id)
      }
  })
} 



const handleSearch = (event) => {
  setSearchTerm(event.target.value);
};

function afterDelete(message , icon){
  Swal.fire({
      title: message ,
      icon: icon,
      showConfirmButton: false,
      timer: 1500
  });
} 


  
  const DaleteVendors = async (vendorId) => {
     await axiosInstance.post(`store/delete_vendor`,{
          token: token,
          id:vendorId
        },{
          headers: {
            "Authorization": `Token ${token}`
          }
        }).then(res =>{
            if(res.data.success){
             
              let index = Vendors.findIndex(ele => ele.org.id === vendorId);
              Vendors.splice(index, 1)
              setVendors([...Vendors]);
             
              // languageList.map((lang, index)=>{
              //   let LangIndex = index + 1;
              //   let langCode = lang.code ;
              //   console.log(stateError);
              //   if(stateError == false){
              //     console.log(stateError);
              deleteVendorT(vendorId); 
                // }
              // })
              getVendors();
            }else{
              let message = res.data.error;
              afterDelete(message, 'error');
            }
        });
}


async function deleteVendorT(vendorId){
  await axiosInstance.post(`store/delete_vendor_T`,
      {
        token:token,
        id:vendorId,
      },
      { headers: { "Authorization": `Token ${token}` } }
  ).then(res => {
      // console.log("res t", res);
      if(res.data.error){

        afterDelete(res.data.error, "error");
        // setStateError(true);
      }else{
        let message = res.data.success;
        afterDelete(message, 'success');
        // console.log(LangIndex);
        // console.log(languageList.length);
        //   if(LangIndex == languageList.length){
        //     afterDelete(res.data.success, "success");
        //   }
      }

  }).catch(err => {
    console.log("err t", err);
  });

}

useEffect(() => {
  setLanguageList(langList);

}, [langList ]);

  return (
   
    <>  

    {/* <FixedNavbar />  */}
   <Sidebar />
    <div id='home_page' className='page-section-home min-vh-100'>
      
      <div className='d-flex justify-content-between '>
          <h3 className="m-2" > 
            {/* <i className="fa-solid fa-table-list me-3" style={{color: "#CD5C5C "}}></i> */}
            Vendors
          </h3>
          {/* <Link to="/addVendor" className='fa-regular fa-square-plus text-danger fs-2 text-decoration-none'></Link> */}

      </div>
      <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12 p-3">
                                    <div className='row justify-content-center '>
                                        <div className='col-12 '>
                                            <div className=' row align-items-end justify-content-end'>
                                                <div className='col-lg-3 my-2'>

                                                    <div className="search-container mx-lg-3">
                                                        <input type="text" onChange={handleSearch} placeholder="Search with name "/>
                                                        <img src={searchImg} className='search-icon' width={16} height={16} alt=""/>

                                                    </div>


                                                </div>
                                                <div className={` text-end mx-lg-3 col-lg-2 my-2`}>
                                                    <Link className={` btn  d-flex btnCreateAdd w-lg-75 mx-auto `} type="button" onClick={()=>{
                                                        setTestModal('add');
                                                        setShowAdd(true)
                                                        // setIsAdd(true)
                                                    }}> <img src={imgAddbtn} className=' me-2' width={24} height={24} alt=""/> Vendor </Link>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <TableContainer className='TableContainer' component={Paper}>

                                 

                                        <Table className='Table'>
                                            <TableHead>
                                                <TableRow >
                                                    <TableCell className='TableHeadCell fw-bold'>ID</TableCell>
                                                    <TableCell className='TableHeadCell fw-bold'>Vendors</TableCell>
                                                    <TableCell className='TableHeadCell fw-bold'>Address</TableCell>
                                                    <TableCell className='TableHeadCell fw-bold'>Description</TableCell>
                                                    <TableCell className='TableHeadCell fw-bold'>Edit</TableCell>
                                                    <TableCell className='TableHeadCell fw-bold'>Delete</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {Vendors

                                                    .filter((item) =>
                                                        item.trans.name.toLowerCase().includes(searchTerm.toLowerCase())
                                                    )
                                                    .map((item, index) => (
                                                        <TableRow className='TableRow' key={index}>
                                                            <TableCell className='TableCell'>{index+1}</TableCell>
                                                            <TableCell className='TableCell'>{item.org.name}</TableCell>
                                                            <TableCell className='TableCell'>{item.org.address}</TableCell>
                                                            <TableCell className='TableCell'>{item.org.description}</TableCell>
                                                            <TableCell className='TableCell '>
                                                                <div className="table-data-feature justify-content-between">
                                   
                                                                    <Link type='button' className="item" onClick={()=>{
                                                                      
                                                                        setTestModal('edit');
                                                                        setShowEdit(true)
                                                                        setIsAdd(false)
                                                                        setItemId(item.org.id)


                                                                   
                                                                    }} >

                                                                    <img src={imgEdit} width={16} height={16} alt=""/>

                                                                    </Link>

                                                                  
                                                                </div>

                                                            </TableCell>
                                                            <TableCell className='TableCell '>
                                                                <div className="table-data-feature justify-content-between">
                                                                <form>
                                                                        <Link type='button' className="item"
                                                                            onClick={() => {
                                                                              let id = item.org.id ;
                                                                              DeleteAlert(id);
                                                                            }}>

                                                                            <img src={imgDelete} width={16} height={16} alt=""/>


                                                                        </Link>
                                                                    </form>

                                                                  
                                                                </div>

                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </div>






                            {/*    modal to add */}
                                <Modal show={showAdd} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Vendor</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form method="POST"  className="my-3 create_accont">
                                            <div className='row'>
                                                {/*  Vendors Name */}
                                                <div className='col-lg-6'>
                                                    <label className="text-muted my-2">Vendors Name</label>
                                                    <input className=" form-control mb-3 input" type="text"
                                                           placeholder="Vendors Name"
                                                           name='vendorName'

                                                           required autoFocus
                                                           onChange={(e)=>{
                                                               setName(e.target.value)

                                                               // name[0] = e.target.value ;
                                                               setName([...name,e.target.value]);
                                                               console.log(name[0],"cccccccccccccccccccc")
                                                               const theValue = e.target.value
                                                               const theName = e.target.name
                                                               handleInput(theName,theValue)
                                                           }} />
                                                    {errors.vendorName && <p style={{color: 'red'}}>{errors.vendorName}</p>}

                                                </div>
                                                {/*  vendorAddress */}
                                                <div className='col-lg-6'>
                                                    <label className="text-muted my-2">Address</label>
                                                    <input className=" form-control mb-3 input" type="text"
                                                           placeholder="Address"
                                                           name='vendorAddress'
                                                           required autoFocus
                                                           onChange={(e) => {
                                                               // setAddress([...e.target.value])
                                                               address[0] = e.target.value ;
                                                               setAddress([...address]);
                                                               const theValue = e.target.value
                                                               const theName = e.target.name
                                                               handleInput(theName,theValue)
                                                           }} />
                                                    {errors.vendorAddress && <p style={{color: 'red'}}>{errors.vendorAddress}</p>}

                                                </div>
                                                {/*  Description */}
                                                <div className='col-lg-12'>
                                                    <label className="text-muted my-2">Description</label>
                                                    <input className=" form-control mb-3 input" type="text"
                                                           placeholder="Description"
                                                           name='vendorDescription'
                                                           required autoFocus
                                                           onChange={(e) => {

                                                               // setDescription([...e.target.value])
                                                               description[0] = e.target.value ;
                                                               setDescription([...description]);
                                                               const theValue = e.target.value
                                                               const theName = e.target.name
                                                               handleInput(theName,theValue)
                                                           }} />
                                                    {errors.vendorDescription && <p style={{color: 'red'}}>{errors.vendorDescription}</p>}
                                                </div>
                                            </div>
                                            {languageList.map((lang , index)=>{
                                                let langDir  = "ltr";
                                                if(lang.rtl == true){
                                                    langDir = "rtl";
                                                }else{
                                                    langDir = "ltr";
                                                }

                                                return (
                                                    <>
                                                        <div dir={langDir}>
                                                            <h2>{lang.name}</h2>
                                                            <div className='row'>
                                                                {/* vendors Name */}
                                                                <div className='col-lg-6'>
                                                                    <label className="text-muted my-2">Vendors Name</label>
                                                                    <input className=" form-control mb-3 input" type="text"
                                                                           placeholder="Vendors Name"
                                                                           required autoFocus
                                                                           onChange={(e) => {
                                                                               let fieldIndex = index + 1 ;
                                                                               name[fieldIndex] = e.target.value ;
                                                                               setName([...name]);
                                                                               setName([...name]);
                                                                               const theValue = e.target.value
                                                                               if(langDir=='rtl'){
                                                                                   var  theName = "vendorNameAR"
                                                                               }else{
                                                                                   theName="vendorNameEN"
                                                                               }

                                                                               handleInput(theName,theValue)
                                                                           }} />
                                                                    {langDir=='rtl'&& errors.vendorNameAR && <p style={{color:'red'}}>{errors.vendorNameAR}</p>}
                                                                    {langDir=='ltr'&& errors.vendorNameEN && <p style={{color:'red'}}>{errors.vendorNameEN}</p>}


                                                                </div>
                                                                {/* Address */}
                                                                <div className='col-lg-6'>
                                                                    <label className="text-muted my-2">Address</label>
                                                                    <input className=" form-control mb-3 input" type="text"
                                                                           placeholder="Address"


                                                                           required autoFocus
                                                                           onChange={(e) => {

                                                                               let fieldIndex = index + 1 ;

                                                                               address[fieldIndex] = e.target.value ;
                                                                               setAddress([...address]);
                                                                               const theValue = e.target.value
                                                                               if(langDir=='rtl'){
                                                                                   var  theName = "vendorAddressAR"
                                                                               }else{
                                                                                   theName="vendorAddressEN"
                                                                               }

                                                                               handleInput(theName,theValue)
                                                                           }} />
                                                                    {langDir=='rtl'&& errors.vendorAddressAR && <p style={{color:'red'}}>{errors.vendorAddressAR}</p>}
                                                                    {langDir=='ltr'&& errors.vendorAddressEN && <p style={{color:'red'}}>{errors.vendorAddressEN}</p>}



                                                                </div>
                                                                {/* Description */}
                                                                <div className='col-lg-12'>
                                                                    <label className="text-muted my-2">Description</label>
                                                                    <input className=" form-control mb-3 input" type="text"
                                                                           placeholder="Description"
                                                                           required autoFocus
                                                                           onChange={(e) => {
                                                                               let fieldIndex = index  ;
                                                                               description[fieldIndex] = e.target.value ;
                                                                               setDescription([...description]);
                                                                               const theValue = e.target.value
                                                                               if(langDir=='rtl'){
                                                                                   var  theName = "vendorDescriptionAR"
                                                                               }else{
                                                                                   theName="vendorDescriptionEN"
                                                                               }

                                                                               handleInput(theName,theValue)
                                                                           }} />
                                                                    {langDir=='rtl'&& errors.vendorDescriptionAR && <p style={{color:'red'}}>{errors.vendorDescriptionAR}</p>}
                                                                    {langDir=='ltr'&& errors.vendorDescriptionEN && <p style={{color:'red'}}>{errors.vendorDescriptionEN}</p>}


                                                                </div>
                                                            </div>
                                                        </div>

                                                    </>
                                                )
                                            })

                                            }

                                        </form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button className={`btnCreate`} onClick={() => {
                                            validationFunction()
                                        }}>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>




                                {/*    modal to edit */}
                                <Modal show={showEdit} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Vendor</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form method="POST"  className="my-3 create_accont">
                                            <div className='row'>
                                                {/*  Vendors Name */}
                                                <div className='col-lg-6'>
                                                    <label className="text-muted my-2">Vendors Name</label>
                                                    <input className=" form-control mb-3 input" type="text"
                                                           placeholder="Vendors Name"
                                                           name='vendorName'
                                                           value={currentVendorName}
                                                           required autoFocus
                                                           onChange={(e)=>{
                                                               // setName([e.target.value])
                                                               setCurrentVendorName(e.target.value)
                                                               name[0] = e.target.value ;
                                                               setName([...name]);
                                                           }}
                                                           ref={inputRefName}
                                                    />
                                                    {errors.vendorName && <p style={{color: 'red'}}>{errors.vendorName}</p>}

                                                </div>
                                                {/*  vendorAddress */}
                                                <div className='col-lg-6'>
                                                    <label className="text-muted my-2">Address</label>
                                                    <input className=" form-control mb-3 input" type="text"
                                                           placeholder="Address"
                                                           name='vendorAddress'
                                                           value={currentVendorAdress}
                                                           required autoFocus
                                                           onChange={(e) => {
                                                               // setAddress([e.target.value])
                                                               setCurrentVendorAdress(e.target.value)
                                                               address[0] = e.target.value ;
                                                               setAddress([...address]);
                                                           }}
                                                           ref={inputRefAddress}
                                                    />
                                                    {errors.vendorAddress && <p style={{color: 'red'}}>{errors.vendorAddress}</p>}

                                                </div>
                                                {/*  Description */}
                                                <div className='col-lg-12'>
                                                    <label className="text-muted my-2">Description</label>
                                                    <input className=" form-control mb-3 input" type="text"
                                                           placeholder="Description"
                                                           name='vendorDescription'
                                                           required autoFocus
                                                           value={currentVendorDesc}
                                                           onChange={(e) => {

                                                               // setDescription([e.target.value])
                                                               description[0] = e.target.value ;
                                                               setCurrentVendorAdress(e.target.value)
                                                               setDescription([...description]);

                                                           }}
                                                           ref={inputRefDescription}
                                                    />
                                                    {errors.vendorDescription && <p style={{color: 'red'}}>{errors.vendorDescription}</p>}
                                                </div>
                                            </div>
                                            {languageList.map((lang , index)=>{
                                                let langDir  = "ltr";
                                                if(lang.rtl == true){
                                                    langDir = "rtl";
                                                }else{
                                                    langDir = "ltr";
                                                }

                                                return (
                                                    <>
                                                        <div dir={langDir}>
                                                            <h2>{lang.name}</h2>
                                                            <div className='row'>
                                                                {/* vendors Name */}
                                                                <div className='col-lg-6'>
                                                                    <label className="text-muted my-2">Vendors Name</label>
                                                                    <input className=" form-control mb-3 input" type="text"
                                                                           placeholder="Vendors Name"
                                                                           value={langDir==="rtl"?currentVendorNameAR:currentVendorNameEN}
                                                                           required autoFocus
                                                                           onChange={(e) => {
                                                                               if(langDir==="rtl"){
                                                                                   setCurrentVendorNameAR(e.target.value)
                                                                               }else{
                                                                                   setCurrentVendorNameEN(e.target.value)
                                                                               }
                                                                               let fieldIndex = index + 1 ;
                                                                               name[fieldIndex] = e.target.value ;
                                                                               setName([...name]);
                                                                               setName([...name]);
                                                                               const theValue = e.target.value
                                                                               if(langDir=='rtl'){
                                                                                   var  theName = "vendorNameAR";
                                                                               }else{
                                                                                   theName="vendorNameEN"
                                                                               }

                                                                               handleInput(theName,theValue)

                                                                           }}

                                                                           ref={langDir === 'rtl' ? inputRefvendorNameAR : inputRefvendorNameEN}


                                                                    />
                                                                    {langDir=='rtl'&& errors.vendorNameAR && <p style={{color:'red'}}>{errors.vendorNameAR}</p>}
                                                                    {langDir=='ltr'&& errors.vendorNameEN && <p style={{color:'red'}}>{errors.vendorNameEN}</p>}


                                                                </div>
                                                                {/* Address */}
                                                                <div className='col-lg-6'>
                                                                    <label className="text-muted my-2">Address</label>
                                                                    <input className=" form-control mb-3 input" type="text"
                                                                           placeholder="Address"
                                                                           value={langDir==="rtl"?currentVendorAdressAR:currentVendorAdressEN}


                                                                           required autoFocus
                                                                           onChange={(e) => {
                                                                               if(langDir==="rtl"){
                                                                                   setCurrentVendorAdressAR(e.target.value)
                                                                               }else {
                                                                                   setCurrentVendorAdressEN(e.target.value)

                                                                               }

                                                                               let fieldIndex = index + 1 ;

                                                                               address[fieldIndex] = e.target.value ;
                                                                               setAddress([...address]);

                                                                               if(langDir=='rtl'){
                                                                                   var  theName = "vendorAddressAR"
                                                                               }else{
                                                                                   theName="vendorAddressEN"
                                                                               }


                                                                           }}
                                                                           ref={langDir === 'rtl' ? inputRefvendorAddressAR : inputRefvendorAddressEN}
                                                                    />
                                                                    {langDir=='rtl'&& errors.vendorAddressAR && <p style={{color:'red'}}>{errors.vendorAddressAR}</p>}
                                                                    {langDir=='ltr'&& errors.vendorAddressEN && <p style={{color:'red'}}>{errors.vendorAddressEN}</p>}



                                                                </div>
                                                                {/* Description */}
                                                                <div className='col-lg-12'>
                                                                    <label className="text-muted my-2">Description</label>
                                                                    <input className=" form-control mb-3 input" type="text"
                                                                           placeholder="Description"
                                                                           value={langDir==="rtl"?currentVendorDescAR:currentVendorDescEN}
                                                                           required autoFocus
                                                                           onChange={(e) => {
                                                                               if(langDir==="rtl"){
                                                                                   setCurrentVendorDescAR(e.target.value)
                                                                               }else{
                                                                                   setCurrentVendorDescEN(e.target.value)
                                                                               }
                                                                               let fieldIndex = index+1  ;
                                                                               description[fieldIndex] = e.target.value ;
                                                                               setDescription([...description]);

                                                                               if(langDir=='rtl'){
                                                                                   var  theName = "vendorDescriptionAR"
                                                                               }else{
                                                                                   theName="vendorDescriptionEN"
                                                                               }


                                                                           }}
                                                                           ref={langDir === 'rtl' ? inputRefvendorDescriptionAR : inputRefvendorDescriptionEN}

                                                                    />
                                                                    {langDir=='rtl'&& errors.vendorDescriptionAR && <p style={{color:'red'}}>{errors.vendorDescriptionAR}</p>}
                                                                    {langDir=='ltr'&& errors.vendorDescriptionEN && <p style={{color:'red'}}>{errors.vendorDescriptionEN}</p>}


                                                                </div>
                                                            </div>
                                                        </div>

                                                    </>
                                                )
                                            })

                                            }
                                        </form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>


                                        <Button className={`btnCreate`}
                                                onClick={() => { validationFunction(); }}
                                        >


                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>











                            </div>


                        </div>

    </div>
 
  </>

)

}
