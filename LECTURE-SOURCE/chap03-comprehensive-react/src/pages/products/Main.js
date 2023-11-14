import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callProductListAPI} from "../../apis/ProductAPICalls";
import ProductList from "../../components/lists/ProductList";
import PagingBar from "../../components/common/PagingBar";

function Main() {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { products } = useSelector(state => state.productReducer);

    useEffect(() => {
        /* 모든 상품에 대한 정보 요청 */
        dispatch(callProductListAPI({currentPage}));
    }, [currentPage]);


    return (
        <>
            { products
                &&
                <>
                    <ProductList data={products.data}/>
                    <PagingBar pageInfo={products.pageInfo} setCurrentPage={setCurrentPage}/>
                </>
            }
        </>
    )
}

export default Main;