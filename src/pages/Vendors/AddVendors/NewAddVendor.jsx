import Sidebar from "../../../components/AdminSidebar/AdminSidebar.jsx";
import searchImg from "../../../assets/search.webp";
import {Link} from "react-router-dom";
import imgAddbtn from "../../../assets/add-button.webp";
import React, {useEffect, useRef, useState} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import imgDelete from "../../../assets/product/delete.webp";
import imgEdit from "../../../assets/product/edit.webp";
import {useSelector} from "react-redux";
import axiosInstance from "../../../axiosConfig/instanse.jsx";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {VendorValidation} from "../../../components/validation.js";


const NewAddVendor = () => {

    const [Vendors,setVendors] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [testModal, setTestModal] = useState('');
    const [itemId, setItemId] = useState();
    /////
    const [errors, setErrors]=useState({})
    const [vendorValues, setValues]=useState({})
    /////
    const langList =  useSelector(state=>state.langList.langList);
    const [orgName, setOrgName] = useState('')
    const [orgAddress, setOrgAddress] = useState('')
    const [orgDescription, setOrgDescription] = useState('')
    ////// T
    const [t_Name, setT_Name] = useState(Array(langList.length).fill(''));
    const [t_Address, setT_Address] = useState(Array(langList.length).fill(''));
    const [t_Description, setT_Description] = useState(Array(langList.length).fill(''));
/// view one
    const[currentVendorName , setCurrentVendorName] = useState('')
    const[currentVendorAdress , setCurrentVendorAdress] = useState('')
    const[currentVendorDesc , setCurrentVendorDesc] = useState('')


// T
    const [descriptionsT, setDescriptionsT]=useState([])
    const [namesT, setNamesT]=useState([])
    const [addressesT, setAddressesT]=useState([])
        // all data to update


    const currentLanguageCode = useSelector((state) => state.language.lang);
    let token = localStorage.getItem("token");


    /////
    const inputRefName = useRef(null);
    const inputRefAddress = useRef(null);
    const inputRefDescription = useRef(null);
    const inputRefvendorNameAR = useRef(null);
    const inputRefvendorNameEN = useRef(null);
    const inputRefvendorAddressAR = useRef(null);
    const inputRefvendorAddressEN = useRef(null);
    const inputRefvendorDescriptionAR = useRef(null);
    const inputRefvendorDescriptionEN = useRef(null);


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
        // setName([])
        // setAddress([])

    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {

        console.log(langList, "fff")

    }, [langList ]);


    //////////// delete function ////////////
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
    const DaleteVendors = async (id) => {
        await axiosInstance.post(`store/delete_vendor`,{
            token: token,
            id:id
        },{
            headers: {
                "Authorization": `Token ${token}`
            }
        }).then(res =>{
            console.log(res,"trrtvbvb")

            if(res.data.success){
                afterDelete(res.data.success, 'success');

                let index = Vendors.findIndex(ele => ele.org.id === id);
                Vendors.splice(index, 1)
                setVendors([...Vendors]);




                getVendors();
            }else{

                afterDelete(res.data.error, 'error');
            }
        });
    }

    function afterDelete(message , icon){
        Swal.fire({
            title: message ,
            icon: icon,
            showConfirmButton: false,
            timer: 1500
        });
    }
    //////////////////////////////////////////



    //////////// view all function ///////////
    async function getVendors() {
        await axiosInstance.post(`store/view_all_vendors`,{
            token: token,
            lang:currentLanguageCode
        }).then(res => {
            console.log(res,"ttrtrttrtr")

            setVendors(res.data.success);
        }).catch(err =>{
            console.log(err);
        });
    }
    useEffect(()=>{
        getVendors();
    }, [currentLanguageCode])

    ///////////////////  T  ////////////////////////
    const descriptions = []
    const addresses = []
    const names = []
    //////////// view one function ////////////
    const viewOne = async (id) => {

        await axiosInstance.post(`store/view_one_vendor`, {
            id: id,
            token: token,
            seller_id: 1
        }).then(res => {
            console.log(res.data,"viewOne")
            setCurrentVendorName(res.data.success.org_vendor.name)
            setCurrentVendorAdress(res.data.success.org_vendor.address)
            setCurrentVendorDesc(res.data.success.org_vendor.description)
            res.data.success.translations.forEach((ele, index) => {

               // T
               descriptions[index]=ele.description
                addresses[index]=ele.address
                names[index]=ele.name

            });
            // T
            setDescriptionsT([...descriptions])
            setNamesT([...names])
            setAddressesT([...addresses])
        }).catch(err => {
            console.log(err);
        });


        }



    ////////////////////////////////////////

    //////////// add vendor function ////////////
    
    const handleAddFormSubmit = async ()=>{
        await axiosInstance.post(`store/add_vendor`,{
            token: token,
            name:orgName,
            address: orgAddress,
            description: orgDescription

        }).then((res)=>{

            if(res.data.success){
                let vendorId = res.data.id;
                langList.map((lang,index)=>{
                    let langCode = lang.code ;
                    let LangIndex = index ;

                    addVendorsT(vendorId , langCode , LangIndex);
                })
            }else{

                showAlert(res.data.error, "error");
            }

        }).catch((err)=>{
            console.log(err)
            showAlert(err, "error");
        })

    }

    async function addVendorsT(vendorId , langCode , LangIndex){
        let id = vendorId;
        let lang = langCode;
        let index = LangIndex;

        await axiosInstance.post(`store/add_vendor_T`,
            {
                token: token,
                id: id,
                lang:lang,
                name: t_Name[index],
                address: t_Address[index],
                description: t_Description[index]
            }
        ).then(res => {
            console.log(res,"Yaraaaaaaab")
            showAlert(res.data.success, "success");
            handleClose()
            getVendors()

            if(res.data.error){

                showAlert(res.data.error, "error");

            }else{

                if(LangIndex == langList().length){
                    showAlert(res.data.success, "success");

                }
            }



        }).catch(err => {
            console.log("err t", err);
        });

    }

    const handleNameChange = (e, index) => {
        const newValue = e.target.value;
        setT_Name(prevState => {
            const newState = [...prevState];
            newState[index] = newValue;
            return newState;
        });
    };
    const handleAddressChange = (e, index) => {
        const newValue = e.target.value;
        setT_Address(prevState => {
            const newState = [...prevState];
            newState[index] = newValue;
            return newState;
        });
    };
    const handleDescreptionChange = (e, index) => {
        const newValue = e.target.value;
        setT_Description(prevState => {
            const newState = [...prevState];
            newState[index] = newValue;
            return newState;
        });
    };

    ////////////////////////////////////////
