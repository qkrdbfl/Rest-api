import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callReviewAPI} from "../../apis/ReviewAPICalls";

function ReviewDetail() {

    const {reviewCode} = useParams();
    const navigate = useNavigate();
    const {review} = useSelector(state => state.reviewReducer);
    const dispatch = useDispatch();

    useEffect(() => { //최초 한번만 호출하게
        dispatch(callReviewAPI({reviewCode}));
    }, []);

    //console.log("reviewCode : ", reviewCode);

    return (
        <>
            {review &&
                <div className="review-detail-table-div">
                    <table className="review-detail-table">
                        <tbody>
                        <tr>
                            <th>제목</th>
                            <td>{review.reviewTitle}</td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td>{review.memberName}</td>
                        </tr>
                        <tr>
                            <th>작성일</th>
                            <td>{review.createdAt}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>{review.reviewContent}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="product-button-div">
                        <button
                            className="back-btn"
                            onClick={() => navigate(-1)}
                        >
                            돌아가기
                        </button>
                    </div>
                </div>
            }
        </>
    );
}

export default ReviewDetail;
