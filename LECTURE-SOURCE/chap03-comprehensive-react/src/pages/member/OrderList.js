import ReviewWriteModal from "../../components/modal/ReviewWriteModal";
import {ToastContainer} from "react-toastify";
import PagingBar from "../../components/common/PagingBar";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callOrdersAPI} from "../../apis/OrderAPICalls";

function OrderList() {

    const [productReviewWriteModal, setProductReviewWriteModal] = useState(false);
    const [productCode, setProductCode] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const { orders } = useSelector(state => state.orderReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callOrdersAPI({currentPage}));
    }, [currentPage]);

    const onClickReviewHandler = (productCode) => { //리뷰 쓰기
        setProductCode(productCode); //어떤 상품 행을 눌렀는지에 따라
        setProductReviewWriteModal(true); //모달을 보여준다 눌렀을때 true로 바뀌게
    };

    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            {
                productReviewWriteModal &&
                <ReviewWriteModal
                    productCode={productCode}
                    setProductReviewWriteModal={setProductReviewWriteModal}
                />
            }
            {
                orders &&
                <>
                    <div className="payment-div">
                        <h1>결제 정보</h1>
                        <table className="payment-table">
                            <colgroup>
                                <col width="20%" />
                                <col width="40%" />
                                <col width="20%" />
                                <col width="20%" />
                            </colgroup>
                            <thead>
                            <tr>
                                <th>주문일자</th>
                                <th>주문 상품 정보</th>
                                <th>상품금액(수량)</th>
                                <th>리뷰</th>
                            </tr>
                            </thead>
                            <tbody>
                            { orders.data.map(order => (
                                <tr key={order.orderCode}>
                                    <td>{order.orderDate}</td>
                                    <td>{order.productName}</td>
                                    <td>
                                        {order.productPrice}원 ({order.orderAmount}개)
                                    </td>
                                    <td>
                                        <button
                                            className="review-write-button"
                                            onClick={() =>
                                                onClickReviewHandler(order.productCode)
                                            }
                                        >
                                            리뷰 쓰기
                                        </button>
                                    </td>
                                </tr>
                            ))
                            }
                            </tbody>
                        </table>
                    </div>
                    <PagingBar pageInfo={orders.pageInfo} setCurrentPage={setCurrentPage}/>
                </>
            }
        </>
    );
}

export default OrderList;
