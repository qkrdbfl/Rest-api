import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callAdminProductListAPI, callAdminProductRegistAPI} from "../../apis/ProductAPICalls";

function ProductRegist() {

    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [imageUrl, setImageUrl] = useState('');
    const imageInput = useRef();
    const dispatch = useDispatch();
    const {postSuccess} = useSelector(state => state.productReducer);

    useEffect(() => {
        if (postSuccess === true){
            navigate('/product-management', {replace : true});
        }
    }, [postSuccess]);

    //입력 양식 값 변경 시 state 수정
    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // 이미지 업로드 버튼 클릭시 input type file이 클릭 되도록 하는 이벤트
    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    // 이미지 파일 첨부 시 동작하는 이벤트
    const onChangeImageUpload = () => {
        const fileReader = new FileReader();
        fileReader.onload = e => {
            const {result} = e.target;
            if (result) setImageUrl(result);
        }
        fileReader.readAsDataURL(imageInput.current.files[0]);
    }

    // 상품 등록 버튼 클릭 시 이벤트
    const onClickProductRegistrationHandler = () => {
        // 서버로 전달한 FormData 형태의 객체 설정
        const formData = new FormData(); ///
        formData.append("productImg", imageInput.current.files[0]);
        formData.append("productRequest", new Blob([JSON.stringify(form)], {type: 'application/json'}));

        dispatch(callAdminProductRegistAPI({registRequest : formData}));
    }

    return (
        <div>
            <div className="product-button-div">
                <button
                    onClick={() => navigate(-1)}
                >
                    돌아가기
                </button>
                <button
                    onClick={onClickProductRegistrationHandler}
                >
                    상품 등록
                </button>
            </div>
            <div className="product-section">
                <div className="product-info-div">
                    <div className="product-img-div">
                        {imageUrl &&
                            <img
                                className="product-img"
                                alt="preview"
                                src={imageUrl}
                            />
                        }
                        <input
                            style={{display: 'none'}}
                            type="file"
                            name='productImage'
                            accept='image/jpg,image/png,image/jpeg,image/gif'
                            ref={imageInput}
                            onChange={onChangeImageUpload}
                        />
                        <button
                            className="product-image-button"
                            onClick={onClickImageUpload}
                        >
                            이미지 업로드
                        </button>
                    </div>
                </div>
                <div className="product-info-div">
                    <table>
                        <tbody>
                        <tr>
                            <td><label>상품이름</label></td>
                            <td>
                                <input
                                    name='productName'
                                    placeholder='상품 이름'
                                    className="product-info-input"
                                    onChange={onChangeHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>상품가격</label></td>
                            <td>
                                <input
                                    name='productPrice'
                                    placeholder='상품 가격'
                                    type='number'
                                    className="product-info-input"
                                    onChange={onChangeHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>상품 종류</label></td>
                            <td>
                                <label><input type="radio" onChange={onChangeHandler} name="categoryCode" value="1"/> 식사</label> &nbsp;
                                <label><input type="radio" onChange={onChangeHandler} name="categoryCode"
                                              value="2"/> 디저트</label> &nbsp;
                                <label><input type="radio" onChange={onChangeHandler} name="categoryCode" value="3"/> 음료</label>
                            </td>
                        </tr>
                        <tr>
                            <td><label>상품 재고</label></td>
                            <td>
                                <input
                                    placeholder='상품 재고'
                                    type='number'
                                    name='productStock'
                                    className="product-info-input"
                                    onChange={onChangeHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>상품 설명</label></td>
                            <td>
                                    <textarea
                                        className="textarea-style"
                                        name='productDescription'
                                        onChange={onChangeHandler}
                                    ></textarea>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProductRegist;