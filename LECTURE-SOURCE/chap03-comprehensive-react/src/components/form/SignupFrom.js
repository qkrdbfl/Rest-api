import {Form, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {callSignupAPI} from "../../apis/MemberAPICalls";

function SignupForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[form, setForm] = useState({});

    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickSignupHandler = () => {
        //console.log(form);
        dispatch(callSignupAPI({ signupRequest : form }));
    }

    const onClickBackHandler = () => {
        navigate('/');
    }

    return (
        <>
            <h1>회원 가입</h1>
            <input
                type="text"
                name="memberId"
                placeholder="아이디"
                onChange={onChangeHandler}
            />
            <input
                type="password"
                name="memberPassword"
                placeholder="패스워드"
                onChange={onChangeHandler}
            />
            <input
                type="text"
                name="memberName"
                placeholder="이름"
                onChange={onChangeHandler}
            />
            <input
                type="text"
                name="memberEmail"
                placeholder="이메일"
                onChange={onChangeHandler}
            />
            <button
                onClick={ onClickSignupHandler }>
                회원 가입
            </button>
            <button
                onClick={ onClickBackHandler }>
                메인으로
            </button>
        </>
    );
}

export default SignupForm;