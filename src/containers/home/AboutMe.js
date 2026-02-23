import React, { useState } from "react";
import MyCKEditor from "../../components/UI/MyCKEditor";
import { required } from "../../components/Helper/Validator";
import FormFileItem from "../../components/UI/FormFileItem";
const AboutMe = () => {
  const [form, setForm] = useState({
    bottom_line: {
        value: "",
        error: "Bottom Line is required",
        valid: false,
        validators: [required],
    },
    biography: {
      value: "",
      error: "Description is required",
      valid: false,
      validators: [required],
    },
    image: {
      value: "",
      valid: false,
      src: "",
      validators: [required],
      error: "Image is required",
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
        src: name === "image" ? src : null,
      },
    });
  };

  return (
    <>
     <div className="mb-4">
        <div className="text-2xl font-bold mb-1">Bottom Line</div>
        <MyCKEditor
          value={form.bottom_line.value}
          onChange={onChangeHandler}
          placeholder={"About Me content"}
        />
      </div>
      <div className="mb-4">
        <div className="text-2xl font-bold mb-1">Biography</div>
        <MyCKEditor
          value={form.biography.value}
          onChange={onChangeHandler}
          placeholder={"About Me content"}
          height="300px"
        />
      </div>
      <div className="mb-4">
        <FormFileItem
          change={onChangeHandler}
          btnLabel={<span className="text-white">Add Profile Image</span>}
        />
      </div>
      {form.image.src && (
        <div className="mb-4">
          <img
            src={form.image.src}
            alt={`Profile Image`}
            style={{ width: "200px", height: "200px" }}
          />
        </div>
      )}
    </>
  );
};
export default AboutMe;
