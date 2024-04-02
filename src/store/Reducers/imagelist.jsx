const INITIAL_STATE={
    imagelist:[]
}

export default function imagelistReducer(state=INITIAL_STATE,action){

    switch(action.type){
        case "SET_IMAGELIST":
            return {...state,imagelist: action.payload}
        default:
            return state
    }

}