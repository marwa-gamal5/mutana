import axiosInstance from '../../axiosConfig/instanse';
import axios from 'axios'
export default function changeWebTrans(langCode){
   console.log("langCode", langCode)
    return (dispatch)=>{
      return axios.post("http://192.168.11.100:8015/user/Web_trans",{
        lang: langCode,
      }).then((res) => {

        console.log("Success" , res)
        dispatch({type:"SET_WEB_TRANS",payload:res.data.languages[0].web});
        }).catch((err) => {
            console.log(err);
        })

    }
}


