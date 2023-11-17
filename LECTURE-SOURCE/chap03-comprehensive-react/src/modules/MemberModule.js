/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 타입 */
const SIGNUP_SUCCESS = 'member/SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'member/SIGNUP_FAILURE';
const LOGIN_SUCCESS = 'member/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'member/LOGIN_FAILURE';
const GET_PROFILE = 'member/GET_PROFILE'


/* 액션 함수 */
export const { member : {signupSuccess, signupFailure, loginSuccess, loginFailure, getProfile}} = createActions({
    [SIGNUP_SUCCESS] : () => ({signupSuccess : true}),
    [SIGNUP_FAILURE] : () => ({signupFailure : false}),
    [LOGIN_SUCCESS] : () => ({loginSuccess : true}),
    [LOGIN_FAILURE] : () => ({loginFailure : false}),
    [GET_PROFILE] : (result) => ({profileInfo : result.data})
});

/* 리듀서 함수 */
const memberReducer = handleActions({
    [SIGNUP_SUCCESS] : (state, {payload}) => payload,
    [SIGNUP_FAILURE] : (state, {payload})  => payload,
    [LOGIN_SUCCESS] : (state, {payload}) => payload,
    [LOGIN_FAILURE] : (state, {payload})  => payload,
    [GET_PROFILE] :  (state, {payload}) => payload,
}, initialState);

export default memberReducer;