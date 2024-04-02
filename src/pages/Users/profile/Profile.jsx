import React from 'react';
import { useState, setState, useEffect, useRef } from 'react';
import axiosInstance from '../../../axiosConfig/instanse';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Alert from 'react-bootstrap/Alert';

import style from './profile.module.css';

import imgView from '../../../assets/product/veiw.webp'
import { useSelector, useDispatch } from 'react-redux';
import Swal from "sweetalert2";


import Modal from 'react-bootstrap/Modal';


import ProgressBar from 'react-bootstrap/ProgressBar';


import zoom from '../../../assets/zoom.png';


// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sidebar from '../../../components/AdminSidebar/AdminSidebar';
import {Link, useParams} from "react-router-dom";
import Select from 'react-select'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';

import { registerLocale, setDefaultLocale } from  "react-datepicker";
import eg  from 'date-fns/locale/ar-EG';



import closeImage from '../../../assets/exit-icon.webp';
import closeImg from "../../../assets/exit-icon.webp";
import imgDelete from "../../../assets/product/delete.webp";
import Button from "react-bootstrap/Button";

import { forwardRef } from 'react';
const Profile = () => {

    registerLocale('eg', eg)
    const currentLanguageCode = useSelector((state) => state.language.lang);
    const userType =   useSelector((state)=>state.userinfo.userType);
    console.log(userType,"tttttttttttttttt")
    const { id } = useParams();
    // var settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 2,
    //     slidesToScroll: 2
    // };


    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);


    const [caption, setCaption] = useState("");
    const [image, setImage] = useState("");

    const [showImge, setShowImge] = useState(false);
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState([]);
    const handleImageClose = () => setShowImge(false);
    const handleImageShow = (caption, image) => {
        setCaption(caption);
        setImage(image);
        setShowImge(true);
    }




    const [showFinancial, setShowFinancial] = useState(false);

    const handleFinancialClose = () => setShowFinancial(false);
    const handleFinancialShow = () => setShowFinancial(true);

 

    let token = localStorage.getItem('token');

    const [userImg, setUserImg] = useState('');

    const [userInfo, setUserInfo] = useState({});

    const [shipping, setShipping] = useState([]);

    const [bank, setBank] = useState([]);

    const [approvalImgs, setApprovalImgs] = useState([]);

    const [data, setData] = useState({
        full_name: "",
        national_id: "",
        address: "",
        phone: "",
        birthday: "",
        countryId: "",
        countryName: ""
    });

    const [financialData, setFinancialData] = useState({
        commercial_reg: "",
        tax_number: "",
        notes: ""
    });

    const [errors, setError] = useState({
        full_name: "",
        national_id: "",
        address: "",
        phone: "",
        birthday: "",
        country: "",
    });


    const handleInfo = async () => {
        await axiosInstance.post('user/view_user_profile_by_id', {
            id:id,
            user_type: userType,
            token: token
        }).then(res => {

            console.log("res infooooo", res);

            setData({
                full_name: res.data.user_data.full_name,
                national_id: res.data.user_data.national_id,
                address: res.data.user_data.address,
                phone: res.data.user_data.phone,
                birthday: res.data.user_data.birthday,
                countryId: res.data.user_data.country[0],
                countryName: res.data.user_data.country[1]
            });

            setFinancialData({
                commercial_reg: res.data.user_data.commercial_reg,
                tax_number: res.data.user_data.tax_number,
                notes: res.data.user_data.notes
            });

            let user = JSON.parse(localStorage.getItem("user_info"));

            user.user_img = res.data.user_data.img;

            // setShipping(res.data.user_data.shipping);
            // setBank(res.data.user_data.banks);
            setApprovalImgs(res.data.user_data.approval_imgs)

            localStorage.setItem("user_info", JSON.stringify(user));

            const imageUrl = URL.createObjectURL(
                new Blob([base64ToArrayBuffer(res.data.user_data.img)], { type: 'image/jpeg' })
            );

            setUserImg(imageUrl);
            setUserInfo(res.data.user_data);

            viewAllShipping(res.data.user_data.customer_id);
            viewAllBanks(res.data.user_data.customer_id);
            viewAllApprovalImgs(res.data.user_data.customer_id);

        }).catch((err) => {
            console.log("err", err)
        });


    }


    const viewAllShipping = async (customer_id) => {
        await axiosInstance.post('user/view_all_shipping', {
            token: token,
            customer_id: customer_id,
        }).then(res => {
            setShipping(res.data.success);
        }).catch((err) => {
            console.log("err", err)
        });
    }

    const viewAllBanks = async (customer_id) => {
        await axiosInstance.post('user/view_all_banks', {
            token: token,
            customer_id: customer_id,
        }).then(res => {
            setBank(res.data.success);
        }).catch((err) => {
            console.log("err", err)
        });
    }


    const viewAllApprovalImgs = async (id) => {
        await axiosInstance.post('user/view_all_approval_imgs', {
            id:id,
            user_type: userType,
            token: token
        }, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log("approval images", res)
            setApprovalImgs(res.data.success);
        })
            .catch((err) => {
                console.log("err", err)
            });
    }

    const viewAllOrders = async (user_id) => {

        console.log("user_id", user_id)
        await axiosInstance.post('payment/get_orders_admin', {
            token: token,
            id: user_id,
            lang:currentLanguageCode
        }, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log("orders", res)
            if(res.data.orders){
                setOrders(res.data.orders);
            }

        })
            .catch((err) => {
                console.log("err", err)
            });
    }

    const stat =[];
    const viewAllStatus = async (endpoint) => {


        await axiosInstance.post('user/view_order_status', {
            token: token,
            url: endpoint,
            lang:currentLanguageCode
        }, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log("statussssss", res)
            res.data.success.map((item)=>{
                stat.push({value:item.name_id,label:item.translation})
        })
            setStatus(stat);
        })
            .catch((err) => {
                console.log("err", err)
            });
    }

    const base64ToArrayBuffer = base64 => {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    };


    const handleFileInputChange = async (e) => {

        setUserImg(e.target.files[0]);

        const formData = new FormData();

        formData.append('user_img', e.target.files[0]);
        formData.append('token', token);

        await axiosInstance.post(`user/update_profile_img`, formData
            , {
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                console.log(res);
                handleInfo();
                showAlert(res.data.success, "success");
            }).catch(err => {
                console.log(err);
                // showAlert(res.data.error, "error");
            });

    };

    function showAlert(message, icon) {
        Swal.fire({
            title: message,
            icon: icon,
            showConfirmButton: false,
            timer: 1500
        });
    }



    function editProfile(e) {
        e.preventDefault();
        axiosInstance.post(`user/edit_user_profile`, {
            full_name: data.full_name,
            national_id: data.national_id,
            address: data.address,
            phone: data.phone,
            birthday: data.birthday,
            country: data.countryId,
            token: token
        }, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log("respondend with: ", res);
            handleInfo();
        
            if (res.data.success) {
                showAlert(res.data.success, "success");
            } else {
                showAlert(res.data.error, "error");
            }
        }).catch((err) => {
            console.log("Server respondend with error: ", err);
        });
        return false
    }



    const [countries, setCountries] = useState([])

    const getCountry = async () => {
        await axiosInstance.post('user/countries', {
            token: token
        }, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => {
            setCountries(res.data.countries);
        }).catch((err) => {
            console.log("err", err)
        });
    }


    function handleInputChange(event) {
        const { id, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    }

    // const [newAddress, setNewAddress] = useState("");
    //
    // const AddShipping = async (e) => {
    //     e.preventDefault();
    //     await axiosInstance.post('user/add_shipping_address', {
    //         token: token,
    //         customer_id: userInfo.customer_id,
    //         address: newAddress
    //     }, {
    //         headers: {
    //             "Authorization": `Token ${token}`,
    //             "Content-Type": "application/json"
    //         }
    //     }).then(res => {
    //         console.log("res add", res.data);
    //         if (res.data.success) {
    //             showAlert(res.data.success, "success");
    //             e.target.reset();
    //             let shappingAddress = document.getElementById('shappingAddress');
    //             if (shappingAddress.classList.contains("d-none") == false) {
    //                 shappingAddress.classList.add("d-none");
    //             }
    //             viewAllShipping(userInfo.customer_id);
    //         } else {
    //             showAlert(res.data.error, "error");
    //         }
    //
    //     }).catch((err) => {
    //         console.log("err", err)
    //     });
    // }
    //
    // const DeleteShipping = async (id) => {
    //     await axiosInstance.post('user/delete_shipping_address', {
    //         id: id
    //     }, {
    //         headers: {
    //             "Authorization": `Token ${token}`,
    //             "Content-Type": "application/json"
    //         }
    //     }).then(res => {
    //         console.log("res add", res.data);
    //         if (res.data.success) {
    //             showAlert(res.data.success, "success");
    //             viewAllShipping(userInfo.customer_id);
    //         } else {
    //             showAlert(res.data.error, "error");
    //         }
    //
    //     }).catch((err) => {
    //         console.log("err", err)
    //     });
    // }
    //
    // const [shippingForEdit, setShippingForEdit] = useState({});
    //
    // const viewOneShipping = async (id) => {
    //     await axiosInstance.post('user/view_one_shipping', {
    //         token: token,
    //         id: id
    //     }, {
    //         headers: {
    //             "Authorization": `Token ${token}`,
    //             "Content-Type": "application/json"
    //         }
    //     }).then(res => {
    //         console.log("res add", res.data.success.shipping_address);
    //         if (res.data.success) {
    //             setShippingForEdit(res.data.success.shipping_address);
    //             setNewAddress(res.data.success.shipping_address.address)
    //         }
    //
    //     }).catch((err) => {
    //         console.log("err", err)
    //     });
    // }
    //
    //
    // const EditShipping = async (e) => {
    //     e.preventDefault();
    //     await axiosInstance.post('user/update_shipping_address', {
    //         token: token,
    //         id: shippingForEdit.id,
    //         address: newAddress
    //     }, {
    //         headers: {
    //             "Authorization": `Token ${token}`,
    //             "Content-Type": "application/json"
    //         }
    //     }).then(res => {
    //         console.log("res edit", res);
    //         if (res.data.success) {
    //             showAlert(res.data.success, "success");
    //             viewAllShipping(userInfo.customer_id);
    //             let shappingAddress = document.getElementById('shappingAddressEdit');
    //             if (shappingAddress.classList.contains("d-none") == false) {
    //                 shappingAddress.classList.add("d-none");
    //             }
    //         } else {
    //             showAlert(res.data.error, "error");
    //         }
    //
    //     }).catch((err) => {
    //         console.log("err", err)
    //     });
    // }
    //
    //
    // const setDafaultShippingAddress = async (id) => {
    //
    //     await axiosInstance.post('user/set_dafault_shipping_address', {
    //         token: token,
    //         customer_id: userInfo.customer_id,
    //         id: id
    //     }, {
    //         headers: {
    //             "Authorization": `Token ${token}`,
    //             "Content-Type": "application/json"
    //         }
    //     }).then(res => {
    //         console.log("res edit", res);
    //         if (res.data.success) {
    //             showAlert(res.data.success, "success");
    //             handleInfo();
    //
    //         } else {
    //             showAlert(res.data.error, "error");
    //         }
    //
    //     }).catch((err) => {
    //         console.log("err", err)
    //     });
    // }


    // financial information
    function editFinancial(e) {
        console.log("editFinancial", financialData);
        let notes = 'notes';
        if (financialData.notes != null) {
            notes = financialData.notes;
        }
        e.preventDefault();
        axiosInstance.post(`user/update_approval_info`, {
            commercial_reg: financialData.commercial_reg,
            tax_number: financialData.tax_number,
            notes: notes,
            customer_id: userInfo.customer_id,
            token: token
        }, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log("res Finantial: ", res);
            handleInfo();
            handleFinancialClose();

            if (res.data.success) {
                showAlert(res.data.success, "success");
            } else {
                showAlert(res.data.error, "error");
            }
        }).catch((err) => {
            console.log("Server respondend with error: ", err);
        });
        return false
    }


    function handleFinancialChange(event) {
        const { id, value } = event.target;
        setFinancialData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    }

    useEffect(() => {
       
        handleInfo();
        getCountry();

        viewAllOrders(id);
        getAllItems()

    }, [id]);



    // bank

    const [bankForEdit, setBankForEdit] = useState({});

    const viewOneBank = async (id) => {
        await axiosInstance.post('user/view_one_bank', {
            token: token,
            id: id
        }, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => {

            console.log("res view one : ", res.data.success);

            if (res.data.success) {
                setBankForEdit(res.data.success);
            }

        }).catch((err) => {
            console.log("err", err)
        });
    }


    const EditBank = async (e) => {
        e.preventDefault();
        await axiosInstance.post('user/update_bank_info', {
            token: token,
            customer_id: userInfo.customer_id,
            id: bankForEdit.id,
            bank_name: bankForEdit.bank_name,
            bank_account: bankForEdit.bank_account
        }, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log("res edit bank", res);

            if (res.data.success) {
                showAlert(res.data.success, "success");
                viewAllBanks(userInfo.customer_id);
                let bankEdit = document.getElementById('bankEdit');
                if (bankEdit.classList.contains("d-none") == false) {
                    bankEdit.classList.add("d-none");
                }
            } else {
                showAlert(res.data.error, "error");
            }

        }).catch((err) => {
            console.log("err", err)
        });
    }

    function handleBankChange(event) {
        const { id, value } = event.target;
        setBankForEdit((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    }


    // const [newAddress, setNewAddress] = useState("");

    const AddBank = async (e) => {
        e.preventDefault();
        await axiosInstance.post('user/add_bank_account', {
            token: token,
            customer_id: userInfo.customer_id,
            bank_name: bankForEdit.bank_name,
            bank_account: bankForEdit.bank_account
        }, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log("res add", res.data);
            if (res.data.success) {
                showAlert(res.data.success, "success");
                e.target.reset();
                let bankInput = document.getElementById('bankInput');
                if (bankInput.classList.contains("d-none") == false) {
                    bankInput.classList.add("d-none");
                }
                viewAllBanks(userInfo.customer_id);
            } else {
                showAlert(res.data.error, "error");
            }

        }).catch((err) => {
            console.log("err", err)
        });
    }




    // function DeleteAlert(type, id) {
    //     console.log("type", type)
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!',
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             if (type == 'shipping') {
    //                 console.log(type)
    //                 DeleteShipping(id);
    //             } else {
    //                 DeleteBank(id);
    //             }
    //
    //         }
    //     })
    // }




    const DeleteBank = async (id) => {
        await axiosInstance.post('user/delete_bank_info', {
            id: id
        }, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log("res add", res.data);
            if (res.data.success) {
                showAlert(res.data.success, "success");
                viewAllBanks(userInfo.customer_id);
            } else {
                showAlert(res.data.error, "error");
            }

        }).catch((err) => {
            console.log("err", err)
        });
    }



    // upload Image

    const [selectedFile, setSelectedFile] = useState("");

    const [errorMessage, setErrorMessage] = useState('');
    const [invalid, setInvalid] = useState(false);

    const filesSelected = (e) => {

        setSelectedFile(e.target.files[0]);

        if (validateSelectedFile(e.target.files[0]) == false) {
            setInvalid(true)
            setErrorMessage("File size is greater than maximum limit 2M");
        } else {
            setInvalid(false)
            setErrorMessage("");
        }

    }


    const [progress, setProgress] = useState(0);

    const uploadFiles = async (e) => {
        e.preventDefault();

        if (invalid == false && selectedFile != "") {
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append('image_caption', caption);
            formData.append('customer_id', userInfo.customer_id);
            formData.append('token', token);
            let prog = document.getElementById("progress");

            let approvalImg = document.getElementById('approvalImg');



            await axiosInstance.post('user/add_one_approval_imgs', formData, {
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (progressEvent) => {
                    setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
                }
            }).then(res => {
                console.log("res", res);
                if (res.data.error) {
                    showAlert(res.data.error, "error");
                } else {
                    showAlert(res.data.success, "success");
                    viewAllApprovalImgs(userInfo.customer_id);
                    prog.classList.add("d-none");

                    approvalImg.classList.add("d-none");
                }
            }).catch((err) => {
                console.log("err", err);
            });
        } else {
            showAlert(errorMessage, "error");
        }
    };

    const validateSelectedFile = (selectedFile) => {

        // const MAX_FILE_SIZE = 2048 // 2MB

        const MAX_FILE_SIZE = 204800000000

        const fileSizeKiloBytes = selectedFile.size / 1024

        if (fileSizeKiloBytes > MAX_FILE_SIZE) {
            return false;
        } else {
            return true;
        }
    };


    // const [isChecked, setIsChecked] = useState(false);
    //
    // const handleChange = () => {
    //     setIsChecked(!isChecked);
    // };


    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    const handleStatus = () => {

        let { data } = axiosInstance.post(`user/deactivate_user`,{
            token: token,
            id: id,
            url: endpoint


        }).then(res => {
              console.log("res block", res);
              if(res.data.success){
                  showAlert(res.data.success, "success");
                  handleInfo()
              }

        }).catch(err => {
            console.log("err one", err);
        })
    };

    const handleActiveStatus = () => {

        let { data } = axiosInstance.post(`/user/activate_user`,{
            token: token,
            id: id,
            url: endpoint


        }).then(res => {
            console.log("res block", res);
            if(res.data.success){
                showAlert(res.data.success, "success");
                handleInfo()
            }

        }).catch(err => {
            console.log("err one", err);
        })
    };

    const handleChange = (index) => {
        setApprovalImgs((prevApprovalImgs) => {
            const updatedImgs = [...prevApprovalImgs];
            updatedImgs[index].status = !updatedImgs[index].status;

            // Send API request based on the updated checkbox state
            if (updatedImgs[index].status) {
                // Send 'approved' API request
                sendApiRequest('approved', updatedImgs[index].id);
            } else {
                // Send 'refused' API request
                sendApiRequest('refused', updatedImgs[index].id);
            }

            return updatedImgs;
        });
    };

    const sendApiRequest = (status, imageId) => {
        let { data } = axiosInstance.post(`user/set_approval_img_status`,{
            token: token,
            id: imageId,
            status: status,
            url: endpoint


        }).then(res => {
            console.log("res set approv img", res);
            if(res.data.success){
                showAlert(res.data.success, "success");}

        }).catch(err => {
            console.log("err one", err);
        })
    };


    const handleOrderStatus = (order_id, status) => {

        let { data } = axiosInstance.post(`user/set_order_status`,{
            token: token,
            id:id,
            order_id: order_id,
            url: endpoint,
            status: status


        }).then(res => {
            console.log("res order status", res);
            if(res.data.success){
                showAlert(res.data.success, "success");}

        }).catch(err => {
            console.log("err one", err);
        })
    };

    const handleDelverDate = (order_id, date) => {

        let { data } = axiosInstance.post(`payment/set_delivery_order_date`,{
            token: token,
            order_idd: order_id,
            lang: currentLanguageCode,
            delivery_date: date


        }).then(res => {
            console.log("res delivery date", res);
            if(res.data.success){
                showAlert(res.data.success, "success");}

        }).catch(err => {
            console.log("err one", err);
        })
    };
    const [endpoint, setEndpoint] = useState('')












    useEffect(() => {
        const endpoint = window.location.pathname.split('/')[1];
        setEndpoint(endpoint);
        let prog = document.getElementById("progress");
        if (progress == 1) {
            prog.classList.remove("d-none");
        }

        viewAllStatus(endpoint);
    }, [progress]);


    const inputRef = useRef(null);

    const handleInputClick = () => {
        inputRef.current.focus();
    };
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDates, setSelectedDates] = useState({});

    const CustomDatePickerInput = ({ value, onClick }) => (
        <div className="date-picker-input">
            {/*<input*/}
            {/*    type="text"*/}
            {/*    value={value}*/}
            {/*    onClick={onClick}*/}
            {/*    readOnly*/}
            {/*/>*/}
            <span className="date-picker-icon" onClick={onClick}>
        <FaCalendarAlt />
      </span>
        </div>
    );

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="example-custom-input" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    const [oneOrders, setOneOrders] = useState({});

    const [orderItems, setOrderItems] = useState([]);

    async function getOneOrder(orderId) {
        console.log(orderId);
        axiosInstance.post('payment/get_one_order_admin', {
            token: token,
            lang: currentLanguageCode,
            order_idd: orderId,
            id: id
        }, {
            headers: {
                "Authorization": `Token ${token}`
            }
        }).then(res => {

            console.log("get one order  ", res);
            setOneOrders(res.data);
            setOrderItems(res.data.orders);

        }).catch(err => {
            console.log("error order ", err)
        });

    }


    const [allMsg, setAllMsg] = useState([]);
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

    const [msgTitle, setMsgTitle] = useState('');
    const [msgBody, setMsgBody] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        let { data } = axiosInstance.post(`user/set_notification_for_user`,{
            token: token,
            title:msgTitle,
            body:msgBody,
            id:id
        }).then(res => {
            console.log("from addd note :",res);
            showAlert("Notification send Successfully", "success");
             e.target.reset();

        }).catch(err => {
            console.log("err one", err);
        });
    };

    return (

      <>
        <Sidebar />
        <section className={`${style.profile} user-profile page-section-home`}>
            <div className=' p-5 mx-2 '>

                <div className=''>
                    {/*
                    {[{ 'color': 'success', 'ele': userInfo.approval_status, 'text': "approval status" },
                    { 'color': 'danger', 'ele': userInfo.accepted, 'text': "accepted" }].map((variant, index) => (
                        <Alert key={index} variant={variant.color}>
                            {variant['text']} : {variant['ele']}
                        </Alert>
                    ))}

                    {[{ 'color': 'success', 'ele': userInfo.message_admin, 'text': "message admin" },
                    { 'color': 'success', 'ele': userInfo.message_status, 'text': "message status" }].map((variant, index) => {
                        if (variant['ele'] != '') {
                            return (
                                <Alert key={index} variant={variant.color}>
                                    {variant['text']} : {variant['ele']}
                                </Alert>
                            )
                        }
                    })} */}

                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row className={``}>
                            <Col className={`my-1 p-2`} lg={3}>
                               <div className={`${style.profileOption}   profileOption `}>
                                   <h3>user profile</h3>
                                   <Nav variant="pills" className="flex-column">
                                       <Nav.Item>
                                           <Nav.Link eventKey="first" className={`text-capitalize`}>profile info</Nav.Link>
                                       </Nav.Item>
                                       <Nav.Item>
                                           <Nav.Link eventKey="second" className={`text-capitalize`}>approval decoments</Nav.Link>
                                       </Nav.Item>
                                       <Nav.Item>
                                           <Nav.Link eventKey="third"  className={`text-capitalize`}>Financial Information</Nav.Link>
                                       </Nav.Item>
                                       <Nav.Item>
                                           <Nav.Link eventKey="fourth" className={`text-capitalize`}>Shipping Adresses</Nav.Link>
                                       </Nav.Item>
                                       <Nav.Item>
                                           <Nav.Link eventKey="fifth" className={`text-capitalize`}>Orders</Nav.Link>
                                       </Nav.Item>
                                       <Nav.Item>
                                           <Nav.Link eventKey="sixth" className={`text-capitalize`}>Payments</Nav.Link>
                                       </Nav.Item>
                                       <Nav.Item>
                                           <Nav.Link eventKey="seventh" className={`text-capitalize`}>Notifications</Nav.Link>
                                       </Nav.Item>
                                   </Nav>
                               </div>
                            </Col>
                            <Col lg={9} className={`my-1 p-2`}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                       <div>
                                           <div className={`${style.editProfile} mx-0 row align-items-center`}>
                                               <div className={`col-lg-8 d-flex `}>
                                                   <div id="profile-img  mx-2">
                                                       <label htmlFor="file" className="position-relative">
                                                           <img src={userImg}
                                                                alt="avatar"
                                                                className="rounded-2 my-2"
                                                                style={{
                                                                    width: '100px',
                                                                    height: "100px",
                                                                    marginTop: '10px'
                                                                }}
                                                                fluid/>

                                                           {/*<img style={{ width: '30px', height: "30px" }} type="button" className={`${style.editImage}`} src={editImage} alt="image one" />*/}
                                                       </label>


                                                   </div>
                                                   <div className={`${style.nameEmail} mx-2`}>
                                                       <div>
                                                           <h6>Name :{userInfo ? userInfo.full_name : ''}</h6>
                                                           <p>Email :{userInfo ? userInfo.email : ''}</p>
                                                       </div>

                                                   </div>
                                               </div>
                                               <div className={`my-2 text-end col-lg-4`}>
                                                   {userInfo.is_active ? (
                                                       <button className={`btn btn-danger px-4`} onClick={(e)=>{
                                                           e.preventDefault();
                                                           handleStatus()
                                                       }}><i className="fa-solid fa-ban"></i> Block</button>
                                                   ): (
                                                       <button className={`btn btn-success px-4`} onClick={(e)=>{
                                                           e.preventDefault();
                                                           handleActiveStatus()
                                                       }}><i className="fa-solid fa-ban"></i> Active</button>
                                                   )}
                                               </div>
                                           </div>
                                           <div className={`${style.editProfile2} mt-3 pb-5`}>
                                               <div>
                                                   <h4 className='text-capitalize'>personal information</h4>

                                                   <div className="reg row ">

                                                       <div className='inp d-inline-block px-2 col-lg-6 '>
                                                           <h5 className="text-capitalize">full name</h5>
                                                           <p className='par-info'>{data.full_name}</p>

                                                       </div>

                                                       <div className='inp d-inline-block px-2 col-lg-6 '>
                                                           <h5 className="text-capitalize">national id</h5>
                                                           <p className='par-info'>{data.national_id}</p>


                                                       </div>


                                                       <div className='inp d-inline-block px-2 col-lg-6 '>
                                                           <h5 className="text-capitalize">address</h5>
                                                           <p className='par-info'>{data.address}</p>


                                                       </div>


                                                       <div className='inp d-inline-block px-2 col-lg-6 '>
                                                           <h5 className="text-capitalize">phone</h5>
                                                           <p className='par-info'>{data.phone}</p>



                                                       </div>

                                                       <div className='inp d-inline-block px-2 col-lg-6 '>
                                                           <h5 className="text-capitalize">birthday</h5>
                                                           <p className='par-info'>{data.birthday}</p>


                                                       </div>

                                                       <div className='inp d-inline-block px-2 col-lg-6 '>
                                                           <h5 className="text-capitalize">Country </h5>
                                                           <p className='par-info'>{data.countryName}</p>



                                                       </div>





                                                   </div>


                                               </div>

                                           </div>
                                       </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">



                                        <div className={`${style.approval}`}>
                                            <h3>approval decoments</h3>

                                            <div className={`${style.aboutThree} aboutThree p-3`}>

                                                    <div className={`  `}>
                                                        <Slider {...settings}>
                                                            {approvalImgs.map((img, index) => (
                                                                <div className={`px-2`} key={index}>
                                                                    <div className="position-relative">
                                                                        <img
                                                                            src={`data:image/png;base64,${img.image}`}
                                                                            alt="avatar"
                                                                            className="rounded-2 my-2 w-100"
                                                                            style={{ height: "160px" }}
                                                                            fluid
                                                                        />

                                                                        <img
                                                                            type="button"
                                                                            src={zoom}
                                                                            alt="image one"
                                                                            onClick={() => {
                                                                                handleImageShow(img.caption, img.image);
                                                                            }}
                                                                            className="position-absolute bottom-0 end-0 m-3"
                                                                        />

                                                                        <div className="bg-white p-1 position-absolute bottom-0 start-0 m-3 rounded-2">
                                                                            <input
                                                                                type="checkbox"
                                                                                onChange={() => handleChange(index)}
                                                                                checked={img.status== 'approved' ? true : false}
                                                                                className="form-check-input me-1"
                                                                            />
                                                                            <label>Approved</label>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-center">{img.caption}</p>
                                                                </div>
                                                            ))}


                                                        </Slider>
                                                    </div>


                                            </div>

                                        </div>


                                    </Tab.Pane>
                                    <Tab.Pane eventKey="third">
                                        <div className={`${style.approval}bg-light p-3 mb-2`}>

                                            {(userInfo.commercial_reg != null) ? (

                                                <div className='inp   d-flex'>
                                                    <h5 className="text-capitalize mx-1">commercial reg:</h5>
                                                    <p className='par-info mx-1'>{userInfo ? userInfo.commercial_reg : ''}</p>


                                                </div>


                                                ) : (
                                                <h5 className="text-capitalize">commercial reg: <span className='text-danger'></span></h5>
                                            )}

                                            {(userInfo.tax_number != null) ? (
                                                    <div className='inp    d-flex'>
                                                        <h5 className="text-capitalize mx-1">tax number: </h5>
                                                        <p className='par-info mx-1'>{userInfo ? userInfo.tax_number : ''}</p>


                                                    </div>


                                            ) : (
                                                <h5 className="text-capitalize">tax number: <span className='text-danger'> </span></h5>
                                            )}

                                            {(userInfo.notes != null) ? (

                                                    <div className='inp   d-flex '>
                                                        <h5 className="text-capitalize mx-1">notes:</h5>
                                                        <p className='par-info mx-1'>{userInfo ? userInfo.notes : ''}</p>


                                                    </div>


                                            ) : (
                                                <h6>notes: <span className='text-muted'></span></h6>
                                            )}


                                        </div>

                                        <h5 className={`ps-3`}>Bank Information</h5>

                                        <div className='bg-light p-3'>
                                            {(bank.length == 0) ? (
                                                <p></p>
                                            ) : (
                                                <>
                                                    <div id="bankEdit" className={`d-none p-3 mb-3 bg-white border border-1 position-relative`}>
                                                        <div className='' >
                                                            <div className='inp  px-2  '>
                                                                <h5 className="text-capitalize">Bank Name</h5>
                                                                <p className='par-info'>{bankForEdit.bank_name}</p>


                                                            </div>
                                                            <div className='inp  px-2  '>
                                                                <h5 className="text-capitalize">Bank Account</h5>
                                                                <p className='par-info'>{bankForEdit.bank_account}</p>


                                                            </div>




                                                        </div>

                                                        <i className={`${style.iconMinus} fas fa-minus  text-danger fs-2 ms-2 position-absolute`} onClick={() => {
                                                            let bankEdit = document.getElementById('bankEdit');
                                                            if (bankEdit.classList.contains("d-none") == false) {
                                                                bankEdit.classList.add("d-none");
                                                            }
                                                        }} ></i>
                                                    </div>

                                                    {bank.map((ele, index) => {
                                                        return (
                                                            <div key={index} className='mb-2'>
                                                                <div className=' row' >
                                                                    <div className='inp  px-2 col-md-6 d-flex '>
                                                                        <h6 className="text-capitalize mx-1">Bank Name:</h6>
                                                                        <p className='par-info mx-1'>{ele[1]}</p>


                                                                    </div>
                                                                    <div className='inp  px-2 col-md-6 d-flex '>
                                                                        <h6 className="text-capitalize mx-1">Bank Account:</h6>
                                                                        <p className='par-info mx-1'>{ele[2]}</p>


                                                                    </div>




                                                                </div>

                                                            </div>
                                                        )
                                                    })}




                                                </>
                                            )}
                                        </div>

                                    </Tab.Pane>
                                    <Tab.Pane eventKey="fourth">
                                        <div className={`bg-light p-3 ${style.approval}`}>
                                            {(shipping.length == 0) ? (
                                                <p>No Shipping Addresses</p>
                                            ) : (
                                                <>

                                                    {shipping.map((ele, index) => {
                                                        if (ele[0] == userInfo.default_shipping) {
                                                            return (
                                                                <div key={index} className='mb-2'>
                                                                    <div className='d-flex'>
                                                                        <h6>{ele[1]}</h6>

                                                                        <p className='par-info mx-1'> Default Shipping Address</p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        } else {
                                                            return (
                                                                <div key={index} className='mb-2'>
                                                                    <div className='d-flex'>
                                                                        <p>{ele[1]}</p>


                                                                    </div>

                                                                </div>
                                                            )
                                                        }
                                                    })}

                                                </>
                                            )}
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="fifth">
                                        <div className={`bg-light p-3 ${style.approval}`}>
                                            <h6>Orders: {orders.length}</h6>
                                            <ul className={`${style.main} ms-0`}>

                                                {orders.map((order, index) => {
                                                    return (
                                                        <li key={index} className={`${style.ordrItem} row my-3 align-items-end`}>

                                                            <div className='col-xl-3 '>

                                                               <div>

                                                                   <h5>Order {order.order_id}</h5>
                                                               </div>
                                                            </div>

                                                            <div className=' col-xl-3 '>

                                                                <h5>Order Placed {order.order_date}</h5>
                                                            </div>

                                                            <div className='col-xl-2 '>
                                                                <h5>Total:{order.total_price}</h5>
                                                            </div>


                                                            <div className=' col-xl-1 '>
                                                                <img src={imgView} width={20} height={20} alt="" onClick={(e) => {
                                                                    getOneOrder(order.order_id);
                                                                    handleModalShow();
                                                                    handleShow();
                                                                }}/>





                                                            </div>
                                                            <div className=' col-xl-1 dateIcon'>


                                                                <DatePicker
                                                                    selected={startDate}

                                                                    onChange={(date) => {

                                                                        handleDelverDate(order.order_id, date)
                                                                    }}

                                                                    customInput={<CustomDatePickerInput />}
                                                                />



                                                            </div>
                                                            <div className='col-xl-2 '>

                                                                <Select options={status}
                                                                        defaultValue={{
                                                                            value: `${order.order_status}`,
                                                                            label: `${order.order_status}`
                                                                        }}
                                                                        onChange={(e) => {
                                                                    console.log("selected urllllllllllllll", e,order.order_id)
                                                                            handleOrderStatus(order.order_id, e.value)


                                                                }} />

                                                            </div>
                                                        </li>
                                                    )
                                                })}


                                            </ul>
                                        </div>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="sixth">
                                        <div className={`bg-light p-3 ${style.approval}`}>
                                            <h6>wallet: {userInfo ? userInfo.wallet : ''}</h6>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="seventh">
                                        <div className={`bg-light p-3 ${style.approval}`}>
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
                                                            <button className="btn btnCreateAddd btn-block my-3" type="submit">Send</button>
                                                        </div>


                                                    </div>




                                                </form>
                                                <hr className={`${style.hr}`}/>
                                                <div className={``} style={{maxHeight:'400px', overflowY:"scroll"}}>
                                                    {allMsg.map((item) => {
                                                        const itemId = item[0];


                                                        return (
                                                            <div key={itemId} className={`${style.msg} p-3 my-2`}>
                                                                <div className={`${style.msgTitle} d-flex justify-content-between`}>
                                                                    <h5>{item[1]}</h5>

                                                                </div>
                                                                <div className={`${style.msgBody}`}>
                                                                    <p>{item[2]}</p>
                                                                </div>
                                                                <div className={`text-end`}>
                                                                    <button className="btn btnCreateAddd btn-block" type="submit" onClick={(e)=>{
                                                                        setMsgTitle(item[1])
                                                                        setMsgBody(item[2])
                                                                        handleSubmit(e)

                                                                    }}>Send</button>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}

                                                </div>




                                            </div>
                                        </div>
                                    </Tab.Pane>

                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>






                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered show={show} onHide={handleClose} className="">

                    <Modal.Body>
                        <div className={`${style.modelOrder}`}>
                            <div>
                                <div className={`${style.innerModelDiv} d-flex justify-content-between`}>
                                    <h5>
                                        order details
                                    </h5>
                                    <h5>
                                        arriving {oneOrders ? oneOrders.delivery_date : " "}
                                    </h5>
                                    <h5>
                                        {oneOrders ? oneOrders.shipping_status : " "}
                                    </h5>

                                </div>

                                <div className={`${style.innerModelDiv} row`}>
                                   <div className={`col-lg-6`}>
                                       <h5>
                                           shiping address
                                       </h5>


                                       <p>
                                           {oneOrders ? oneOrders.shipping_address : " "}
                                       </p>
                                   </div>
                                    <div className={`col-lg-6`}>
                                        <h5>
                                           Order Status
                                        </h5>


                                        <p>
                                            {oneOrders ? oneOrders.order_status : " "}
                                        </p>
                                    </div>






                                </div>
                                <h5 className='mt-4'>
                                    order Items
                                </h5>
                                <div className={``}>
                                    {orderItems.map((item, index) => {
                                        return (
                                            <div key={index} className='d-flex'>

                                                <div className={`${style.itemImg} mb-2`}>
                                                    <img src={`data:image/png;base64,${item.product_image}`} alt="" />
                                                </div>
                                                <div className='d-flex align-items-center'>
                                                    <div>
                                                        <h5 className='text-capitalize'>{item.product_name}</h5>
                                                        <p className='text-capitalize'>({`${item.size_or_weight_value} ${item.size_or_weight_unit}`})</p>
                                                        <p className='text-capitalize'>{item.price}</p>
                                                    </div>

                                                </div>
                                            </div>

                                        )
                                    })
                                    }
                                </div>



                            </div>

                        </div>

                    </Modal.Body>

                    <button className={`close-my-modal`} onClick={handleClose} >
                        <img src={closeImg} alt=" close Image" style={{ width:"40px" , height:"40px" }}   />
                    </button>
                </Modal>





            </div>
        </section>
      
      </>

    );
}

export default Profile;
