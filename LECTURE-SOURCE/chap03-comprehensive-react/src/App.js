import './style.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/products/Main";
import CategoryMain from "./pages/products/CategoryMain";
import SearchMain from "./pages/products/SearchMain";
import ProductDetail from "./pages/products/ProductDetail";
import Signup from "./pages/member/Signup";
import Login from "./pages/member/Login";
import ProtectedRoute from "./components/router/ProtectedRoute";
import Error from "./pages/error/Error";
import MyPageLayout from "./layouts/MyPageLayout";
import Profile from "./pages/member/Profile";
import ProductManagement from "./pages/admin/ProductManagement";
import ProductRegist from "./pages/admin/ProductRegist";
import ProductModify from "./pages/admin/ProductModify";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Main/>}/>
                    <Route path="product">
                        <Route path="categories/:categoryCode" element={<CategoryMain/>}/>
                        <Route path="search" element={<SearchMain/>}/> {/*라우팅 처리 해주기*/}
                        <Route path=":productCode" element={<ProductDetail/>}/> {/*위의 <Route path="product">가 다른값일때 ":productCode"로 나오도록 */}
                    </Route>
                    <Route path="product-management" element={<ProtectedRoute authCheck={true}><ProductManagement/></ProtectedRoute>}/> {/*관리자용 상품 목록(유저로 로그인 시 상품목록 안보이도록)*/}
                    <Route path="product-regist" element={<ProtectedRoute authCheck={true}><ProductRegist/></ProtectedRoute>}/> {/*상품 목록 상세 내용(이미지업로드)*/}
                    <Route path="product-modify/:productCode" element={<ProtectedRoute authCheck={true}><ProductModify/></ProtectedRoute>}/> {/*상품 리스트의 상세 내용 조회 수정 삭제*/}

                </Route>
                <Route path="/member">
                    <Route path="signup" element={<ProtectedRoute loginCheck={false}><Signup/></ProtectedRoute>}/>
                    <Route path="login" element={<ProtectedRoute loginCheck={false}><Login/></ProtectedRoute>}/>
                    <Route path="mypage" element={<ProtectedRoute loginCheck={true}><MyPageLayout/></ProtectedRoute>}>
                        <Route index element={<Navigate to="/member/mypage/profile" replace/>}/>
                        <Route path="profile" element={<Profile/>}/>
                    </Route>
                </Route>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
