import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { classNames } from 'primereact/utils';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductFromCart } from './CartSlice';
import ButtonGroup from '@mui/material/ButtonGroup';
import { addAmountFromProductToCart, subAmountFromProductToCart } from './CartSlice';
import { useNavigate } from 'react-router-dom';
import "./ListCart.css";
import { useRef } from 'react';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import pic from "../../pictures/Cat_1_11.jpg"
export default function ListCart() {
    let arrCart = useSelector(st => st.myCart.cart);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const setDialogVisibility = (isVisible, product) => {
        setProductToDelete(product);
        setVisible(true);

    };
    let user = useSelector((state) => state.user.currentUser);
    const header = (
        <img alt="Card" src={pic} />
    );
    const footer = (
        <>
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
        </>
    );
    const backToTHeProducts = () => {
        navigate("/accessories");
    }
    const payment = (itemId) => {
        if (user && arrCart.length > 0)
            navigate("/Payment");
        else
            if (user && arrCart.length == 0)
                navigate("/accessories")
            else
                navigate("/LogIn");

    }
    const toast = useRef(null);
    const allamount = () => {
        let amount = 0;
        for (let index = 0; index < arrCart.length; index++) {
            amount += arrCart[index].price * arrCart[index].quantityOfProduct
        }
        return amount
    }
    const itemTemplate = (product, index) => {
        return (
            <div className="col-12" key={product._id} style={{ marginTop: "50px", width: "80%", direction: "rtl", marginLeft: "140px", background: "#f3f1ee" }}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem  block xl:block mx-auto " src={product.imgUrl} alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900" style={{ color: "red" }}>{product.nameProduct}</div>
                            <Rating value={product.rating} readOnly cancel={false} ></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold" style={{ color: "#c8b4a9" }}>{product.description}</span>
                                </span>
                            </div>
                            <div className="card flex justify-content-center">
                                <Button
                                    icon="pi pi-trash"
                                    className="p-button-rounded"
                                    onClick={() => setDialogVisibility(true, product)}
                                    style={{ width: "40px", height: "40px" }}
                                />
                                <Dialog
                                    header="Are you sure you want to delete this product?"
                                    visible={visible}
                                    style={{ width: '50vw' }}
                                    onHide={() => setVisible(false)}
                                >
                                    <Button
                                        onClick={() => {
                                            dispatch(deleteProductFromCart(productToDelete._id));
                                            setVisible(false); // Close the dialog after deleting the product
                                        }}
                                        icon="pi pi-times"
                                        label="Delete"
                                        className="p-button-danger"
                                    ></Button>
                                </Dialog>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2" style={{ marginTop: "80px" }}>
                            <span className="text-1xl ">₪{product.price}</span>
                            <Toast ref={toast} />
                            <ConfirmPopup />
                            <span className="text-1xl font-semibold">סה"כ ₪{product.price * product.quantityOfProduct}</span>
                            <ButtonGroup style={{ border: "1px solid #c8b4a9" }} >
                                <Button onClick={() => { dispatch(addAmountFromProductToCart(product._id)) }} className='button-amount'>+</Button>
                                <Button className='button-amount'>{product.quantityOfProduct}</Button>
                                <Button onClick={() => { dispatch(subAmountFromProductToCart(product._id)) }} className='button-amount'>-</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = arrCart.map((product, index) => {
            return itemTemplate(product, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (<>
        <h1 style={{ textAlign: "center", justifyContent: "center", height: "80px", background: "#f3f1ee", color: "#494949", alignItems: "center", display: "flex" }}>סל קניות</h1>
        <div style={{ display: "flex" }}>
            <div style={{ textAlign: "center", marginLeft: "120px", marginTop: "120px" }}>
                <Card title="סיכום הזמנה" className="md:w-25rem" style={{ background: "#f3f1ee" }}>
                    <p>סה"כ מוצרים להזמנה: {arrCart.length}</p>
                    <p>סה"כ לתשלום: ₪{allamount()}</p>
                    <button className='blockToPay' onClick={payment} style={{ marginBottom: "20px" }} >לתשלום</button>
                    <br />
                    <button className='blockToGo' onClick={backToTHeProducts} style={{ marginBottom: "20px" }} >חזרה לקניות</button>
                </Card>
            </div>
            <div className="card" >
                <DataView value={arrCart} listTemplate={listTemplate} />
            </div>
        </div>
    </>);


}





