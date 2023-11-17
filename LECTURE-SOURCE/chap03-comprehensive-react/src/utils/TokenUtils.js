import {jwtDecode} from "jwt-decode";

const BEARER = 'Bearer ';

export const saveToken = (headers) => {  //토큰이 저장되어있으면 로그인 상태임
    localStorage.setItem("access-token", headers['access-token']);
    localStorage.setItem("refresh-token", headers['refresh-token']);
}

export const removeToken = () => { //토큰 지우기
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
}

const getAccessToken = () => window.localStorage.getItem('access-token');

const getRefreshToken = () => window.localStorage.getItem('refresh-token');
const getDecodeAccessToken = () => {
    return getAccessToken() && jwtDecode(getAccessToken());
}

const getDecodeRefreshToken = () => {
    return getRefreshToken() && jwtDecode(getRefreshToken());
}

export const getAccessTokenHandler = () => BEARER + getAccessToken();
export const getRefreshTokenHandler = () => BEARER + getRefreshToken();

export const isLogin = () => {
    // console.log(getDecodeAccessToken());
    // console.log(getDecodeRefreshToken());
    //밑의 두개값이 다 존재해야 true
    return getAccessToken() && getRefreshToken() && (Date.now() < getDecodeRefreshToken().exp * 1000)
    //RefreshToken이 만료되지 않았다면 로그인된것으로 확인한다.
}

export const isAdmin = () => {
    return isLogin() && (getDecodeAccessToken().memberRole === 'ROLE_ADMIN')
    //AccessToken을 기반으로 이사람이 로그인 되어있고 멤버라는 속성이 어드민인지 확인
}