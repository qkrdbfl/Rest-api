import {combineReducers} from "redux";
import productReducer from "./ProductModule";
import memberReducer from "./MemberModule";

const rootReducer = combineReducers({
    productReducer, memberReducer
});

export default rootReducer;