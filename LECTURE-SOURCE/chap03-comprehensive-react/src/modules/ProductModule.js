import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const GET_PRODUCTS = 'product/GET_PRODUCTS'; //'product/GET_PRODUCTS' : 액션의 타입이 됨
const GET_PRODUCT = 'product/GET_PRODUCT';
const GET_ADMIN_PRODUCTS = 'product/GET_ADMIN_PRODUCTS'; //GET_ADMIN_PRODUCTS
const POST_SUCCESS = 'product/POST_SUCCESS';
const GET_ADMIN_PRODUCT = 'product/GET_ADMIN_PRODUCT'; // GET_ADMIN_PRODUCT
const PUT_SUCCESS = 'product/PUT_SUCCESS';

/* 액션 함수 */
export const {product: {getProducts, getProduct, getAdminProducts, postSuccess, getAdminProduct, putSuccess}} = createActions({ //액션 객체를 만들어 반환 //s가 붙고 안붙고를 구분해야함.
    [GET_PRODUCTS]: result => ({products: result.data}), //{product : {getProducts}}은 위 액션타입에서 중첩 구조분해할당으로 가져옴
    [GET_PRODUCT]: result => ({product: result.data}),
    [GET_ADMIN_PRODUCTS]: result => ({adminProducts: result.data}),
    [POST_SUCCESS] : () => ({postSuccess : true}),
    [GET_ADMIN_PRODUCT]: result => ({adminProduct: result.data}),
    [PUT_SUCCESS] : () => ({putSuccess : true}),
});

/* 리듀서 */
const productReducer = handleActions({
    [GET_PRODUCTS]: (state, {payload}) => payload, // 여기서 반환 되는 값이 state에 저장 되는 값
    [GET_PRODUCT]: (state, {payload}) => payload,
    [GET_ADMIN_PRODUCTS]: (state, {payload}) => payload,
    [POST_SUCCESS] : (state, {payload}) => payload,
    [GET_ADMIN_PRODUCT]: (state, {payload}) => payload,
    [PUT_SUCCESS] : (state, {payload}) => payload,
}, initialState);

export default productReducer;