
const InitialState = {
  
    whitelist:[]

}

export default function whitelistReducer(state = InitialState, action) {

    switch (action.type) {

  
        case 'SET_WHITELIST':
            return {...state,whitelist: action.payload}
        default:
            return state
    }

}