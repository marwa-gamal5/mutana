import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from '../../../axiosConfig/instanse';
import Sidebar from '../../../components/AdminSidebar/AdminSidebar';

import cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select'

// import EditFile from '../CropImage/ImageEdit'
// import Dropzone from '../Dropzone/Dropzone';
import axios from 'axios'
import { useDispatch } from "react-redux";
import changeimageList from "../../../store/Actions/imagelist";
import { useParams } from 'react-router-dom';
import style from "./Order.module.css"
// import { Height } from '@mui/material/Icon';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import imgDelete from "../../../assets/product/delete.webp";
import imgPlus from "../../../assets/product/plus.webp";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export default function Order() {

    const [status, setStatus] = useState([]);
    const [defualtstatus, setDefaultStatus] = useState([]);



    const { id } = useParams();
    const [name, setName] = useState([]);
    const [address, setAddress] = useState([]);
    const [certificate, setcertificate] = useState([]);
    const [Image, setImage] = useState([]);
    const [Image11, setImage11] = useState([]);
    const [SizeImage, setSizeImage] = useState([]);
    const [VendorOption, setVendorOption] = useState([]);
    const [StoreOption, setStoreOption] = useState([]);
    const [CategoryOption, setCategoryOption] = useState([]);
    const [CountryOption, setCountryOption] = useState([]);
    const [sizeOeWeight, setsizeOeWeight] = useState();
    const [Notes, setNotes] = useState([]);
    const [languageList, setLanguageList] = useState([]);
    const [selectedCatOption, setSelectedCatOption] = useState();
    const [sizeOrWeghtId, setSizeOrWeghtId] = useState('');
    const defStatus = useRef(null);
    const viewAllStatus = async (endpoint) => {


        await axiosInstance.post('payment/get_orders_admin_by_statuses', {
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

            setStatus(res.data.success);
             setDefaultStatus(res.data.success[0].status);
             defStatus.current = res.data.success[0].status;
             console.log("statussssss", res.data.success[0].status)
        })
            .catch((err) => {
                console.log("err", err)
            });
    }


    console.log("selected category", selectedCatOption);


    const langList = useSelector(state => state.langList.langList);

    console.log(langList);

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


    function DeleteAlert(id, test) {
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
                if (test === 'sizeImg') {
                    DaleteSizeImg(id)
                } else {
                    DaleteItem(id)
                }

            }
        })
    }

    const DaleteItem = async (itemId) => {
        await axiosInstance.post(`store/delete_certificates`, {
            token: token,
            id: itemId
        }).then(res => {

            console.log("delete cert res", res)
            if (res.data.success) {

                let index = certificate.findIndex(ele => ele.id === itemId);
                certificate.splice(index, 1)
                setcertificate([...certificate]);

                // fetchOneItem(id)
                showAlert('Certificate deleted successfully', "success")
            } else {
                let message = res.data.error;
                showAlert(message, 'error');
            }
        });
    }
    const DaleteSizeImg = async (itemId) => {

        console.log("delete", sizeOeWeight)
        await axiosInstance.post(`store/delete_s_w_img`, {
            token: token,
            id: itemId,
            size_or_weight: sizeOeWeight

        }).then(res => {

            console.log("delete cert res", res)
            if (res.data.success) {

                let index = certificate.findIndex(ele => ele.id === itemId);
                certificate.splice(index, 1)
                setcertificate([...certificate]);



                showAlert('Image deleted successfully', "success")
                // fetchOneItem(id)
            } else {
                let message = res.data.error;
                showAlert(message, 'error');
            }
        });
    }

    const [selectedFile, setSelectedFile] = useState("");
    const [errorMessage1, setErrorMessage1] = useState('');
    const [invalid, setInvalid] = useState(false);

    const filesSelected = (e, index, test) => {
        console.log("selected", e.target.files[0])
        console.log("#############333333333selected tessssssssssssst", test)

        setSelectedFile(e.target.files[0]);
        let file = e.target.files[0]
        let fileIndex = index;
        if (validateSelectedFile(e.target.files[0]) == false) {
            setInvalid(true)
            setErrorMessage1("File size is greater than maximum limit 100KB");

        } else {
            setInvalid(false)
            setErrorMessage1("");


            if (test === 'add') {
                Image[fileIndex] = file;
                setImage([...Image]);
                updateProductImg()
            } else if (test === 'size') {
                SizeImage[fileIndex] = file;
                setSizeImage([...SizeImage]);
                updateSizeImg()
            } else if (test === 'certImg') {
                // setCertImage(file)
                updateCertImg(file)
            } else if (test = 'sizeImg') {
                addSizeImg(file)
            }
        }

    }



    const updateProductImg = () => {
        // e.preventDefault();

        const formData = new FormData();
        // console.log("Price", Price[0])
        // console.log("size", sizeOeWeight[0])
        console.log("image[0]", Image[0])
        formData.append('token', token);
        formData.append('id', id);
        formData.append('image', Image[0]);
        console.log("image", Image[0])



        let { data } = axiosInstance.post(`store/update_product_img`, formData, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "multipart/form-data"



            }
        }).then(res => {
            console.log("updateeee res img", res)

            if (res.data.success) {
                console.log("updateeee res img", res)
                // fetchOneItem(id)

            }else {
                console.log("res one from else :", res.data.error);
                showAlert(res.data.error, "error");
            }

        }).catch(err => {
            console.log("err one", err);
        })
    };
    const updateSizeImg = () => {

        console.log("updateSizeImg in Size", sizeOrWeghtId)
        const formData = new FormData();
        console.log("image[0]", SizeImage[0])
        formData.append('token', token);
        formData.append('id', id);
        formData.append('image', SizeImage[0]);
        formData.append('size_or_weight_id', sizeOrWeghtId);

        let { data } = axiosInstance.post(`store/update_s_w_img`, formData, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "multipart/form-data"



            }
        }).then(res => {

            if (res.data.success) {
                console.log("updateeee res img", res)

                showAlert("Image Update Successfuly", 'success')

                // fetchOneItem(id)
            }
            else {
                console.log("res one from else :", res.data.error);
                showAlert(res.data.error, "error");
            }

        }).catch(err => {
            console.log("err one", err);
        })
    };
    const updateCertImg = (file) => {
        console.log("updateSizeImg in Cert", sizeOrWeghtId)
        const formData = new FormData();
        console.log("image cert", file)
        formData.append('token', token);
        formData.append('id', id);
        formData.append('image', file);




        let { data } = axiosInstance.post(`store/add_one_certificates`, formData, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "multipart/form-data"



            }
        }).then(res => {
            console.log("################updateeee res img in cert ", res)



            if(res.data.success) {
                console.log("updateeee res img", res)
                showAlert("Image Adedd Successfuly", 'success')
                // fetchOneItem(id)


            }else {
                console.log("res one from else :", res.data.error);
                showAlert(res.data.error, "error");
            }

        }).catch(err => {
            console.log("err one", err);
        })
    };


    const addSizeImg = (file) => {

        console.log("updateSizeImg in size idddddddddddddddd", sizeOrWeghtId)
        const formData = new FormData();
        console.log("image cert", file)
        formData.append('token', token);
        formData.append('id', sizeOrWeghtId);
        formData.append('image', file);
        formData.append('size_or_weight', sizeOeWeight);

        let { data } = axiosInstance.post(`store/add_one_s_w_img`, formData, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "multipart/form-data"



            }
        }).then(res => {
            console.log("################updateeee res img in size image ", res.data)

            if(res.data.success) {
                console.log("updateeee res img", res)
                showAlert("Image Adedd Successfuly", 'success')
                // fetchOneItem(id)

            }else if(res.data.error){
                console.log("res one from else :", res.data.error);
                showAlert(res.data.error, "error");
            }

        }).catch(err => {
            console.log("err one", err);
        })
    };

    useEffect(() => {
        setLanguageList(langList);
        console.log(name);
        console.log(address);

    }, [langList, name, address, Image11]);


    const cat = [];
    const getAllCategories = async () => {

        await axiosInstance.post(`/store/view_all_categories_admin`, {
            token: token,
            lang: currentLanguageCode

        })
            .then(response => {

                console.log("response Category", response)

                // setCategory(response.data.success);

                response.data.success.map((ele, index) => {
                    cat.push({ value: ele.org.id, label: ele.org.name });
                })

                setCategoryOption(cat)
            })
            .catch(error => {
                console.log("error", error);
            });
    };
    const count = [];
    const getAllCountry = async () => {

        await axiosInstance.post(`/user/countries`, {
            token: token,
            lang: currentLanguageCode

        })
            .then(response => {

                console.log("response country", response)

                // setCategory(response.data.success);

                response.data.countries.map((ele, index) => {
                    count.push({ value: ele[0], label: ele[1] });
                })

                setCountryOption(count)
            })
            .catch(error => {
                console.log("error", error);
            });
    };

    const st = [];
    async function getStore() {
        await axiosInstance.post(`store/view_all_stores`, {
            token: token,
            lang: currentLanguageCode,
            seller_id: 1
        }).then(res => {
            console.log("all store", res);
            // setStore(res.data.success);
            res.data.success.map((ele, index) => {
                st.push({ value: ele.org.id, label: ele.org.name });
            })

            setStoreOption(st)
        }).catch(err => {
            console.log(err);
        });
    }

    const ve = [];
    async function getVendors() {
        await axiosInstance.post(`store/view_all_vendors`, {
            token: token,
            lang: currentLanguageCode
        }).then(res => {
            console.log("get vendors", res);

            res.data.success.map((ele, index) => {
                ve.push({ value: ele.org.id, label: ele.org.name });
            })
            setVendorOption(ve)
        }).catch(err => {
            console.log(err);
        });
    }
    useEffect(() => {
        getAllCategories()
        getAllCountry()
        getStore()
        getVendors()
        // fetchOneItem(id)
    }, []);






    //################################### dropzone code #####################################

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFiles1, setSelectedFiles1] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessage11, setErrorMessage11] = useState('');
    const [validFiles, setValidFiles] = useState([]);
    const [validFiles1, setValidFiles1] = useState([]);
    const modalImageRef = useRef();
    const modalRef = useRef();
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);
    const [unsupportedFiles1, setUnsupportedFiles1] = useState([]);
    const [imageSent, setImageSent] = useState([]);
    const [imageRecive, setImageRecive] = useState([]);

    // const  rl,setImageUrl = useState(null);

    const dispatch = useDispatch();




    const handleFiles = (e, test) => {

        const files = e.target.files;

        console.log("files from handle: ", files)
        if (test == "imgs") {
            const maxFiles = 5; // Set your desired maximum number of files here

            if (files.length > maxFiles) {
                showAlert(`You can only upload a maximum of  ${maxFiles}  files.`, 'error');
                e.target.value = null; // Clear the selected files
                return;
            }
            for (let i = 0; i < files.length; i++) {


                if (validateSelectedFile(files[i])) {
                    setSelectedFiles(prevArray => [...prevArray, files[i]]);
                } else {
                    // add a new property called invalid
                    files[i]['invalid'] = true;
                    // add to the same array so we can display the name of the file
                    setSelectedFiles(prevArray => [...prevArray, files[i]]);
                    // set error message
                    setErrorMessage("Invalid Image Size Less than 100KB");

                    setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
                }


            }
        } else {


            for (let i = 0; i < files.length; i++) {


                if (validateSelectedFile(files[i])) {
                    setSelectedFiles1(prevArray => [...prevArray, files[i]]);
                } else {
                    // add a new property called invalid
                    files[i]['invalid'] = true;
                    // add to the same array so we can display the name of the file
                    setSelectedFiles1(prevArray => [...prevArray, files[i]]);
                    // set error message
                    setErrorMessage1("Invalid Image Size Less than 100KB");

                    setUnsupportedFiles1(prevArray => [...prevArray, files[i]]);
                }


            }
        }


    }


    const fileSize = (size) => {
        if (size === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }

    const removeFile = (name, test) => {


        console.log('Removing file ', name, "##############", test)


        if (test == "imgs") {
            const validFileIndex = validFiles.findIndex(ele => ele.fileInfo.name === name);
            validFiles.splice(validFileIndex, 1);
            // update validFiles array


            setValidFiles([...validFiles]);
            const selectedFileIndex = selectedFiles.findIndex(ele => ele.name === name);
            selectedFiles.splice(selectedFileIndex, 1);
            // update selectedFiles array
            setSelectedFiles([...selectedFiles]);

            const unsupportedFileIndex = unsupportedFiles.findIndex(ele => ele.name === name);
            if (unsupportedFileIndex !== -1) {
                unsupportedFiles.splice(unsupportedFileIndex, 1);
                // update unsupportedFiles array
                setUnsupportedFiles([...unsupportedFiles]);
            }
        } else {
            const validFileIndex = validFiles1.findIndex(ele => ele.fileInfo.name === name);
            validFiles1.splice(validFileIndex, 1);
            // update validFiles array


            setValidFiles1([...validFiles1]);
            const selectedFileIndex = selectedFiles.findIndex(ele => ele.name === name);
            selectedFiles1.splice(selectedFileIndex, 1);
            // update selectedFiles array
            setSelectedFiles1([...selectedFiles1]);

            const unsupportedFileIndex = unsupportedFiles1.findIndex(ele => ele.name === name);
            if (unsupportedFileIndex !== -1) {
                unsupportedFiles1.splice(unsupportedFileIndex, 1);

                setUnsupportedFiles1([...unsupportedFiles1]);
            }
        }
    }

    const openImageModal = (file) => {
        const reader = new FileReader();
        modalRef.current.style.display = "block";
        console.log("file in open model", file.fileInfo);
        reader.readAsDataURL(file.fileInfo);
        reader.onload = function (e) {
            console.log("modelImage", modalImageRef);
            modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
        }

    }


    const closeModal = () => {
        modalRef.current.style.display = "none";
        modalImageRef.current.style.backgroundImage = 'none';
    }





    console.log("alldata upload", imageRecive)
    const base64ToArrayBuffer = base64 => {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    };





    const validateSelectedFile = (selectedFile) => {
        // const MIN_FILE_SIZE = 2048 // 1MB
        const MAX_FILE_SIZE = 100 //


        console.log("selected", selectedFile, selectedFile.size)

        const fileSizeKiloBytes = selectedFile.size / 1024



        console.log("fileSizeKiloBytes", fileSizeKiloBytes, MAX_FILE_SIZE, fileSizeKiloBytes > MAX_FILE_SIZE)

        if (fileSizeKiloBytes > MAX_FILE_SIZE) {


            //   setErrorMsg("File size is greater than maximum limit 2M");

            //   setIsSuccess(false)
            return false;
        } else {
            return true;
        }


    };





    useEffect(() => {
        let filteredArray = selectedFiles.reduce((file, current) => {

            // console.log("current", file, current);
            const x = file.find(item => item.name === current.name);
            if (!x) {
                return file.concat([current]);
            } else {
                return file;
            }
        }, []);




        const imageDataUrlsss = [];

        filteredArray.map((file) => {



            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                const imageDataUrl = reader.result;
                imageDataUrlsss.push({ fileName: imageDataUrl, fileInfo: file });


                console.log("imagesurlssss in on load", imageDataUrlsss);
                setValidFiles(imageDataUrlsss);
                setImagLength(imageDataUrlsss.length)


            }


        });
        const img = [];
        console.log("befor iffff", imageDataUrlsss);

        console.log("imaaaaaaage", img)
        dispatch(changeimageList(img));

    }, [selectedFiles]);
    useEffect(() => {
        let filteredArray = selectedFiles1.reduce((file, current) => {

            // console.log("current", file, current);
            const x = file.find(item => item.name === current.name);
            if (!x) {
                return file.concat([current]);
            } else {
                return file;
            }
        }, []);




        const imageDataUrlsss = [];

        filteredArray.map((file) => {



            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                const imageDataUrl = reader.result;
                imageDataUrlsss.push({ fileName: imageDataUrl, fileInfo: file });


                console.log("imagesurlssss in on load", imageDataUrlsss);
                setValidFiles1(imageDataUrlsss);
                setImagLength(imageDataUrlsss.length)


            }


        });
        //      const img = [] ;
        //   console.log("befor iffff", imageDataUrlsss);

        //  console.log("imaaaaaaage", img)
        // dispatch(changeimageList(img));

    }, [selectedFiles1]);



    console.log("sizeOrwieght", sizeOeWeight)

    const [endpoint, setEndpoint] = useState('')
    useEffect(() => {
        const endpoint = window.location.pathname.split('/')[1];
        setEndpoint(endpoint);


        viewAllStatus(endpoint);
    }, []);



    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (

        <>
            <Sidebar />

            <div id='home_page' className='page-section-home min-vh-100 overflow-auto'>
                <div className='editTabs mt-5'>
                    <Tabs
                        defaultActiveKey={status.length> 0 ? `${status[0].status}` : "pending"}
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        {status.map((item, index) => {
                            return(
                                <Tab  eventKey={`${item.status}`} title={`${item.status}`}>

                                    <TableContainer className='TableContainer' component={Paper}>



                                        <Table className='Table'>
                                            <TableHead>
                                                <TableRow >
                                                    <TableCell className='TableHeadCell fw-bold'>Order ID</TableCell>
                                                    <TableCell className='TableHeadCell fw-bold'>Order Date </TableCell>
                                                    <TableCell className='TableHeadCell fw-bold'>Deliver Date</TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {item.orders.map((item, index) => (
                                                        <TableRow className='TableRow' key={index}>
                                                            <TableCell className='TableCell'>{item[0]}</TableCell>
                                                            <TableCell className='TableCell'>{item[1]}</TableCell>
                                                            <TableCell className='TableCell'>{item[2]}</TableCell>



                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </Tab>
                            )
                        })}

                    </Tabs>


                </div>

            </div>

        </>

    )

}
