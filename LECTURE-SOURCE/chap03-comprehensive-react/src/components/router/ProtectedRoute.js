import {isLogin} from "../../utils/TokenUtils";
import {Navigate} from "react-router-dom";

function ProtectedRoute ({loginCheck, authCheck, children}) {


    if(authCheck) { //authCheck :권한 체크
        //권한이 있어야 접근 가능한 기능 (상품 관리 - 등록, 수정, 삭제 등)
        return isLogin() ? children : <Navigate to="/"/>
    }

    if (loginCheck){
        //로그인 해야만 볼수 있는 기능(마이페이지)
         return isLogin() ? children : <Navigate to="/member/login"/>
    }else {
        //로그인 하면 볼수 없는 기능(로그인, 회원가입)
        return !isLogin() ? children : <Navigate to="/"/>
    }
}

export default ProtectedRoute;