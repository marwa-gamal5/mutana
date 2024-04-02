
const InitialState = {
  
    isauth:false

}

export default function isauthReducer(state = InitialState, action) {

    switch (action.type) {

  
        case 'SET_ISAUTH':
            return {...state,isauth: action.payload}
        default:
            return state
    }

}