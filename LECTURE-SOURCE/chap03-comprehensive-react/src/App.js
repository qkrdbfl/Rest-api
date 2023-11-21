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
import Order from "./pages/order/Order";
import OrderList from "./pages/member/OrderList";
import Reviews from "./pages/review/Reviews";
import ReviewDetail from "./pages/review/ReviewDetail";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Layout/> }>
                    <Route index element={ <Main/> }/>
                    <Route path="product">
                        <Route path="categories/:categoryCode" element={ <CategoryMain/> }/>
                        <Route path="search" element={ <SearchMain/> }/>
                        <Route path=":productCode" element={ <ProductDetail/> }/>
                    </Route>
                    <Route
                        path="product-management"
                        element={
                            <ProtectedRoute authCheck={true}>
                                <ProductManagement/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="product-regist"
                        element={
                            <ProtectedRoute authCheck={true}>
                                <ProductRegist/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="product-modify/:productCode"
                        element={
                            <ProtectedRoute authCheck={true}>
                                <ProductModify/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="order"
                        element={
                            <ProtectedRoute loginCheck={true}>
                                <Order/>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="review">
                        <Route path="product/:productCode" element={
                            <ProtectedRoute loginCheck={true}>
                                <Reviews/>
                            </ProtectedRoute>
                        }/>
                        <Route path=":reviewCode" element={
                            <ProtectedRoute loginCheck={true}> {/*로그인이 되어있을때만 ReviewDetail를 보여준다*/}
                                <ReviewDetail/>
                            </ProtectedRoute>
                        }/>
                    </Route>
                </Route>
                <Route path="/member">
                    <Route path="signup" element={ <ProtectedRoute loginCheck={false}><Signup/></ProtectedRoute> }/>
                    <Route path="login" element={ <ProtectedRoute loginCheck={false}><Login/></ProtectedRoute> }/>
                    <Route path="mypage" element={ <ProtectedRoute loginCheck={true}><MyPageLayout/></ProtectedRoute> }>
                        <Route index element={ <Navigate to="/member/mypage/profile" replace/>}/>
                        <Route path="profile" element={ <Profile/> }/>
                        <Route path="payment" element={ <OrderList/> }/>
                    </Route>
                </Route>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;