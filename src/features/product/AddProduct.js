import React from 'react';
import { InputText } from 'primereact/inputtext';
import { useForm } from "react-hook-form";
import { addProductToServer } from './ProductApi';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import pic from "../../pictures/Saloon2.jpg";
import { useSelector } from 'react-redux';
export default function AddProduct() {
    let user = useSelector(st => st.user.currentUser);
    const header = (
        <img alt="Card" src={pic} />
    );
    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const save = async (data) => {

        try {

            const product = {
                codeProduct: data.codeProduct,
                nameProduct: data.nameProduct,
                description: data.description,
                imgUrl: data.imgUrl,
                price: data.price,
                codeProvider: data.codeProvider
            };

            let res = await addProductToServer(product, user.token);
            alert("product saved successfully.");
            console.log(res.data);
        } catch (err) {
            console.log(err);
            alert("faild.cvbnm,");
        }
    };
    return (

        <div className="card flex justify-content-center" style={{ marginTop: "50px" }}>
            <Card title="הוספת מוצר" subTitle="משתמש: מנהל" header={header} className="md:w-25rem" style={{ textAlign: "center" }}>
                <form onSubmit={handleSubmit(save)} noValidate>
                    <div className="p-inputgroup flex-1" style={{ marginBottom: "20px" }}>
                        <span className="p-inputgroup-addon" style={{ background: "#c8b4a9" }}>
                            <i className="pi pi-key"></i>
                        </span>
                        <InputText placeholder="codeProduct"
                            type="number"
                            {...register("codeProduct", {
                                required: { value: true, message: "שדה חובה" },
                            })}

                        />
                    </div>
                    {errors.codeProduct && (

                        <small style={{ color: "red" }}>{errors.codeProduct.message}</small>

                    )}

                    <div className="p-inputgroup flex-1" style={{ marginBottom: "20px" }}>
                        <span className="p-inputgroup-addon" style={{ background: "#c8b4a9" }}>
                            <i className="pi pi-question"></i>
                        </span>
                        <InputText placeholder="nameProduct"
                            type="text"
                            {...register("nameProduct")}

                        />
                    </div>
                    {errors.nameProduct && (
                        <span style={{ color: "red" }}>{errors.nameProduct.message}</span>
                    )}
                    <div className="p-inputgroup flex-1" style={{ marginBottom: "20px" }}>
                        <span className="p-inputgroup-addon" style={{ background: "#c8b4a9" }}>
                            <i className="pi pi-image"></i>
                        </span>
                        <InputText placeholder="imgUrl"
                            type="text"
                            {...register("imgUrl", {
                                required: { value: true, message: "שדה חובה" },
                            })}

                        />
                    </div>
                    {errors.imgUrl && (
                        <small style={{ color: "red" }}>{errors.imgUrl.message}</small>
                    )}
                    <div className="p-inputgroup flex-1" style={{ marginBottom: "20px" }}>
                        <span className="p-inputgroup-addon" style={{ background: "#c8b4a9" }}>
                            <i className="pi pi-dollar"></i>
                        </span>
                        <InputText placeholder="price"
                            type="number"
                            {...register("price", {
                                required: { value: true, message: "שדה חובה" },
                            })}

                        />
                    </div>
                    {errors.price && (
                        <small style={{ color: "red" }}>{errors.price.message}</small>
                    )}

                    <div className="p-inputgroup flex-1" style={{ marginBottom: "20px" }}>
                        <span className="p-inputgroup-addon" style={{ background: "#c8b4a9" }}>
                            <i className="pi pi-code"></i>
                        </span>
                        <InputText placeholder="codeProvider"
                            type="text"
                            {...register("codeProvider", {
                                required: { value: true, message: "שדה חובה" },
                                pattern: {
                                    value: /^.{5,8}$/,
                                    message: "Input must be between 5 and 8 characters"
                                }
                            })}
                        />
                    </div>
                    {errors.codeProvider && (
                        <small style={{ color: "red" }}>{errors.codeProvider.message}</small>
                    )}

                    <div className="p-inputgroup flex-1" style={{ marginBottom: "20px" }}>
                        <span className="p-inputgroup-addon" style={{ background: "#c8b4a9" }}>
                            <i className="pi pi-comment"></i>
                        </span>
                        <InputText placeholder="description"
                            type="text"
                            {...register("description")}

                        />
                        {errors.description && (
                            <span style={{ color: "red" }}>{errors.description.message}</span>
                        )}

                    </div>

                    <Button label="Save" icon="pi pi-check" type="submit" style={{ marginTop: "20px", background: "#c8b4a9", border: "1px solid #c8b4a9" }} />
                </form>
            </Card>
        </div>
    )
}
