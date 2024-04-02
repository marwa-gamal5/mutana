
const InitialState = {
  
    userid:''

}

export default function userIdReducer(state = InitialState, action) {

    switch (action.type) {

  
        case 'SET_USERID':
            return {...state,userid: action.payload}
        default:
            return state
    }

}