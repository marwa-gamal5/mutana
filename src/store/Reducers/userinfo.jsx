
const InitialState = {
  
    userinfo:{},
    userType:''

}


export default function userinfoReducer(state = InitialState, action) {

    switch (action.type) {

  
        case 'SET_USERINFO':
            return {...state,userinfo: action.payload}


        case "USER_TYPE":
            return {
                ...state, userType : action.payload
            }
        default:
            return state

    }

}