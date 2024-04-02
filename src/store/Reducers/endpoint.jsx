const InitialState = {

    endpoint:''

}

export default function endpointReducer(state = InitialState, action) {

    switch (action.type) {


        case 'SET_ENDPOINT':
            return {...state,endpoint: action.payload}
        default:
            return state
    }

}