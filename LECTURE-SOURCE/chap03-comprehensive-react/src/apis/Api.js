import axios from "axios";
import {getAccessTokenHandler, getRefreshTokenHandler, saveToken} from "../utils/TokenUtils";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const DEFAULT_URL = `http://${SERVER_IP}:${SERVER_PORT}`;

// 인증이 불필요한 기능을 요청 할때 사용하는 메소드
export const request = async (method, url, headers, data) => {

    console.log(`${DEFAULT_URL}${url}`);
    return await axios({
        method,
        url: `${DEFAULT_URL}${url}`,
        headers,
        data
    })
        .catch(error => console.log(error));
}

//인증이 필요한 기능을 요청할때 사용하는 메소드
export const authRequest = axios.create({
    baseURL: DEFAULT_URL
});

authRequest.interceptors.request.use((config) => {
    config.headers['Access-Token'] = getAccessTokenHandler();
    return config;
});

//첫번쨰 매개변수는 정상 수행했을때, 두번째 매개변수는 실패했을때
authRequest.interceptors.response.use(
    //첫번째 인자로 사용 되는 콜백 함수는 정상 수행시 동작하므로 별도의 동작 없이 진행하도록 함
    (response) => {
        return response;
    },
    // 두번째 인자로 사용 되는 콜백함수는 오류 발생 시 동작하므로 로직을 작성한다.
    async (error) => {

        console.log("error : ", error);

        const {
            config,
            response: {status}
        } = error; //에러 발생시

        if (status === 401) { //401번이 오면
            const originRequest = config;
            //refresh token 전달하여 토큰 재발급 요청
            const response = await postRefreshToken();

            console.log("response : ", response); //응답 화긴

            if (response.status === 200) { //200번
                // 토큰 재발급에 성공했을때  저장
                saveToken(response.headers);
                //실패했던 요청을 다시 요청
                originRequest.headers['Access-Token'] = getAccessTokenHandler();
                return axios(originRequest);
            }
        }

        return  Promise.reject(error);
    });

/* refresh token 전달하여 토큰 재발급 요청하는 api */
export async function postRefreshToken() {

    return await request(
        'POST',
        '/api/v1/refresh-token', //인증 필터를 통과할수 있는 url
        {'Refresh-Token': getRefreshTokenHandler()}
    );
}