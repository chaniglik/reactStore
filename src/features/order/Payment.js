import React, { useEffect } from 'react';//
import { InputText } from 'primereact/inputtext';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addOrderToServer } from "./OrderApi";
import { useSelector } from "react-redux";
import { Card } from 'primereact/card';
import Cerdit from './Cerdit';
import { useState } from 'react';
import pic from "../../pictures/Saloon2.jpg";
export default function PaymentToOrder() {
    const [formData, setFormData] = useState({ country: '', city: '', street: '', housNumber: '', apartmentNumber: '', zip: '' });
    let navigate = useNavigate();
    let user = useSelector(st => st.user.currentUser);
    let arrCart = useSelector(st => st.myCart.cart);
    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const header = (
        <img alt="Card" src={pic} />
    );
    const allamount = () => {
        let amount = 0;
        for (let index = 0; index < arrCart.length; index++) {
            amount += arrCart[index].price * arrCart[index].quantityOfProduct
        }
        return amount
    }
    useEffect(() => {
        const savedFormData = JSON.parse(localStorage.getItem('formData'));

        if (savedFormData) {
            const form = document.querySelector('form');

            for (let key in savedFormData) {
                if (form[key]) {
                    form[key].value = savedFormData[key];
                    form[key].dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        }
    }, []);

    const backToTHeProducts = (itemId) => {
        navigate("/accessories");

    }
    const save = async (data) => {
        let addres = data.country + " " + data.city + " " + data.street + " " + data.housNumber + " " + data.apartmentNumber + " " + data.zip;
        const currentDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(currentDate.getDate() + 7);

        try {
            const order = {
                orderDate: new Date(),
                dueDate: dueDate,
                address: addres,
                userCode: user._id,
                hitTheRoad: false,
                arrProducts: arrCart
            };

            let res = await addOrderToServer(order, user.token);
            alert("Order saved successfully.");
            console.log(res.data);
            localStorage.setItem('formData', JSON.stringify(data));
        } catch (err) {
            console.log(err);
            alert(err.response.data);
        }
    };
    const saveFormToLocalStorage = (formData) => {
        localStorage.setItem('formData', JSON.stringify(formData));
    };

    return (
        <>
            <h1 style={{ textAlign: "center", justifyContent: "center", height: "80px", background: "#f3f1ee", color: "#494949", alignItems: "center", display: "flex" }}>תשלום</h1>
            <h3 style={{ marginLeft: "70%" }}>פרטי כרטיס</h3>
            <Cerdit />
            <form onSubmit={handleSubmit(save)} noValidate>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", marginBottom: "150px" }}>

                    <div className="card flex justify-content-center" style={{ textAlign: "center", marginLeft: "15%", marginRight: "20%" }}>
                        <Card title="סיכום הזמנה" header={header} className="md:w-25rem" style={{ marginTop: "-100px", boxShadow: "none", background: "#f3f1ee" }}>
                            <p>סה"כ לתשלום: ₪{allamount()}</p>
                            <button className='blockToPay' style={{ marginBottom: "20px" }} >בצע הזמנה</button>
                            <br />
                            <button className='blockToGo' onClick={backToTHeProducts} style={{ marginBottom: "20px" }} >חזרה לקניות</button>

                        </Card>
                    </div>

                    <div className="card flex flex-column md:flex-column gap-3" style={{ width: "50%", marginRight: "15%" }}>
                        <h3 style={{ marginLeft: "35%" }}>כתובת משלוח</h3>

                        <InputText placeholder="country"
                            type="text"
                            defaultValue={localStorage.getItem('formData') && JSON.parse(localStorage.getItem('formData')).country}
                            {...register("country", {
                                required: { value: true, message: "שדה חובה" },

                            })}
                            onChange={(e) => saveFormToLocalStorage({ ...formData, country: e.target.value })}

                        />

                        {errors.country && (
                            <div style={{ direction: "rtl" }}>
                                <small className="p-error p-d-block">{errors.country.message}</small>
                            </div>
                        )}


                        <InputText placeholder="city"
                            type="text"
                            defaultValue={localStorage.getItem('formData') && JSON.parse(localStorage.getItem('formData')).city}
                            {...register("city", {
                                required: { value: true, message: "שדה חובה" }
                            })}
                            onChange={(e) => saveFormToLocalStorage({ ...formData, city: e.target.value })}
                        />
                        {errors.city && (
                            <div style={{ direction: "rtl" }}>
                                <small className="p-error p-d-block">{errors.city.message}</small>
                            </div>
                        )}



                        <InputText placeholder="street"
                            type="text"
                            defaultValue={localStorage.getItem('formData') && JSON.parse(localStorage.getItem('formData')).street}
                            {...register("street", {
                                required: { value: true, message: "שדה חובה" }
                            })}
                            onChange={(e) => saveFormToLocalStorage({ ...formData, street: e.target.value })}
                        />
                        {errors.street && (
                            <div style={{ direction: "rtl" }}>
                                <small className="p-error p-d-block">{errors.street.message}</small>
                            </div>
                        )}


                        <InputText placeholder="hous number
"
                            type="number"
                            defaultValue={localStorage.getItem('formData') && JSON.parse(localStorage.getItem('formData')).housNumber}
                            {...register("housNumber", {
                                required: { value: true, message: "שדה חובה" },
                            })}
                            onChange={(e) => saveFormToLocalStorage({ ...formData, housNumber: e.target.value })}
                        />
                        {errors.housNumber && (
                            <div style={{ direction: "rtl" }}>
                                <small className="p-error p-d-block">{errors.housNumber.message}</small>
                            </div>
                        )}


                        <InputText placeholder="apartment number
"
                            type="number"
                            defaultValue={localStorage.getItem('formData') && JSON.parse(localStorage.getItem('formData')).apartmentNumber}
                            {...register("apartmentNumber", {
                                required: { value: true, message: "שדה חובה" },
                            })}
                            onChange={(e) => saveFormToLocalStorage({ ...formData, apartmentNumber: e.target.value })}
                        />
                        {errors.apartmentNumber && (
                            <div style={{ direction: "rtl" }}>
                                <small className="p-error p-d-block">{errors.apartmentNumber.message}</small>
                            </div>
                        )}


                        <InputText placeholder="zip"
                            type="number"
                            defaultValue={localStorage.getItem('formData') && JSON.parse(localStorage.getItem('formData')).zip}
                            {...register("zip", {
                                required: { value: true, message: "שדה חובה" },
                            })}
                            onChange={(e) => saveFormToLocalStorage({ ...formData, zip: e.target.value })}
                        />
                        {errors.zip && (
                            <div style={{ direction: "rtl" }}>
                                <small className="p-error p-d-block">{errors.zip.message}</small>
                            </div>
                        )}

                    </div>
                </div>
            </form>

        </>
    )
}




