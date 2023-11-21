import {authRequest} from "./Api";
import {getReview, getReviews, postSuccess} from "../modules/ReviewModule";
import {toast} from "react-toastify";

export const callReviewsAPI = ({productCode, currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/api/v1/reviews/product/${productCode}?page=${currentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });

        console.log('callReviewsAPI result : ', result);

        if(result?.status === 200) {
            dispatch(getReviews(result));
        }
    }
}

export const callReviewAPI = ({reviewCode }) => { //s뺌

    return async (dispatch, getState) => {

        const result
            = await authRequest.get(`/api/v1/reviews/${reviewCode}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });

        console.log('callReviewAPI result : ', result);

        if(result?.status === 200) {
            dispatch(getReview(result));
        }
    }
}

export const callReviewRegistAPI = ({ registRequest }) => { //자바 객체라서

    return async (dispatch, getState) => {

        const result = await authRequest.post('/api/v1/reviews',
            JSON.stringify(registRequest), //json문자열로 바꾸기
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
            if(e.response.status === 404) {
                toast.error("리뷰 작성이 불가한 제품입니다.");
            } else if(e.response.status === 409) {
                toast.error("리뷰가 이미 작성 되어 작성 불가합니다.");
            }
        });

        console.log('callReviewRegistAPI result : ', result);// 잘 저장해서 수행 됐는지 확인

        if(result?.status === 201) {
            dispatch(postSuccess());
        }
    }
}