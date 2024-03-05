import React from 'react';
import { InputText } from 'primereact/inputtext';
import { useForm } from "react-hook-form";
import { updateProductToServer } from './ProductApi';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import pic from "../../pictures/Saloon2.jpg";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function EditProduct() {
    let user = useSelector(st => st.user.currentUser);
    const header = (
        <img alt="Card" src={pic} />
    );
    let {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();
    let location = useLocation();
    const toSend = async (formData) => {
        try {
            const updatedProduct = {
                codeProduct: formData.codeProduct,
                description: formData.description,
                codeProvider: formData.codeProvider,
                price: formData.price,
                imgUrl: formData.imgUrl,
                nameProduct: formData.nameProduct,
            };

            await updateProductToServer(product._id, updatedProduct, user.token)

            alert("המוצר עודכן");
        }
        catch (error) {
            alert("Failed לעדכן מוצר");
            console.log(error);
        }
    }
    const { product } = location.state;
    let nameProduct = product.nameProduct;
    let imgUrl = product.imgUrl;
    let price = product.price;
    let codeProvider = product.codeProvider;
    let description = product.description;
    let codeProduct = product.codeProduct;
    return (<>
        <div className="card flex justify-content-center" style={{ marginTop: "50px" }}>
            <Card title="עדכון מוצר" subTitle="משתמש: מנהל" header={header} className="md:w-25rem" style={{ textAlign: "center" }}>
                <form onSubmit={handleSubmit(toSend)}noValidate>
                    <div className="p-inputgroup flex-1" style={{ marginBottom: "20px" }}>
                        <span className="p-inputgroup-addon" style={{ background: "#c8b4a9" }}>
                            <i className="pi pi-key"></i>
                        </span>
                        <InputText placeholder="codeProduct"
                            type="number"
                            {...register("codeProduct", {
                                required: { value: true, message: "שדה חובה" },
                            })}
                            defaultValue={codeProduct}

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
                            defaultValue={nameProduct}
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
                            defaultValue={imgUrl}
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
                            defaultValue={price}
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
                            defaultValue={codeProvider}
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

                            defaultValue={description}
                        />
                        {errors.description && (
                            <span style={{ color: "red" }}>{errors.description.message}</span>
                        )}

                    </div>
                    <Button icon="pi pi-pencil" type='submit' label="send"></Button>
                </form>
            </Card>

        </div>
    </>)
}
