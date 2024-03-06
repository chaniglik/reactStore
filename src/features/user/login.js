import React from 'react';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useForm } from "react-hook-form";
import { login } from "./userApi";
import { useDispatch } from "react-redux";
import { userIn } from './userSlice';
import { useNavigate } from "react-router-dom";
import { Card } from 'primereact/card';
import pic from "../../pictures/Saloon2.jpg"
export default function LogIn() {
    const header = (
        <img alt="Card" src={pic} />
    );
    const navigate = useNavigate();
    let dispatch = useDispatch();
    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const save = async (data) => {
        try {
            let res = await login(data.email, data.password);
            dispatch(userIn(res.data));
            alert("נכנסת בהצלחה");
            console.log(res.data);
            if (res.data)
                localStorage.removeItem('formData');
        } catch (err) {
            console.log(err);
            alert(err.response.data);
        }
    };
    const handleRegistration = () => {
        navigate("/Registration");
    };
    return (<>
        <div className="card" style={{ marginTop: "100px" }}>
            <div className="flex flex-column md:flex-row">
                <div className="card flex justify-content-center" style={{ marginLeft: "220px" }}>
                    <Card title="טופס התחברות" subTitle="למשתמש רשום" className="md:w-25rem" style={{ textAlign: "center", background: "#f3f1ee", height: "95%", boxShadow: "none" }}>
                        <form onSubmit={handleSubmit(save)} noValidate >
                            <div style={{ marginBottom: "80px" }}></div>
                            {errors.email && (
                                <small style={{ color: "red" }}>{errors.email.message}</small>
                            )}
                            <div className="p-inputgroup flex-1" style={{ marginBottom: "20px" }}>
                                <span className="p-inputgroup-addon" style={{ background: "#c8b4a9" }}>
                                    <i className="pi pi-at"></i>
                                </span>
                                <InputText placeholder="email"
                                    type="email"
                                    {...register("email", {
                                        required: { value: true, message: "שדה חובה" },
                                    })}
                                />
                            </div>
                            {errors.password && (
                                <small style={{ color: "red" }}>{errors.password.message}</small>
                            )}
                            <div className="p-inputgroup flex-1" style={{ marginBottom: "20px" }}>
                                <span className="p-inputgroup-addon" style={{ background: "#c8b4a9" }}>
                                    <i className="pi pi-key"></i>
                                </span>
                                <InputText placeholder="password"
                                    type="password"
                                    {...register("password", {
                                        required: { value: true, message: "שדה חובה" },
                                        pattern: { value: /^[a-zA-Z0-9]{6,}$/, message: "לא מתאים" },
                                    })}
                                />
                            </div>
                            <Button label="התחברות" icon="pi pi-user" className="w-10rem mx-auto" ></Button>
                        </form>
                    </Card>
                </div>
                <div className="w-full md:w-2">
                    <Divider layout="vertical" className="hidden md:flex">
                        <b style={{ fontSize: "xxx-large", color: "#494949" }}>OR</b>
                    </Divider>
                    <Divider layout="horizontal" className="flex md:hidden" align="center">
                        <b>OR</b>
                    </Divider>
                </div>
                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                    <Card title="טופס התחברות" subTitle="למשתמש חדש" header={header} className="md:w-25rem" style={{ textAlign: "center", background: "#f3f1ee", height: "110%", boxShadow: "none", marginBottom: "20px", marginRight: "200px" }}>
                        <Button label="רישום" icon="pi pi-user-plus" severity="success" className="w-10rem" onClick={handleRegistration} style={{ background: "#c8b4a9", border: "1px solid #c8b4a9" }}></Button>
                    </Card>
                </div>
            </div>
        </div>
    </>)
}