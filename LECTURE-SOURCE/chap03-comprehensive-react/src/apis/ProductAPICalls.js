import {request} from "./Api";
import {getProduct, getProducts} from "../modules/ProductModule";

export const callProductListAPI = ({ currentPage = 1 }) => {

    return async (dispatch, getState) => {

        const result = await request('GET', `/products?page=${currentPage}`);
        console.log('callProductListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getProducts(result));//액션 함수 호출
        }

    }
};

export const callProductCategoryListAPI = ({ categoryCode, currentPage = 1 }) => {

    return async (dispatch, getState) => {

        const result = await request('GET', `/products/categories/${categoryCode}?page=${currentPage}`);
        console.log('callProductCategoryListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getProducts(result));//액션 함수 호출
        }

    }
};

export const callProductSearchListAPI = ({ productName, currentPage = 1 }) => {

    return async (dispatch, getState) => {

        const result = await request('GET', `/products/search?productName=${productName}&page=${currentPage}`); //url
        console.log('callProductSearchListAPI result : ', result);

        if(result.status === 200) { //200번이면 저장한다.
            dispatch(getProducts(result));//액션 함수 호출
        }

    }
};

export const callProductDetailAPI = ({ productCode }) => {

    return async (dispatch, getState) => {

        const result = await request('GET', `/products/${productCode}`); //url
        console.log('callProductDetailAPI result : ', result);

        if(result.status === 200) { //200번이면 저장한다.
            dispatch(getProduct(result)); //getProduct 에 s있고 없고 조심.
        }

    }
};