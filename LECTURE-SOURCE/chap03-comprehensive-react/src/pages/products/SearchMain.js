import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callProductCategoryListAPI, callProductSearchListAPI} from "../../apis/ProductAPICalls";
import ProductList from "../../components/lists/ProductList";
import PagingBar from "../../components/common/PagingBar";

function SearchMain() {

    const dispatch = useDispatch();
    const [searchParams]= useSearchParams(); //
    const productName = searchParams.get('value'); //get 메소드로 꺼낼 값 꺼냄 //파라미터
    const {products} = useSelector(state => state.productReducer);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(callProductSearchListAPI({productName, currentPage}));
    }, [productName, currentPage]);

    return (
        <>
            {products && //이거 뺴먹어서 새로고침할때 data없다고 오류났음
                <>
                    <ProductList data={products.data}/>
                    <PagingBar pageInfo={products.pageInfo} setCurrentPage={setCurrentPage}/>
                </>
            }
        </>
    );

}
export default SearchMain;
