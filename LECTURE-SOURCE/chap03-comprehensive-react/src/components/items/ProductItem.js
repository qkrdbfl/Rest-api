import {useNavigate} from "react-router-dom";
import {useState} from "react";

function ProductItem({product}) {

    const navigate = useNavigate();
    const [amount, setAmount] = useState(1);

    //구매 수량 변경 이벤트
    const onChangeAmountHandler = e => {
        setAmount(e.target.value);
    }

    //구매하기 버튼 이벤트
    const onClickOrderHandler = () => {
        // 이동하는 component로 정보를 전달하기 위해 2번째 인자로 객체레 state 속성으로 전달할수 있다.
        navigate('/order', {state : {product, amount}}); //{product, amount}를 안감싸서 보내서 오류 났다.
    }

    // 리뷰보기 버튼 이벤트
    const onClickReviewHandler = () => {
        navigate(`/review/product/${product.productCode}`)
    }

    return (
        <>
            <div className="img-div">
                <img src={product.productImageUrl} alt={product.productName}/>
                <button
                    onClick={onClickReviewHandler}
                    className="review-btn"
                >
                    리뷰보기
                </button>
            </div>
            <div className="description-div">
                <table className="description-table">
                    <tbody>
                    <tr>
                        <th>상품코드</th>
                        <td>{product.productCode}</td>
                    </tr>
                    <tr>
                        <th>상품명</th>
                        <td>{product.productName}</td>
                    </tr>
                    <tr>
                        <th>상품 가격</th>
                        <td>{product.productPrice}</td>
                    </tr>
                    <tr>
                        <th>상품 설명</th>
                        <td>{product.productDescription}</td>
                    </tr>
                    <tr>
                        <th>구매 가능 수량</th>
                        <td>{product.productStock}</td>
                    </tr>
                    <tr>
                        <th>구매 수량</th>
                        <td><input type="number" min="1" onChange={onChangeAmountHandler} value={amount}/></td>
                    </tr>
                    </tbody>
                </table>
                <button
                    className="product-buy-btn"
                    onClick={onClickOrderHandler}
                >
                    구매 하기
                </button>
            </div>
        </>
    );
}

export default ProductItem;