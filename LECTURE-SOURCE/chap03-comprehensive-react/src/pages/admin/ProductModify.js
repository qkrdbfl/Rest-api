import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callAdminProductAPI, callAdminProductModifyAPI, callAdminProductRegistAPI} from "../../apis/ProductAPICalls";

function ProductModify () {

    const {productCode} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 읽기 모드와 수정 모드를 전환하는 state
    const [modifyMode, setModifyMode] = useState(false);
    const [form, setForm] = useState({});
    const [imageUrl, setImageUrl] = useState('');
    const imageInput = useRef();
    const {adminProduct, putSuccess} = useSelector(state => state.productReducer);

    // 최초 랜더링 시 상품 상세 정보 조회
    useEffect(() => {
        dispatch(callAdminProductAPI({productCode}));
    }, []);

    // 수정 성공 시 상품 목록으로 이동
    useEffect(() => {
        if (putSuccess === true){
            navigate('/product-management', {replace : true})
        }
    }, [putSuccess]);

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

    // 수정 모드로 변환하는 이벤트
    const onClickModifyModeHandler = ()  => {
        setModifyMode(true);
        setForm({...adminProduct}); //{기존에 가져왔던 상품 가져옴} -> Form으로 옮겨감
    }

    // 상품 수정 요청하는 이벤트
    const onClickProductUpdateHandler = () => {
        const formData = new FormData();
        formData.append("productImg", imageInput.current.files[0]);
        formData.append("productRequest", new Blob([JSON.stringify(form)], {type : 'application/json'}));

        dispatch(callAdminProductModifyAPI({productCode, modifyRequest : formData}));
    }

    // 상품 삭제 요청 이벤트
    const onClickProductDeleteHandler = () => {}

    const inputStyle = !modifyMode ? { backgroundColor : 'gray'} : null;

    return (
        <div>
            <div className="product-button-div">
                <button
                    onClick={ () => navigate(-1) }
                >
                    돌아가기
                </button>
                {!modifyMode &&
                    <button
                        onClick={ onClickModifyModeHandler }
                    >
                        수정 모드
                    </button>
                }
                { modifyMode &&
                    <button
                        onClick={ onClickProductUpdateHandler }
                    >
                        상품 수정 저장하기
                    </button>
                }
                <button
                    onClick={ onClickProductDeleteHandler }
                >
                    상품 삭제 하기
                </button>
            </div>
            { adminProduct  &&
                <div className="product-section">
                    <div className="product-info-div">
                        <div className="product-image-div">
                            <img
                                className="product-img"
                                src={ !imageUrl ? adminProduct.productImageUrl : imageUrl }
                                alt="preview"
                            />
                            <input
                                style={ { display: 'none' }}
                                type="file"
                                name='productImage'
                                accept='image/jpg,image/png,image/jpeg,image/gif'
                                onChange={ onChangeImageUpload }
                                ref={ imageInput }
                            />
                            <button
                                className="product-image-button"
                                onClick={ onClickImageUpload }
                                style={ inputStyle }
                                disabled={ !modifyMode }
                            >
                                이미지 업로드
                            </button>
                        </div>
                    </div>
                    <div className="product-img-info">
                        <table>
                            <tbody>
                            <tr>
                                <td><label>상품이름</label></td>
                                <td>
                                    <input
                                        name='productName'
                                        placeholder='상품 이름'
                                        className="product-info-input"
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? adminProduct.productName : form.productName }
                                        readOnly={ !modifyMode }
                                        style={ inputStyle }
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
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? adminProduct.productPrice : form.productPrice }
                                        readOnly={ !modifyMode }
                                        style={ inputStyle }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>판매 여부</label></td>
                                <td>
                                    <label>
                                        <input
                                            type="radio"
                                            name="status"
                                            onChange={ onChangeHandler }
                                            value="usable"
                                            readOnly={ !modifyMode }
                                            checked={ (!modifyMode ? adminProduct.status === 'usable' : form.status === 'usable')  }
                                        />
                                        판매
                                    </label> &nbsp;
                                    <label>
                                        <input
                                            type="radio"
                                            name="status"
                                            onChange={ onChangeHandler }
                                            value="disable"
                                            readOnly={ !modifyMode }
                                            checked={ (!modifyMode ? adminProduct.status === 'disable' : form.status === 'disable')  }
                                        />판매중단</label>
                                </td>
                            </tr>
                            <tr>
                                <td><label>상품 종류</label></td>
                                <td>
                                    <label>
                                        <input
                                            type="radio"
                                            name="categoryCode"
                                            onChange={ onChangeHandler }
                                            value={1}
                                            readOnly={ !modifyMode }
                                            checked={ (!modifyMode ? adminProduct.categoryCode === 1 : form.categoryCode == 1)  }
                                        /> 식사
                                    </label> &nbsp;
                                    <label>
                                        <input
                                            type="radio"
                                            name="categoryCode"
                                            onChange={ onChangeHandler }
                                            value={2}
                                            readOnly={ !modifyMode }
                                            checked={ (!modifyMode ? adminProduct.categoryCode === 2 : form.categoryCode == 2)  }
                                        /> 디저트
                                    </label> &nbsp;
                                    <label>
                                        <input
                                            type="radio"
                                            name="categoryCode"
                                            onChange={ onChangeHandler }
                                            value={3}
                                            readOnly={ !modifyMode }
                                            checked={ (!modifyMode ? adminProduct.categoryCode === 3 : form.categoryCode == 3)  }
                                        /> 음료
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td><label>상품 재고</label></td>
                                <td>
                                    <input
                                        placeholder='상품 재고'
                                        type='number'
                                        name='productStock'
                                        onChange={ onChangeHandler }
                                        className="product-info-input"
                                        value={ !modifyMode ? adminProduct.productStock : form.productStock }
                                        readOnly={ !modifyMode }
                                        style={ inputStyle }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>상품 설명</label></td>
                                <td>
                                    <textarea
                                        className="product-img-input"
                                        name='productDescription'
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? adminProduct.productDescription : form.productDescription }
                                        readOnly={ !modifyMode }
                                        style={ inputStyle }
                                    ></textarea>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    );
}

export default ProductModify;