import React,{useState,useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axiosInstance from '../../../axiosConfig/instanse';
import cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import Sidebar from '../../../components/AdminSidebar/AdminSidebar';

export default function EditStores() {

  const { id } = useParams();

  const [name ,  setName] = useState([]);
  const [address ,  setAddress] = useState([]);
  const [description ,  setDescription] = useState([]);
  const [languageList , setLanguageList] = useState([]);
  const [stateError , setStateError] = useState(false);

  let token = localStorage.getItem("token");

  const currentLanguageCode = cookies.get('i18next') || 'en';

 async function getStore() {
  await axiosInstance.post(`store/view_one_store`,{
    id:id,
    token: token,
    seller_id: 1
  }).then(res => {
    console.log("view one store" ,res);

    name[0] = res.data.success.org_store.name;
    address[0] = res.data.success.org_store.address;
    // description[0] = res.data.success.org_store.description;

    res.data.success.translations.map((ele , index)=>{
      name[index+1] = ele.name;
      address[index+1] = ele.address;
      // description[index+1] = ele.description;
    })

    setName([...name]);
    setAddress([...address]);
    // setDescription([...description]);

  }).catch(err =>{
    console.log(err);
  });
}



  const langList =  useSelector(state=>state.langList.langList);

  console.log(langList);

  const navigate = useNavigate();

  function showAlert(message, icon) {
    Swal.fire({
      title: message,
      icon: icon,
      showConfirmButton: false,
      timer: 1500
    });
  }


  const handleSubmit = (e) => {
      e.preventDefault();
      let { data } = axiosInstance.post(`store/update_store`,{
        token: token,
        id: id,
        name: name[0],
        address: address[0],
        seller_id: 1
      }).then(res => {
        console.log("from org :",res);
          if(res.data.success){
            languageList.map((lang, index)=>{
              let langCode = lang.code ;
              let LangIndex = index + 1;
              console.log(langCode);
              console.log(stateError);
              if(stateError == false){
                console.log(stateError);
                editStoresT(langCode , LangIndex); 
              }
            });
          }else{
            console.log("res one from else :", res.data.error);
            showAlert(res.data.error, "error");
          }         
      }).catch(err => {
        console.log("err one", err);
      });
  };


  async function editStoresT(langCode , LangIndex){
    let lang = langCode;
    let index = LangIndex;
    await axiosInstance.post(`store/update_store_T`,
        {
          token: token,
          id: id,
          lang:lang,
          name: name[index],
          address: address[index],
          seller_id: 1
        }
    ).then(res => {
        console.log("res ttt", res);
        if(res.data.error){
          console.log("res t from if error :", res.data.error);
          showAlert(res.data.error, "error");
          setStateError(true);
        }else{
          console.log(LangIndex);
          console.log(languageList.length);
            if(LangIndex == languageList.length){
                showAlert(res.data.success, "success");
                navigate("/store");
            }
        }

    }).catch(err => {
      console.log("err t", err);
    });

}

    useEffect(() => {
      getStore();

      setLanguageList(langList);
      setStateError(false)
      // console.log(name);
      // console.log(address);
      // console.log(description);
    },[langList]);

  

  return (

    <>
       <Sidebar />

      <div id='home_page' className='page-section-home'>

        <div className='d-flex justify-content-between'>
          <h3 className="m-2" >
            {/* <i className="fa-regular fa-square-plus me-3" style={{ color: "#CD5C5C " }}></i> */}
            Edit Store
          </h3>
          {/* <Link to="/store" className='fa-solid fa-arrow-right text-danger fs-2 text-decoration-none'></Link> */}
        </div>

        <form method="POST" onSubmit={handleSubmit} className="my-3 create_accont">
          <div className='row'>
            <div className='col-lg-6'>
              <label className="text-muted my-2">Stores Name</label>
              <input className=" form-control mb-3 input" type="text"
                placeholder="Stores Name"
                required autoFocus
                value={name[0]}
                onChange={(e)=>{
                  name[0] = e.target.value ;
                  setName([...name]);
                }} />

            </div>
            <div className='col-lg-6'>
              <label className="text-muted my-2">Address</label>
              <input className=" form-control mb-3 input" type="text"
                placeholder="Address"
                required autoFocus
                value={address[0]}
                onChange={(e) => {
                  address[0] = e.target.value ;
                  setAddress([...address]);
                }} />

            </div>
            {/* <div className='col-lg-4'>
              <label className="text-muted my-2">Description</label>
              <input className=" form-control mb-3 input" type="text"
                placeholder="Description"
                required autoFocus
                value={description[0]}
                onChange={(e) => {
                  description[0] = e.target.value ;
                  setDescription([...description]);
                }} />
            </div> */}

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
                        <div className='col-lg-6'>
                          <label className="text-muted my-2">Stores Name</label>
                          <input className=" form-control mb-3 input" type="text"
                            placeholder="Stores Name"
                            required autoFocus
                            value={name[index + 1]}
                            onChange={(e) => {
                              let fieldIndex = index + 1 ;
                              name[fieldIndex] = e.target.value ;
                              setName([...name]);
                            }} />
            
                        </div>
                        <div className='col-lg-6'>
                          <label className="text-muted my-2">Address</label>
                          <input className=" form-control mb-3 input" type="text"
                            placeholder="Address"
                            required autoFocus
                            value={address[index + 1]}
                            onChange={(e) => {
                              let fieldIndex = index + 1 ;
                              address[fieldIndex] = e.target.value ;
                              setAddress([...address]);
                            } }/>
            
                        </div>
                        {/* <div className='col-lg-4'>
                          <label className="text-muted my-2">Description</label>
                          <input className=" form-control mb-3 input" type="text"
                            placeholder="Description"
                            required autoFocus
                            value={description[index + 1]}
                            onChange={(e) => {
                              let fieldIndex = index + 1 ;
                              description[fieldIndex] = e.target.value ;
                              setDescription([...description]);
                            }} />
                        </div> */}
                      </div>
                    </div>

                  </>
                  )
              })
                
              }
            <div className='d-flex justify-content-center'>
              <button type="submit" className={` btn btn-danger mt-3 text-capitalize  fw-bold `}>Edit</button>
            </div>
        </form>
      </div>

    </>

  )

}
