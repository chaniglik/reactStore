import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {  userIn } from "./userSlice";
import { addUserToServer, login } from "./userApi";
import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import pic from "../../pictures/Saloon2.jpg"
const Registration = () => {
  const header = (
    <img alt="Card" src={pic} />
  );
  let dispatch = useDispatch();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const save = async (data) => {
    try {
      let res = await addUserToServer(data.email, data.password, data.nameUser);
      dispatch(userIn(res.data));
      alert("נרשמת בהצלחה");
      let res1 = await login(data.email, data.password);
      dispatch(userIn(res1.data));
      console.log(res.data);
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
  };
  return (<>
    <div className="card flex justify-content-center" style={{ marginTop: "20px" }}>
      <Card title="טופס התחברות" subTitle="למשתמש חדש" header={header} className="md:w-25rem" style={{ textAlign: "center", background: "#f3f1ee" }}>
        <form onSubmit={handleSubmit(save)} noValidate>
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
          {errors.nameUser && (
            <small style={{ color: "red" }}>{errors.nameUser.message}</small>
          )}
          <div className="p-inputgroup flex-1" style={{ marginBottom: "20px" }}>
            <span className="p-inputgroup-addon" style={{ background: "#c8b4a9" }}>
              <i className="pi pi-user"></i>
            </span>
            <InputText placeholder="nameUser"
              type="text"
              {...register("nameUser", {
                required: { value: true, message: "שדה חובה" },
              })}
            />
          </div>
          <Button label="רישום" icon="pi pi-user-plus" severity="success" className="w-10rem" style={{ background: "#c8b4a9", border: "1px solid #c8b4a9" }}></Button>
        </form>
      </Card>
    </div>
  </>
  );
};

export default Registration;
