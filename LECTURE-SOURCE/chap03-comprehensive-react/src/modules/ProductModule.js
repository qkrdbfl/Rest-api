import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const GET_PRODUCTS = 'product/GET_PRODUCTS'; //'product/GET_PRODUCTS' : 액션의 타입이 됨
const GET_PRODUCT = 'product/GET_PRODUCT';

/* 액션 함수 */
export const { product : { getProducts, getProduct } } = createActions({ //액션 객체를 만들어 반환 //s가 붙고 안붙고를 구분해야함.
    [GET_PRODUCTS] : result => ({ products : result.data }), //{product : {getProducts}}은 위 액션타입에서 중첩 구조분해할당으로 가져옴
    [GET_PRODUCT] : result => ({product : result.data})
});

/* 리듀서 */
const productReducer = handleActions({
    [GET_PRODUCTS] : (state, { payload }) => payload, // 여기서 반환 되는 값이 state에 저장 되는 값
    [GET_PRODUCT] : (state, {payload}) => payload
}, initialState);

export default productReducer;