
import * as React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/AdminSidebar/AdminSidebar';
import style from './Category.module.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import CreateUrl from '../CreateUrl/CreateUrl';
// import EditUrl from '../EditUrl/EditUrl';
import Swal from "sweetalert2";
import "../../../index.css";
import { useSelector } from "react-redux";

import axiosInstance from '../../../axiosConfig/instanse';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
import DeleteIcon from '@mui/material/Icon';
import imgEdit from '../../../assets/product/edit.webp'
import imgView from '../../../assets/product/veiw.webp'
import imgDelete from '../../../assets/product/delete.webp'
import imgAdd from '../../../assets/product/add.webp'
import imgAddbtn from '../../../assets/add-button.webp'
import closeImg from '../../../assets/exit-icon.webp'
import searchImg from '../../../assets/search.webp'
function Category() {

    const [Category, setCategory] = useState([]);
    const [itemId, setItemId] = useState();
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [urlType, seturlType] = useState('private');
    const [urlName, seturlName] = useState('');
    const [testModal, setTestModal] = useState('');
    const [funModal, setFunModal] = useState();
    const [oneUrl, setOneUrl] = useState([]);

    const [Createbtn, setCreatebtn] = useState(true)
    const [Editbtn, setEditbtn] = useState(true)
    const [Deletebtn, setDeletebtn] = useState(true)
    const [Showbtn, setShowbtn] = useState(true)
    const [endpoint, setEndpoint] = useState('')
    const [addOrEdit, setAddOrEdit] = useState('')
    const [oldImage, setoldImage] = useState('')

    const [name, setName] = useState([]);
    const [image, setimage] = useState([]);
    const [description, setDescription] = useState([]);
    
    let token = localStorage.getItem('token');
    const [languageList, setLanguageList] = useState([]);
    const [stateError, setStateError] = useState(false);

    const langList = useSelector(state => state.langList.langList);



    const currentLanguageCode = useSelector((state) => state.language.lang);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        setTestModal('')
        setName([])
        setimage([])
        setDescription([])
    };
    const handleShow = () => setShow(true);
    function afterDelete(message, icon) {
        Swal.fire({
            title: message,
            icon: icon,
            showConfirmButton: false,
            timer: 1500
        });
    }


    function DeleteAlert(id) {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(id);
            }
        })
    }


    function showAlert(message, icon) {
        Swal.fire({
            title: message,
            icon: icon,
            showConfirmButton: false,
            timer: 2000
        });
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = (id) => {
        const filteredData = data.filter((item) => item.id !== id);
        setData(filteredData);
    };

    const getAllItems = async () => {

        await axiosInstance.post(`/store/view_all_categories_admin`, {
            token: token,
            lang: currentLanguageCode

        })
            .then(response => {

                console.log("response Category", response)

                setCategory(response.data.success);
            })
            .catch(error => {
                console.log("error", error);
            });
    };


    useEffect(() => {
        getAllItems();
    }, [currentLanguageCode])

    async function deleteData(id) {
        let message;
        let icon;
        console.log('id', id)

        try {

            const response = await axiosInstance.post(`/store/delete_category`, {
                token: token,
                id: id
            });

            console.log("res in delete", response)
            if ('success' in response.data) {
                let message = response.data.success;
                afterDelete(message, 'success');
            } else if ('error' in response.data) {
                let error = response.data.error;
                afterDelete(error, 'error');
            }

            let index = Category.findIndex(ele => ele.id === id);
            setCategory(Category.splice(index, 1));
            getAllItems();

        } catch (error) {
            console.log(error)
            message = error.message;
            icon = "error";
            afterDelete(message, icon);
        }



    }



    const fetchOneItem = async (id) => {

        await axiosInstance.post(`/store/view_one_category`, {

            token: token,
            id: id
        })
            .then(res => {

                console.log("response one", res)

                name[0] = res.data.success.org_category.name;
                
                description[0] = res.data.success.org_category.description;
              
                 setoldImage(res.data.success.org_category.image)
                const imageUrl = URL.createObjectURL(
                    new Blob([base64ToArrayBuffer(res.data.success.org_category.image)], { type: 'image/jpeg' })
                );
                image[0] = imageUrl;
             
                res.data.translations.map((ele , index)=>{
                  name[index+1] = ele.name;
                  image[index+1] = ele.image;
                  description[index+1] = ele.description;
                })
                setName([...name]);
                setDescription([...description]);
                setimage([...image])
                getAllItems();
            })
            .catch(error => {
                console.log("error",error);
            });
    };


    const base64ToArrayBuffer = base64 => {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    };
    const handleFormEditSubmit = async () => {

   
        formData.append('token',token);
        formData.append('id',itemId);
        formData.append('name',name[0]);
        formData.append('description',description[0]);

        
       
 

        console.log("data111", name[0], description[0],image[0])
        console.log("data111form data",formData)
        let { data } = axios.post(`http://192.168.11.100:8015/store/update_caegory`,formData, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "multipart/form-data"
              
      
      
            }
        } ).then(res => {
            console.log("res edittt category33333333333333", res)
            if (res.data.success) {
               
                languageList.map((lang, index) => {
                    let langCode = lang.code;
                    let LangIndex = index + 1;
                    console.log(langCode);
                    console.log(stateError);
                    if (stateError == false) {
                        console.log(stateError);
                        editItemsT( langCode, LangIndex);
                    }

                })

            } else {
                console.log("res one from else :", res);
                showAlert(res.data.error, "error");
            }

        }).catch(err => {
            console.log("err one", err);
        })
    };
    const updateItemImage = async () => {

   
             console.log("imge one update", image[0])
           
        
            formData.append('token',token);
            formData.append('id',itemId);
            formData.append('thumbnail',image[0]);
            formData.append('image',image[0]);  
        
       
 

        console.log("data111", image[0])
        console.log("data111form data",formData)
        let { data } = axios.post(`http://192.168.11.100:8015/store/update_category_img`,formData, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "multipart/form-data"
              
      
      
            }
        } ).then(res => {
            console.log("res edittt category image", res)
            const imageUrl = URL.createObjectURL(
                new Blob([base64ToArrayBuffer(res.data.img)], { type: 'image/jpeg' })
            );
            image[0] = imageUrl;
        setimage([...image])

        

        }).catch(err => {
            console.log("err one edit image", err);
        })
    };

    const formData = new FormData();
    async function editItemsT( langCode, LangIndex) {
       
        let lang = langCode;
        let index = LangIndex;

        formData.append('token',token);
        formData.append('id',itemId);
        formData.append('lang',lang);
        formData.append('name',name[index]);
        formData.append('description',description[index]);
       
       
       
        console.log(name[index],
            description[index], image[index]);
            console.log("data111 fromt", name[0], description[0],image[0])
            console.log("data111 form t formdata",formData)
        await  axios.post(`http://192.168.11.100:8015/store/update_category_T`,formData, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "multipart/form-data"
              
      
      
            }
        } ).then(res => {
            console.log("res t", res);
            if (res.data.error) {
                console.log("res t from if error :", res.data.error);
                showAlert(res.data.error, "error");
                setStateError(true);
            } else {
                console.log(LangIndex);
                console.log(languageList.length);
                if (LangIndex == languageList.length) {
                    showAlert(res.data.success, "success");
                    getAllItems()
                    handleClose()
                }
            }



        }).catch(err => {
            console.log("err t", err);
        });

    }


    async function addItemsT(itemId, langCode, LangIndex) {
        let id = itemId;
        let lang = langCode;
        let index = LangIndex;

        formData.append('token',token);
        formData.append('id',id);
        formData.append('lang',lang);
        formData.append('name',name[index]);
        formData.append('description',description[index]);
       
       
       
        console.log(name[index],
            description[index], image[index]);
            console.log("data111 fromt", name[0], description[0],image[0])
            console.log("data111 form t formdata",formData)
        await  axios.post(`http://192.168.11.100:8015/store/add_category_T`,formData, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "multipart/form-data"
              
      
      
            }
        } ).then(res => {
            console.log("res t", res);
            if (res.data.error) {
                console.log("res t from if error :", res.data.error);
                showAlert(res.data.error, "error");
                setStateError(true);
            } else {
                console.log(LangIndex);
                console.log(languageList.length);
                if (LangIndex == languageList.length) {
                    showAlert(res.data.success, "success");
                    getAllItems()
                }
            }



        }).catch(err => {
            console.log("err t", err);
        });

    }


  
    const handleFormSubmit = async () => {
         

        formData.append('token',token);
        formData.append('name',name[0]);
        formData.append('description',description[0]);
        formData.append('thumbnail',image[0]);
        formData.append('image',image[0]);
 

        console.log("data111", name[0], description[0],image[0])
        console.log("data111form data",formData)
        let { data } = axios.post(`http://192.168.11.100:8015/store/add_category`,formData, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "multipart/form-data"
              
      
      
            }
        } ).then(res => {
            console.log("res add category33333333333333", res)
            if (res.data.success) {
                let itemId = res.data.id;
                languageList.map((lang, index) => {
                    let langCode = lang.code;
                    let LangIndex = index + 1;
                    console.log(langCode);
                    console.log(stateError);
                    if (stateError == false) {
                        console.log(stateError);
                        addItemsT(itemId, langCode, LangIndex);
                    }

                })

            } else {
                console.log("res one from else :", res);
                showAlert(res.data.error, "error");
            }

        }).catch(err => {
            console.log("err one", err);
        })
    };


    const validateSelectedFile = (selectedFile) => {

        console.log("validate ", selectedFile);

        const MAX_FILE_SIZE = 100

        console.log("selected", selectedFile, selectedFile.size)

        const fileSizeKiloBytes = selectedFile.size / 1024

        console.log("fileSizeKiloBytes", fileSizeKiloBytes, MAX_FILE_SIZE, fileSizeKiloBytes > MAX_FILE_SIZE)

        if (fileSizeKiloBytes > MAX_FILE_SIZE) {
            return false;
        } else {
            return true;
        }
    };

    const [selectedFile, setSelectedFile] = useState("");

    const [errorMessage, setErrorMessage] = useState('');
    const [invalid, setInvalid] = useState(false);

    const filesSelected = (e, index,test) => {
        console.log("selected", e.target.files[0])
        setSelectedFile(e.target.files[0]);
          let file = e.target.files[0]
          let fileIndex = index;
        if (validateSelectedFile(e.target.files[0]) == false) {
            setInvalid(true)
            setErrorMessage("File size is greater than maximum limit 100KB");
            
        } else {
            setInvalid(false)
            setErrorMessage("");
            
            image[fileIndex] = file;
            setimage([...image]);
            if(test === 'edit'){
                updateItemImage()
            }
        }

    }
    const handleTypeChange = (event) => {
        seturlType(event.target.value);
    }







    const testUrl = async (endPoint) => {
        await axiosInstance.post(`/user/get_my_urls`, {

            token: token,
            url: endPoint
        })
            .then(response => {

                if (response.data.success) {
                    setCreatebtn(response.data.success.C);
                    setDeletebtn(response.data.success.D);
                    setShowbtn(response.data.success.R);
                    setEditbtn(response.data.success.U)

                }
                getAllItems(endPoint)
                console.log("response test url", response)


            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {

        const endpoint = window.location.pathname.split('/')[1];
        setEndpoint(endpoint);


        if (testModal === 'add') {
            setOneUrl({})
            handleShow()
            setFunModal(true)
            setAddOrEdit('Add')
        } else if (testModal === 'edit') {
            fetchOneItem(itemId)
            handleShow();
            setFunModal(false)
            setAddOrEdit('Edit')
            setErrorMessage("")
        }
    }, [testModal, itemId]);

    useEffect(() => {
        setLanguageList(langList);
        console.log(name);
        console.log(image);
        console.log(description);
    }, [langList, name, image, description]);

// pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


    // Assuming you have the 'Products' array defined

    const filteredItems = Category.filter((item) =>
        item.trans.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    console.log("currentItems", currentItems);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const isPreviousDisabled = currentPage === 1;
    const isNextDisabled = currentPage === totalPages;

    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button  className={`btn btn-sm me-1 ${currentPage === i ? 'btn-success' : 'btn-outline-success'} `}
                         key={i}
                         onClick={() => handlePageChange(i)}
                         disabled={currentPage === i}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <>

            <Sidebar />
            <section id='home_page' className='page-section-home py-2 min-vh-100'>
                <div className=' px-3'>
                    <div className='page_content'>
                        <div className=" ">
                            <div className="row justify-content-center mx-2">
                                <div className="col-lg-12 row my-4">
                                    <div className='col-6 p-0'>
                                        <h2 >Category</h2>
                                    </div>

                                    <br />
                                    <br />
                                </div>
                            </div>




                        </div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className='row justify-content-center '>
                                    <div className='col-12 '>
                                        <div className=' row align-items-end justify-content-end'>
                                            <div className='col-lg-3'>

                                                <div className="search-container mx-lg-3 my-2">
                                                    <input
                                                        type="text"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                        placeholder="Search"
                                                    />
                                                   <img src={searchImg} className='search-icon' width={16} height={16} alt=""/>

                                                </div>


                                            </div>
                                            <div className={` text-end mx-lg-3 col-lg-2 my-2`}>
                                                <Link className={` btn    btnCreateAdd d-flex w-lg-75 mx-auto `} type="button" onClick={() => {
                                                    setTestModal('add');

                                                }}>  <img src={imgAddbtn} className=' me-2' width={24} height={24} alt=""/>Category</Link>


                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <TableContainer className='TableContainer mt-5' component={Paper}>


                                    <Table className='Table mt-3'>
                                        <TableHead>
                                            <TableRow >
                                                <TableCell className='TableHeadCell fw-bold'>ID</TableCell>
                                                <TableCell className='TableHeadCell fw-bold'>Category Image</TableCell>
                                                <TableCell className='TableHeadCell fw-bold'>Category Name</TableCell>
                                                <TableCell className='TableHeadCell fw-bold'>Description</TableCell>
                                                <TableCell className='TableHeadCell fw-bold'>Edit</TableCell>
                                                <TableCell className='TableHeadCell fw-bold'>Delete</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {currentItems.map((item, index) => (
                                                <TableRow className='TableRow' key={index}>
                                                    <TableCell className='TableCell'>{index + 1}</TableCell>
                                                    <TableCell className='TableCell'><img className='rounded-circle' src={`data:image/png;base64, ${item.org.image}`} width={60} height={60} alt=""/></TableCell>
                                                    <TableCell className='TableCell'>{item.trans.name}</TableCell>
                                                    <TableCell className='TableCell'>{item.trans.description}</TableCell>
                                                    <TableCell className='TableCell '>
                                                        <div className="table-data-feature justify-content-between">

                                                            <Link type='button' className="item"   onClick={()=>{
                                                                setItemId(item.org.id);
                                                                setTestModal('edit')

                                                            }}>

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

                                <div className='d-flex justify-content-center'>
                                    <div className="pagination">
                                        <button  className={`btn btn-sm me-1 btn-success ${isPreviousDisabled ? 'disabled' : ''}`}
                                                 onClick={handlePreviousPage}
                                                 disabled={isPreviousDisabled}
                                        >
                                            Previous
                                        </button>
                                        {renderPaginationButtons()}
                                        <button className={`btn btn-sm ms-1 btn-success ${isNextDisabled ? 'disabled' : ''}`}
                                                onClick={handleNextPage}
                                                disabled={isNextDisabled}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>



                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{addOrEdit} Category</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <form method="POST" className="my-3 create_accont">
                                            <div className='row my-2'>
                                                <div className='col-lg-6'>
                                                    <label className="text-muted my-2">Category Name</label>
                                                    <input className=" form-control mb-3 input" type="text"
                                                        placeholder="Category Name"
                                                        required autoFocus
                                                        value={name[0]}
                                                        onChange={(e) => {

                                                            name[0] = e.target.value;
                                                            setName([...name]);
                                                        }} />

                                                </div>

                                                <div className='col-lg-6'>
                                                    <label className="text-muted my-2">Description</label>
                                                    <input className=" form-control mb-3 input" type="text"
                                                        placeholder="Description"
                                                        required autoFocus
                                                        value={description[0]}
                                                        onChange={(e) => {

                                                            description[0] = e.target.value;
                                                            setDescription([...description]);
                                                        }} />
                                                </div>
                                                { addOrEdit === 'Add' ? ( <div className='col-lg-12'>
                                                    <label className="text-muted my-2">Select Image</label>
                                                    <div className={`d-flex `}>
                                                        <input
                                                            className="file-input d-block form-control"
                                                            type="file"
                                                            onChange={(e)=>{
                                                                filesSelected(e, 0,'add')
                                                            }}
                                                            name="file"
                                                            accept="image/*"
                                                        />

                                                    </div>
                                                    <p className="text-danger">{errorMessage}</p>

                                                    

                                                </div>):(
                                                    <div className='col-lg-12 row'>
                                                        <div className='col-4'>
                                                            <img className='rounded-circle' width={100} height={100} src={image[0]} alt=""/>
                                                        </div>
                                                        <div className='col-8'>
                                                        <label className="text-muted my-2">Select Another Image</label>
                                                    <div className={`d-flex `}>
                                                        <input
                                                            className="file-input d-block form-control          "
                                                            type="file"
                                                            onChange={(e)=>{
                                                                filesSelected(e, 0,'edit')
                                                            }}
                                                            name="file"
                                                            accept="image/*"
                                                        />

                                                    </div>
                                                    <p className="text-danger">{errorMessage}</p>
                                                            
                                                        </div>
                                                   

                                                 

                                                </div>
                                                )}
                                               

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
                                                        <div dir={langDir} className='my-2'>
                                                            <h2>{lang.name}</h2>
                                                            <div className='row'>
                                                                <div className='col-lg-6'>
                                                                    <label className="text-muted my-2">Category Name</label>
                                                                    <input className=" form-control mb-3 input" type="text"
                                                                        placeholder="Category Name"
                                                                        required autoFocus 
                                                                        value={name[index+1]}
                                                                        onChange={(e) => {
                                                                            let fieldIndex = index + 1;
                                                                            name[fieldIndex] = e.target.value;
                                                                            setName([...name]);
                                                                        }} />

                                                                </div>

                                                                <div className='col-lg-6'>
                                                                    <label className="text-muted my-2">Description</label>
                                                                    <input className=" form-control mb-3 input" type="text"
                                                                        placeholder="Description"
                                                                        required autoFocus
                                                                        value={description[index+1]}
                                                                        onChange={(e) => {
                                                                            let fieldIndex = index + 1;
                                                                            description[fieldIndex] = e.target.value;
                                                                            setDescription([...description]);
                                                                        }} />
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
                                        <Button className={`${style.btnCreate}`} onClick={() => {
                                            if (funModal === true) {
                                                handleFormSubmit()
                                            } else {
                                                handleFormEditSubmit()
                                            }

                                        }}>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                            </div>


                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Category;





