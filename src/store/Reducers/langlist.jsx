
const InitialState = {
    langList: [],
}

export default function langListReducer(state = InitialState, action) {

    switch (action.type) {

        case 'SET_LANG_LIST':
            return { ...state, langList: action.payload }
        default:
            return state
    }

}