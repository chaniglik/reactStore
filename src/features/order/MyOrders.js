import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { getUserOrdersByTokenIdFromServer } from './OrderApi';
import "./MyOrders.css";
export default function MyOrders() {
    const [products, setProducts] = useState([]);
    const myUser = JSON.parse(localStorage.getItem('myUser'));
    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                const response = await getUserOrdersByTokenIdFromServer(myUser.token);
                setProducts(response.data);

            } catch (error) {

                console.error('Error fetching user orders:', error);
            }
        };

        fetchUserOrders();
    }, [myUser.token]);
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };
    const hitTheRoadBodyTemplate = (product) => {
        if (product.hitTheRoad)
            return formatCurrency("יגיע בקרוב");
        return formatCurrency("ממתין למשלוח")
    };
    const nameBodyTemplate = (oneProduct) => {
        return (
            <div className="product-list">
                {oneProduct.arrProducts.map((product, index) => (
                    <div key={index} className="product-item">
                        <img src={product.imgUrl} alt={product.nameProduct} className="w-6rem shadow-2 border-round" />
                        <div>
                            <strong>{product.nameProduct}</strong>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    const dueDateBodyTemplate = (product) => {
        const dueDate = new Date(product.dueDate);
        return formatCurrency(dueDate.toLocaleDateString());
    };
    const orderDateBodyTemplate = (product) => {
        const orderDate = new Date(product.orderDate);
        return formatCurrency(orderDate.toLocaleDateString());
    };
    const addressBodyTemplate = (product) => {
        return <Tag value={product.address} severity={getSeverity(product)} style={{ background: "#c8b4a9" }}></Tag>;
    };


    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Products</span>
            <Button icon="pi pi-refresh" rounded raised />
        </div>
    );
    const footer = ` בסה"כ ישנם  ${products ? products.length : 0} הזמנות`;

    return (
        <div className="card" style={{ marginTop: "20px" }}>
            <DataTable value={products} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column field="שם מוצר" header="שם מוצר" body={nameBodyTemplate}></Column>
                <Column field="?יצא לדרך" header="?יצא לדרך" body={hitTheRoadBodyTemplate}></Column>
                <Column field="תאריך הזמנה" header="תאריך הזמנה" body={orderDateBodyTemplate}></Column>
                <Column field="תאריך קבלת המוצר" header="תאריך קבלת המוצר" body={dueDateBodyTemplate}></Column>
                <Column header="כתובת" body={addressBodyTemplate}></Column>
            </DataTable>
        </div>
    );
}