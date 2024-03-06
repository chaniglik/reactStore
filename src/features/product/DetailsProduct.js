import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../order/CartSlice";
import { getProductByIdFromServer } from "./ProductApi";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import classes from "./DetailsProduct.module.css";
import SmallScreenCart from "../order/smallScreenCart";
const DetailsProduct = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductByIdFromServer(params.id);
      setProduct(productData);
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = (product) => {
    dispatch(addProductToCart(product));
    setIsCartOpen(true);
  };


  const handleGoBack = () => {
    navigate("/accessories");
  };
  let location = useLocation();

  return (
    <div className={classes["div-details"]}>
      {product && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: '100%', marginRight: '300px', marginLeft: "300px", textAlign: 'center', color: "#494949" }}>
              <h1 style={{ fontSize: "xxx-large" }}>{location.state.nameProduct}</h1>
              <p style={{ fontSize: "x-large" }}>{location.state.description}</p>
              <p style={{ color: "red", fontSize: "medium" }}>₪{location.state.price}</p>
              <button onClick={() => handleAddToCart(location.state)} className={classes["detailButton"]}>Add to cart</button>
              <br />
              <br />
              <button onClick={handleGoBack} className={classes["detailButton"]}>Go Back</button>
            </div>
            <img src={location.state.imgUrl} style={{ width: '100%', marginRight: "400px" }} alt={location.state.nameProduct} />
          </div>
          {isCartOpen && <SmallScreenCart />}
        </>
      )}
    </div>
  );
};

export default DetailsProduct;



