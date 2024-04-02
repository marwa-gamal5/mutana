import { combineReducers } from 'redux';

import languageReducer from './language';
import isauthReducer from './isauth';
import userinfoReducer from './userinfo';
import useridReducer from './userid';
import whitelistReducer from './whitelist';
import usersettingReducer from './usersetting';
import langListReducer from './langlist';
import endpointReducer from "./endpoint.jsx";
export default combineReducers({
    language:languageReducer,
    isauth:isauthReducer,
    userinfo:userinfoReducer,
    userid:useridReducer,
    whitelist:whitelistReducer,
    usersetting:usersettingReducer,
    langList:langListReducer,
    endpoint:endpointReducer
})

