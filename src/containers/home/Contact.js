import React, { useState } from "react";
import { email, required } from "../../components/Helper/Validator";
import FormInputItem from "../../components/UI/FormInputItem";
import AButton from "../../components/UI/AButton";
import ASpinner from "../../components/UI/ASpinner";
import AErrors from "../../components/UI/AErrors";

const Contact = () => {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const[submitted, setSubmitted] = useState(false);
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

  const onSubmitHandler = () => {
    setSubmitted(true);
    setErrors([]);

    let isFormValid = true;
    for (const key in form) {
      let isValid = true;
      form[key].validators.forEach((validator) => {
        isValid = isValid && validator(form[key].value);
      });
      if(!isValid){
        setErrors((prevErrors) => [...prevErrors, form[key].error]);
      }
      isFormValid = isFormValid && isValid;
    }
    if (isFormValid) {
      setErrors([]);
      let formData = {
        phone: form.phone.value.trim(),
        email: form.email.value.trim(),
        address: form.address.value.trim(),
      }
      console.log(formData);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <AButton click={onSubmitHandler} btnLabel={<>
            <span className="me-2">Save</span>
          </>} />
      </div>
      {errors.length > 0 &&<AErrors errors={errors} />}
      <div className="mb-4">
        <div className="row">
          <FormInputItem
            autoComplete="phone-number"
            type="text"
            value={form.phone.value}
            change={onChangeHandler}
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
            input="address" 
            formLable={"Address"}
            className="col-12 col-md-6"
          />  
        </div>
      </div>
    </>
  );
};
export default Contact;
