import {combineReducers} from "redux";
import productReducer from "./ProductModule";
import memberReducer from "./MemberModule";
import orderReducer from "./OrderModule";
import reviewReducer from "./ReviewModule";

const rootReducer = combineReducers({
    productReducer, memberReducer, orderReducer, reviewReducer
});

export default rootReducer;