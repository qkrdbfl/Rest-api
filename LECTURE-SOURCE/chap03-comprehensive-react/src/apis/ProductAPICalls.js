import {authRequest, request} from "./Api";
import {
    getAdminProduct,
    getAdminProducts,
    getProduct,
    getProducts,
    postSuccess,
    putSuccess
} from "../modules/ProductModule";
import {toast} from "react-toastify";

export const callProductListAPI = ({ currentPage = 1 }) => {

    return async (dispatch, getState) => {

        const result = await request('GET', `/api/v1/products?page=${currentPage}`);
        console.log('callProductListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getProducts(result));//액션 함수 호출
        }

    }
};

export const callProductCategoryListAPI = ({ categoryCode, currentPage = 1 }) => {

    return async (dispatch, getState) => {

        const result = await request('GET', `/api/v1/products/categories/${categoryCode}?page=${currentPage}`);
        console.log('callProductCategoryListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getProducts(result));//액션 함수 호출
        }

    }
};

export const callProductSearchListAPI = ({ productName, currentPage = 1 }) => {

    return async (dispatch, getState) => {

        const result = await request('GET', `/api/v1/products/search?productName=${productName}&page=${currentPage}`); //url
        console.log('callProductSearchListAPI result : ', result);

        if(result.status === 200) { //200번이면 저장한다.
            dispatch(getProducts(result));//액션 함수 호출
        }

    }
};

export const callProductDetailAPI = ({ productCode }) => {

    return async (dispatch, getState) => {

        const result = await request('GET', `/api/v1/products/${productCode}`); //url
        console.log('callProductDetailAPI result : ', result);

        if(result.status === 200) { //200번이면 저장한다.
            dispatch(getProduct(result)); //getProduct 에 s있고 없고 조심.
        }

    }
};

export const callAdminProductListAPI = ({ currentPage = 1 }) => {

    return async (dispatch, getState) => {

        const result
            = await authRequest.get(`/api/v1/products-management?page=${currentPage}`);

        console.log('callAdminProductListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getAdminProducts(result));//액션 함수 호출
        }

    }
};

export const callAdminProductRegistAPI = ({registRequest}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.post('/api/v1/products', registRequest);
        console.log('callAdminProductListAPI result : ', result);

        if (result.status === 201){
            dispatch(postSuccess());
            toast.info("상품 등록이 완료되었습니다.");
        }
    }
}

export const callAdminProductAPI = ({productCode}) => { //등록

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/api/v1/products-management/${productCode}`); //get
        console.log('callAdminProductAPI result : ', result);

        if (result.status === 200){
            dispatch(getAdminProduct(result));
        }
    }
}

export const callAdminProductModifyAPI = ({productCode, modifyRequest}) => { // 수정

    return async (dispatch, getState) => {

        const result = await authRequest.put(`/api/v1/products/${productCode}`, modifyRequest);
        console.log('callAdminProductModifyAPI result : ', result);

        if (result.status === 201){
            dispatch(putSuccess());
            toast.info("상품 수정이 완료되었습니다.");
        }
    }
}