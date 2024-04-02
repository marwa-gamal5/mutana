
const InitialState = {
  
    usersetting:{}

}

export default function usersettingReducer(state = InitialState, action) {

    switch (action.type) {

  
        case 'SET_USERSETTING':
            return {...state,usersetting: action.payload}
        default:
            return state
    }

}