const handleFormEditSubmit =async ()=>{
    await axiosInstance.post(`store/update_vendor`,{
        token: token,
        id:itemId,
        name: currentVendorName,
        address: currentVendorAdress,
        description: currentVendorDesc
    }).then((res)=>{
        console.log(res,"dwwwwqwqwdddddddddd")
        if(res.data.success) {
            langList.map((lang, index) => {
                let langCode = lang.code;
                let LangIndex = index;
                editVendorsT(langCode, LangIndex);


            })

        }else{

            showAlert(res.data.error, "error");
        }

    }).catch((err)=>{
        console.log(err,"errrrrrrrrrrr")
    })
}


    async function editVendorsT(langCode , LangIndex){
        let lang = langCode;
        let index = LangIndex;
        await axiosInstance.post(`store/update_vendor_T`,
            {
                token: token,
                id: itemId,
                lang:lang,
                name: namesT[index],
                address: addressesT[index],
                description: descriptionsT[index]
            }
        ).then(res => {
            console.log(res,"AAAAAAAAAAAAAAAAAAAAAA")


            if(res.data.success){

            showAlert(res.data.success, "success");
            handleClose()
            getVendors()

            }else{
                showAlert(res.data.error, "error");


            }

        }).catch(err => {
            console.log("err t", err);
        });

    }
/////////////////////////////////
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
                handleAddFormSubmit()
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



    return (<>
        <Sidebar />
        <div id='home_page' className='page-section-home min-vh-100'>
            <div className='d-flex justify-content-between '>
                <h3 className="m-2">
                     {/*<i className="fa-solid fa-table-list me-3" style={{color: "#CD5C5C "}}></i>*/}
                    Vendors
                </h3>
                 {/*<Link to="/addVendor" className='fa-regular fa-square-plus text-danger fs-2 text-decoration-none'></Link> */}

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




                        {/* table view all vendors */}
                        <TableContainer className='TableContainer' component={Paper}>
                            <Table className='Table'>
                                {/* table header */}
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

                            {/*  table body  */}
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
                                                            setItemId(item.org.id)
                                                            viewOne(item.org.id)

                                                        }} >
                                                            <img src={imgEdit} width={16} height={16} alt=""/>

                                                        </Link>


                                                    </div>

                                                </TableCell>
                                                <TableCell className='TableCell '>
                                                    <div className="table-data-feature justify-content-between">
                                                        <form>
                                                            <Link type='button' className="item" onClick={() => {
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
                        </div>
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

                                           setOrgName(e.target.value)
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
                                           setOrgAddress(e.target.value)
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
                                           setOrgDescription(e.target.value)
                                           const theValue = e.target.value
                                           const theName = e.target.name
                                           handleInput(theName,theValue)


                                       }} />
                                {errors.vendorDescription && <p style={{color: 'red'}}>{errors.vendorDescription}</p>}

                            </div>
                        </div>
                        {langList.map((lang , index)=>{
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
                                                           handleNameChange(e, index)
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
                                                           handleAddressChange(e, index)
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
                                                           handleDescreptionChange(e,index)
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
                                           setCurrentVendorName(e.target.value)
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

                                           setCurrentVendorAdress(e.target.value)

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
                                           setCurrentVendorDesc(e.target.value)

                                       }}
                                       ref={inputRefDescription}
                                />
                                {errors.vendorDescription && <p style={{color: 'red'}}>{errors.vendorDescription}</p>}
                            </div>
                        </div>
                        {langList.map((lang , index)=>{
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
                                                       value={namesT[index]}
                                                       required autoFocus
                                                       onChange={(e) => {


                                                           const updatedNamesT = [...namesT];
                                                           updatedNamesT[index] = e.target.value;
                                                           setNamesT(updatedNamesT)

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
                                                       value={addressesT[index]}


                                                       required autoFocus
                                                       onChange={(e) => {
                                                           const updatedAddressT = [...addressesT];
                                                           updatedAddressT[index] = e.target.value;
                                                           setAddressesT(updatedAddressT)




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
                                                       value={descriptionsT[index]}


                                                       required autoFocus
                                                       onChange={(e) => {
                                                           const updatedDescriptionsT = [...descriptionsT];
                                                           updatedDescriptionsT[index] = e.target.value;
                                                           setDescriptionsT(updatedDescriptionsT)


                                                       }}
                                                       ref={langDir === 'rtl' ? inputRefvendorDescriptionAR : inputRefvendorDescriptionEN}

                                                />
                                                {console.log(descriptionsT,"WWWWWWWWWWWwww")}
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







            <h1>Fatma</h1>

        </div>


    </>);
};

export default NewAddVendor;