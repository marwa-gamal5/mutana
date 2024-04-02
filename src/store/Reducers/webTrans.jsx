
const INITIAL_STATE={
    webTrans:{}
}

export default function webTransReducer(state=INITIAL_STATE,action){

    switch(action.type){
        case "SET_WEB_TRANS":
            return {...state,webTrans: action.payload}
        default:
            return state
    }

}