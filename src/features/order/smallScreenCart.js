import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useSelector } from "react-redux";
import { Rating } from 'primereact/rating';
import { useNavigate } from 'react-router-dom';
export default function SmallScreenCart() {
    let arrCart = useSelector(st => st.myCart.cart);
    let navigate = useNavigate();
    const [dialogVisible, setDialogVisible] = useState(true);
    const goToBigCart = () => {
        navigate("/shoppingCart");
    }
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const imageBodyTemplate = (product) => {
        return <img src={product.imgUrl} alt={product.nameProduct} className="w-6rem shadow-2 border-round" />;
    };

    const priceBodyTemplate = (product) => {
        return formatCurrency(product.price);
    };

    const ratingBodyTemplate = (product) => {
        return <Rating value={product.rating} readOnly cancel={false} />;
    };

    const categoryBodyTemplate = (product) => {
        return formatCurrency(product.description);
    };
    const nameBodyTemplate = (product) => {
        return formatCurrency(product.nameProduct);
    };


    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Products</span>
            <Button icon="pi pi-shopping-cart" rounded raised onClick={goToBigCart} style={{ background: "#c8b4a9", border: "1px solid #c8b4a9" }} />

        </div>
    );
    const footer = `In total there are ${arrCart ? arrCart.length : 0} products.`;

    const dialogFooterTemplate = () => {
        return <Button label="Ok" icon="pi pi-check" onClick={() => setDialogVisible(false)} style={{ background: "#c8b4a9", border: "1px solid #c8b4a9" }} />;
    };

    return (

        <div className="card">
            <Dialog header="Shopping cart" visible={dialogVisible} style={{ width: '75vw' }} maximizable
                modal contentStyle={{ height: '300px' }} onHide={() => setDialogVisible(false)} footer={dialogFooterTemplate}>
                <DataTable value={arrCart} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                    <Column field="name" header="Name" body={nameBodyTemplate}></Column>
                    <Column header="Image" body={imageBodyTemplate}></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate}></Column>
                    <Column field="description" header="description" body={categoryBodyTemplate}></Column>
                    <Column field="rating" header="Reviews" body={ratingBodyTemplate}></Column>
                </DataTable>
            </Dialog>
        </div>
    );
}





