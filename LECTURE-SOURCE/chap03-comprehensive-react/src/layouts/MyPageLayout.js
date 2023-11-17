import {Outlet} from "react-router-dom";
import MyPageNavber from "../components/common/MyPageNavber";

function MyPageLayout() {

    return (
        <div className="mypage-layout-div">
            <MyPageNavber/>
            <main className="mypage-main">
                <Outlet/>
            </main>
        </div>
    );
}

export default MyPageLayout;