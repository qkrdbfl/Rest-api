import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const POST_SUCCESS = 'order/POST_SUCCESS';
const GET_ORDERS = 'order/GET_ORDERS';

/* 액션 함수 */
export const { order : { postSuccess, getOrders } } = createActions({
    [POST_SUCCESS] : () => ({ postSuccess : true }),
    [GET_ORDERS] : result => ({ orders : result.data }),
});

/* 리듀서 */
const orderReducer = handleActions({
    [POST_SUCCESS] : (state, { payload }) => payload,
    [GET_ORDERS] : (state, { payload }) => payload,
}, initialState);

export default orderReducer;