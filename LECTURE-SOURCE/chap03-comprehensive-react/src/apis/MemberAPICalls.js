import {json} from "react-router-dom";
import {authRequest, request} from "./Api";
import {getProfile, loginFailure, loginSuccess, signupFailure, signupSuccess} from "../modules/MemberModule";
import {toast} from "react-toastify";
import {saveToken} from "../utils/TokenUtils";

export const callSignupAPI = ({signupRequest}) => {

    return async (dispatch, getState) => {
        const result = await request(
            'POST',
            '/member/signup',
            {'Content-Type' : 'application/json'},  //자바 문자이기때문에
            JSON.stringify(signupRequest)  //json 문자열로 바꿔준다

        );

        console.log('callSignupAPI result : ', result);

        if (result?.status === 201){
            //result 객체가 null 또는 undefined가 아니라면, status 속성의 값을 가져옵니다.
            //201: 숫자 201은 일반적으로 HTTP 상태 코드 중 하나로, "Created" 상태를 나타냅니다. 새로운 리소스가 성공적으로 생성되었음을 나타냅니다.
            dispatch(signupSuccess());

        }else {
            dispatch(signupFailure());
            toast.warning("회원 가입에 실패하였습니다. 다시 시도해주세요");
        }

    }
}


export const callLoginAPI = ({loginRequest}) => {

    return async (dispatch, getState) => {

        console.log(loginRequest);
        const result = await request(
            'POST',
            '/member/login',
            {'Content-Type': 'application/json'},  //자바 문자이기때문에
            JSON.stringify(loginRequest)  //json 문자열로 바꿔준다

        );

        console.log('callSignupAPI result : ', result);
        // console.log('callLoginAPI result.headers[\'Access-Token\']:', result.headers['Access-Token']);
        // console.log('callLoginAPI result.headers[\'Refresh-Token\']:', result.headers['Refresh-Token']);
        if (result?.status === 200){
            saveToken(result.headers);
            dispatch(loginSuccess());
        }else {
            dispatch(loginFailure());
        }
    }
}

export const callMemberAPI = () => {
    return async (dispatch, getState) => {
        const result = await authRequest.get("/api/v1/member");  //get() post put delete가 들어갈 수 있음
        console.log('callMemberAPI result : ', result );

        if (result.status === 200){  //200번 상태로 result 의 상태가 돌아 왔다면
            dispatch(getProfile(result));
        }
    }
}