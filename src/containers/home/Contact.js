import React, { useState } from "react";
import { email, required } from "../../components/Helper/Validator";
import FormInputItem from "../../components/UI/FormInputItem";

const Contact = () => {
  const [form, setForm] = useState({
    phone: {
      value: "",
      error: "Phone number is required",
      valid: false,
      validators: [required],
    },
    email: {
      value: "",
      error: "Email Address is required",
      valid: false,
      validators: [required, email],
    },
    address: {
      value: "",
      valid: false,
      error: "Address is required",
      validators: [required],
    },
  });

  const onChangeHandler = (value, name, src = null) => {
    let isValid = true;
    form[name].validators.forEach((validator) => {
      isValid = isValid && validator(value);
    });
    setForm({
      ...form,
      [name]: {
        ...form[name],
        value,
        valid: isValid,
      },
    });
  };

  return (
    <>
      <div className="mb-4">
        <div className="row">
          <FormInputItem
            autoComplete="phone-number"
            type="text"
            value={form.phone.value}
            change={onChangeHandler}
            valid={form.phone.valid}
            error={form.phone.error}
            input="phone"
            formLable={"Phone Number"}
            className="col-12 col-md-6"
          />
        </div>
        <div className="row">
          <FormInputItem
            autoComplete="email"
            type="email"
            value={form.email.value}
            change={onChangeHandler}
            valid={form.email.valid}
            error={form.email.error}
            input="email" 
            formLable={"Email Address"}
            className="col-12 col-md-6"
          />
        </div>
        <div className="row">
          <FormInputItem
            autoComplete="address"
            type="text"
            value={form.address.value}
            change={onChangeHandler}
            valid={form.address.valid}
            error={form.address.error}
            input="address" 
            formLable={"Address"}
            className="col-12"
          />  
        </div>
      </div>
    </>
  );
};
export default Contact;
