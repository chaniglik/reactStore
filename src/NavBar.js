import { Link } from "react-router-dom";
import * as React from 'react';
import "./NavBar.css";
import logo from "./pictures/logo.webp";
import { useNavigate } from "react-router-dom";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useSelector, useDispatch } from "react-redux";
import { userOut } from "./features/user/userSlice";
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
const NavBar = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  let user = useSelector((state) => state.user.currentUser);
  const navigateToHome = () => {
    navigate("/");
  };
  return (<>
    <div className="line"></div>
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} onClick={navigateToHome}></img>
      </div>
      <li className="navbar-item">
        {!user && <Link to="/accessories"><CategoryIcon /></Link> || user.roles != "ADMIN" && <Link to="/accessories"><CategoryIcon /></Link>}
      </li>
      <li className="navbar-item">
        {!user && <Link to="/shoppingCart">{<ShoppingBasketIcon />}</Link> || user.roles != "ADMIN" && <Link to="/shoppingCart">{<ShoppingBasketIcon />}</Link>}
      </li>
      <li className="navbar-item">
        {!user && <Link to="/search" >{<SearchIcon />}</Link> || user.roles != "ADMIN" && <Link to="/search" >{<SearchIcon />}</Link>}
      </li>
      <li className="navbar-item">
        {!user && <Link to="/LogIn">{<PersonOutlineIcon />}</Link>}
      </li>
      
      <li className="navbar-item">
        {user?.roles == "ADMIN" && <Link to="/show">לתצוגת המוצרים</Link>}
      </li>
     
    
     
      <li className="navbar-item">
        {user && user.roles == "ADMIN" && <Link to="/AddProduct">הוספת מוצר</Link>}
      </li>
      <li className="navbar-item">
        {user && user.roles == "ADMIN" && <Link to="/AllOrders">לכל ההזמנות</Link>}
      </li>
      <li className="navbar-item">
        {user && user.roles == "USER" &&<Link to="MyOrders">ההזמנות שלי</Link>}
      </li>
      <li className="navbar-item">
        {user && user.roles == "USER" && <div> היי, {user.nameUser}</div>}
      </li>
      <li className="navbar-item">
        {user && user.roles == "ADMIN" && <div>{user.nameUser} is admin</div>}
      </li>
      <li className="navbar-item">
        {user && (
          <Link onClick={() => { dispatch(userOut()); }} to="/"><LogoutIcon /></Link>
        )}
      </li>
    </nav>
  </>
  );
}

export default NavBar;








// import { useSelector } from "react-redux";

// const NavBar = () => {
//   let user = useSelector((state) => state.user.currentUser);
//   return (
//     <AppBar>
//       <Link>הבית</Link>
//       {!user && <Link>כניסה</Link>}
//       {!user && <Link>הרשמה</Link>}
//       {user && <Link>יציאה</Link>}
//       {user?.role == "ADMIN" && <Link>הוספת מוצר</Link>}
//     </AppBar>
//   );
// };

// export default NavBar;






