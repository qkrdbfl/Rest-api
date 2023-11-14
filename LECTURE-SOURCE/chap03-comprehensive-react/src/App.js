import './style.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/products/Main";
import CategoryMain from "./pages/products/CategoryMain";
import SearchMain from "./pages/products/SearchMain";
import ProductDetail from "./pages/products/ProductDetail";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Layout/> }>
              <Route index element={ <Main/> }/>
              <Route path="product">
                  <Route path="categories/:categoryCode" element={ <CategoryMain/> }/>
                  <Route path="search" element={<SearchMain/>}/> {/*라우팅 처리 해주기*/}
                  <Route path=":productCode" element={<ProductDetail/>}/> {/*위의 <Route path="product">가 다른값일때 ":productCode"로 나오도록 */}
              </Route>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
