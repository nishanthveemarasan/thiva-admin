import React, { useState } from "react";
import { image, required } from "../components/Helper/Validator";
import FormInputItem from "../components/UI/FormInputItem";
import FormFileItem from "../components/UI/FormFileItem";
import AButton from "../components/UI/AButton";
const FeaturedProjects = () => {
  const [form, setForm] = useState({
    name: {
      value: "",
      error: "Project Name is required",
      valid: false,
      validators: [required],
    },
    type: {
      value: "",
      error: "Project Type is required",
      valid: false,
      validators: [required],
    },
    city: {
      value: "",
      error: "City is required",
      valid: false,
      validators: [required],
    },
    image: {
      value: "",
      valid: false,
      src: "",
      validators: [image],
      error: "Image is required",
    },
  });

  const onChangeHandler = (value, name) => {
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
        src: name === "image" ? URL.createObjectURL(value) : null,
      },
    });
  };

  const onSubmitHandler = () => {
    let isFormValid = true;
    for (const key in form) {
      form[key].validators.forEach((validator) => {
        isFormValid = isFormValid && validator(form[key].value);
      });
    }
    if (isFormValid) {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key].value);
      }
      console.log(formData);
    }
}
  return (
    <>
      <div className="d-flex justify-content-end">
        <AButton
          click={onSubmitHandler}
          btnLabel={
            <>
              <span className="me-2">Save</span>
            </>
          }
        />
      </div>
      <FormInputItem
        autoComplete="project-name"
        value={form.name.value}
        change={onChangeHandler}
        input="name"
        formLable={"Project Name"}
        className="col-12 col-md-6"
      />
      <FormInputItem
        autoComplete="project-type"
        value={form.type.value}
        change={onChangeHandler}
        input="type"
        formLable={"Project Type"}
        className="col-12 col-md-6"
      />
      <FormInputItem
        autoComplete="city"
        value={form.city.value}
        change={onChangeHandler}
        input="city"
        formLable={"City"}
        className="col-12 col-md-6"
      />
      <div className="mb-4">
        <FormFileItem
          change={onChangeHandler}
          btnLabel={<span className="text-white">Add Projects Image</span>}
        />
      </div>
      {form.image.src && (
        <div className="mb-4">
          <img
            src={form.image.src}
            alt={`Profile Image`}
            style={{ width: "400px", height: "200px" }}
          />
        </div>
      )}
    </>
  );
};
export default FeaturedProjects;
