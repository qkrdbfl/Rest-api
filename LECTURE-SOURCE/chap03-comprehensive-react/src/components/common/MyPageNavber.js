import {NavLink} from "react-router-dom";

function MyPageNavber() {

    return (
        <div className="mypage-navbar-div">
            <ul className="mypage-navbar-ul">
                <li><NavLink to="/">메인으로</NavLink></li>
                <li><NavLink to="/member/mypage/profile">회원정보</NavLink></li>
                <li><NavLink to="/member/mypage/payment">결제정보</NavLink></li>
            </ul>
        </div>
    );
}

export default MyPageNavber;