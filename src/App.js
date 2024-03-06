import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import ListProducts from "./features/product/ListProducts";
import DetailsProduct from "./features/product/DetailsProduct";
import ListCart from "./features/order/ListCart";
import LogIn from './features/user/login';
import Registration from './features/user/Registration';
import AppComponent from './AppComponent';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import ShowProducts from './features/product/showProducts';
import { useDispatch, useSelector } from 'react-redux';
import { reloadUser } from './features/user/userSlice';
import { useEffect } from 'react';
import 'primeflex/primeflex.css';
import AddProduct from './features/product/AddProduct';
import EditProduct from './features/product/EditProduct';
import MyOrders from './features/order/MyOrders';
import PaymentToOrder from './features/order/Payment';
import AllOrders from './features/order/AllOrders';
function App() {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    dispatch(reloadUser());
  }, [dispatch]);
  const ProtectedRouteAdmin = ({ user, children }) => {
    if (!user || user.roles !== "ADMIN") {
      return <Navigate to="/" replace />;
    }
    return children;
  };
  const ProtectedRouteUser = ({ user, children }) => {
    if (!user || user.roles !== "USER") {
      return <Navigate to="/" replace />;
    }

    return children;
  };
  return (<>
    <PrimeReactProvider>
      <Routes>
        <Route path="/" element={<AppComponent />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/shoppingCart" element={<ListCart />} />
        <Route path="/AllOrders" element={
          <ProtectedRouteAdmin user={user}>
            <AllOrders />
          </ProtectedRouteAdmin>
        } />
        <Route path="/AddProduct" element={
          <ProtectedRouteAdmin user={user}>
            <AddProduct />
          </ProtectedRouteAdmin>
        } />
        <Route path="/accessories" element={<ListProducts />} >
          <Route path=":id" element={<DetailsProduct />} />
        </Route>
        <Route path="/search" element={<ListProducts />} />
        <Route path="/edit" element={<EditProduct />} />
        <Route path="/MyOrders" element={
          <ProtectedRouteUser user={user}>
            <MyOrders />
          </ProtectedRouteUser>

        } />
        <Route path="/Payment" element={
          <ProtectedRouteUser user={user}>
            <PaymentToOrder />
          </ProtectedRouteUser>

        } />
        <Route path="/show" element={
          <ProtectedRouteAdmin user={user}>
            <ShowProducts />
          </ProtectedRouteAdmin>} />
        <Route path="/Registration" element={<Registration />} />
      </Routes>
    </PrimeReactProvider>
  </>
  );
}

export default App;
