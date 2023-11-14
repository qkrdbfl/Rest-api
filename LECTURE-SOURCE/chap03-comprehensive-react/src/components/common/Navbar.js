import {NavLink} from "react-router-dom";

function Navbar() {
    
    return (
        <div className="navbar-div">
            <ul className="nav-list-ul">
                <li><NavLink to="/">모든 음식</NavLink></li>
                <li><NavLink to="/product/categories/1">식사</NavLink></li>
                <li><NavLink to="/product/categories/2">디저트</NavLink></li>
                <li><NavLink to="/product/categories/3">음료</NavLink></li>
                { false && <li><NavLink to="/product-management">상품등록</NavLink></li> }
            </ul>
        </div>
    );
}

export default Navbar;