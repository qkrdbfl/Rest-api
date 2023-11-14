import {useNavigate} from "react-router-dom";
import {useState} from "react";

function Header () {

    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    //로고 클릭 시 메인 페이지로 이동
    const onClickHandler = () => {
        navigate("/");
    }

    //검색어 입력 값 상태 저장
    const onSearchChangeHandler = e => {
        setSearch(e.target.value);
    }

    //Enter 입력 시 검색 결과 화면으로 이동
    const onEnterKeyHandler = e => {
        if (e.key === 'Enter'){
            navigate(`/product/search?value=${search}`);
        }
    }


    function BeforeLogin () {
        return (
            <div>
                <button className="header-btn">로그인</button>|
                <button className="header-btn">회원가입</button>
            </div>
        );
    }

    function AfterLogin () {
        return (
            <div>
                <button className="header-btn">마이페이지</button>|
                <button className="header-btn">로그아웃</button>
            </div>
        );
    }

    return (
        <>
            <div className="header-div">
                <button
                    className="logo-btn"
                    onClick={onClickHandler}
                >
                    OHGIRAFFERS     {/*로고임*/}
                </button>
                <input
                    className="input-style"
                    type="text"
                    placeholder="검색"
                    onChange={onSearchChangeHandler}
                    onKeyUp={onEnterKeyHandler}
                />
                { false ? <AfterLogin/> : <BeforeLogin/> }
            </div>
        </>
    );
}

export default Header;