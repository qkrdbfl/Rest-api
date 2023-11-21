import {authRequest} from "./Api";
import {toast} from "react-toastify";
import {getOrders, postSuccess} from "../modules/OrderModule";

export const callOrderRegistAPI = ({ registRequest }) => {// 여기 자스 객체 넘김 그래서 그냥 넘기면 안됨 json 문자열로 바꿔서 넘겨야함

    return async (dispatch, getState) => {

        const result = await authRequest.post('/api/v1/order',
            JSON.stringify(registRequest),//여기 두번쨰 인자에 registRequest 넘길때 json 으로 바꾸기
            {
                headers : {
                    'Content-Type' : 'application/json'//세번쨰 인자에 설정 넣기
                }
            }).catch(e => {
            if(e.response.status === 400) {
                toast.error("주문 불가 상품입니다.");
            } else if(e.response.status === 409) {
                toast.error("재고 부족으로 상품 구매가 불가합니다.");
            }
        });

        console.log('callOrderRegistAPI result : ', result);// 잘 수행 됐는지 확인

        if(result?.status === 201) {
            dispatch(postSuccess());
        }
    }
}

export const callOrdersAPI = ({ currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/api/v1/order?page=${currentPage}`, // get방식
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });

        console.log('callOrdersAPI result : ', result);

        if(result?.status === 200) {
            dispatch(getOrders(result));
        }
    }
}
