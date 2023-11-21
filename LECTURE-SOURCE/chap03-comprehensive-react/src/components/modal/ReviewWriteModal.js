import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callReviewRegistAPI} from "../../apis/ReviewAPICalls";
import {useNavigate} from "react-router-dom";

function ReviewWriteModal({productCode, setProductReviewWriteModal}) {

    const [form, setForm] = useState({productCode});
    const dispatch = useDispatch();
    const {postSuccess} = useSelector(state => state.reviewReducer);
    const navigate = useNavigate();

    useEffect(() => {
        if (postSuccess === true){ //작성하면 (true)
            navigate(`/review/product/${productCode}`); //리뷰 목록으로 돌아가게
        }
    }, [postSuccess]);


    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const onClickProductReviewHandler = () => { //리뷰작성 누르면 세이브 하라는 요청 보내기
        dispatch(callReviewRegistAPI({registRequest : form}));
    };

    return (
        <div className="modal">
            <div className="modal-container">
                <div className="product-review-modal-div">
                    <h1>리뷰</h1>
                    <input
                        type="text"
                        name="reviewTitle"
                        placeholder="리뷰 제목"
                        onChange={onChangeHandler}
                    />
                    <textarea
                        placeholder="리뷰 본문"
                        name="reviewContent"
                        onChange={onChangeHandler}
                    ></textarea>
                    <button onClick={onClickProductReviewHandler}>리뷰 작성하기</button>
                    <button
                        style={{
                            border: "none",
                            margin: 0,
                            fontSize: "10px",
                            height: "10px",
                        }}
                        onClick={() => setProductReviewWriteModal(false)}
                    >
                        돌아가기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReviewWriteModal;
