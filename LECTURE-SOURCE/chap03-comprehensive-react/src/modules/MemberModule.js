
/* 초기값 */
import {createAction, createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션타입 */
const SIGNUP_SUCCESS = 'member/SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'member/SIGNUP_FAILURE';
const LOGIN_SUCCESS = 'member/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'member/LOGIN_FAILURE';

/* 액션 함수 */
export const { member : { signupSuccess, signupFailure, loginSuccess, loginFailure } } = createActions({
    [SIGNUP_SUCCESS] : () => ({ signupSuccess : true }),
    [SIGNUP_FAILURE] : () => ({ signupSuccess : false }),
    [LOGIN_SUCCESS] : () => ({ loginSuccess : true }),
    [LOGIN_FAILURE] : () => ({ loginSuccess : false })
});

/* 리듀서 함수 */
const memberReducer = handleActions({
    [SIGNUP_SUCCESS] : (state, { payload }) => payload,
    [SIGNUP_FAILURE] : (state, { payload }) => payload,
    [LOGIN_SUCCESS] : (state, { payload }) => payload,
    [LOGIN_FAILURE] : (state, { payload }) => payload
}, initialState);

export default memberReducer;