import React, { useState, useEffect } from 'react';
import { deleteOrderFromServer, getAllOrdersFromServer } from './OrderApi';
import { updateOrderToServer } from './OrderApi';
import { useSelector } from "react-redux";
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';

const AllOrders = () => {
    const [arrOrders, setArrOrders] = useState([]);
    let user = useSelector(st => st.user.currentUser);
    const fetchData = async () => {
        try {
            let arr = await getAllOrdersFromServer();
            setArrOrders(prevArr => [...prevArr, ...arr.data]);
        } catch (err) {
            alert("Failed to fetch the orders from the server");
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toSend = async (order) => {
        try {
            order.hitTheRoad = true;
            await updateOrderToServer(order._id, order, user.token)
            setArrOrders(prevArr => prevArr.map(item => item._id === order._id ? order : item));
            alert("ההזמנה נשלחה ללקוח")
        }
        catch (error) {
            alert("Failed to update the order");
            console.log(error);
        }

    }
    const toDelete = async (order) => {
        try {
            await deleteOrderFromServer(order._id, user.token)
            setArrOrders(prevArr => prevArr.filter(item => item._id !== order._id));
            alert("מחיקה בוצעה")
        }
        catch (error) {
            alert("Failed to delete the order");
            console.log(error);
        }

    }
    const itemTemplate = (order) => {
        return (
            <div className="col-12" >
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3" style={{ marginLeft: "30%" }}>
                            <div className="flex flex-column gap-1" style={{ textAlign: "center" }}>
                                <div className="text-2xl font-bold text-900"><b>code: </b>{order._id}</div>
                                <div className="text-700"><b>address: </b>{order.address}</div>
                                <div className="text-700"><b>user code: </b>{order.userCode}</div>
                                <div className="text-700"><b>order date: </b>{order.orderDate}</div>
                                <div className="text-700"><b>due date: </b>{order.dueDate}</div>
                                <div className="text-700"><b>products: </b>{order.arrProducts.map(product => (
                                    <div key={product.code}>{product.nameProduct} - Quantity: {product.quantityOfProduct} {product.code}</div>
                                ))}</div>
                            </div>
                            <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2" style={{ marginLeft: "160px" }}>
                                <Button icon="pi pi-truck" label="send" disabled={order.hitTheRoad} onClick={() => toSend(order)}></Button>
                            </div>
                            <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2" style={{ marginLeft: "160px" }}>
                                <Button icon="pi" label="delete" disabled={order.hitTheRoad} onClick={() => toDelete(order)}></Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <DataScroller value={arrOrders} itemTemplate={itemTemplate} rows={1000} inline scrollHeight="100vh" header="Scroll Down to Load More" />
        </div>
    );
};

export default AllOrders;