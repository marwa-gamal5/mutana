export default function changeUserInfo(data){

    return{
        type:"SET_USERINFO",
        payload:data
    }

}


export  function userType(data) {
    return {
        type: 'USER_TYPE',
        payload:data

    }
}