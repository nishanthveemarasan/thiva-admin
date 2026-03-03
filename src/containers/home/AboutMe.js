import React, { useState, useEffect } from "react";
import MyCKEditor from "../../components/UI/MyCKEditor";
import { email, image, required } from "../../components/Helper/Validator";
import FormFileItem from "../../components/UI/FormFileItem";
import AButton from "../../components/UI/AButton";
import FormInputItem from "../../components/UI/FormInputItem";
import HTTP from "../../components/Axios/api";
import AErrors from "../../components/UI/AErrors";
import ASpinner from "../../components/UI/ASpinner";
const AboutMe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [uuid, setUuid] = useState('');
 const [errors, setErrors] = useState([]);
 const [form, setForm] = useState({
   first_name: {
     value: "",
     error: "First Name is required",
     valid: false,
     validators: [required],
   },
   last_name: {
     value: "",
     error: "Last Name is required",
     valid: false,
     validators: [required],
   },
   last_name: {
    value: "",
    error: "Last Name is required",
    valid: false,
    validators: [required],
  },
   qualification: {
     value: "",
     error: "Qualification is required",
     valid: false,
     validators: [required],
   },
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
     validators: [image],
     error: "Image is required",
   },
  });
  useEffect(() => {
    const fetchData = async () => {
      // Pass setLoading in the options object
      const response = await HTTP.request("GET", "user/profile-info", null, {
        setLoading: setIsLoading,
        isAuthenticated: true,
      });
  
      if (!response.error) {
        const { result } = response;
        if(result.data && result.data.uuid){
          const profileInfo = result.data;
          setUuid(profileInfo.uuid);
          setForm(prevState => {
            const updatedForm = { ...prevState };
            for (const key in updatedForm) {
              if (profileInfo[key]) {
                updatedForm[key] = {
                  ...updatedForm[key],
                  value: key === "image" ? "" : profileInfo[key],
                  valid: true,
                  src: key === "image" ? profileInfo[key].full_url : null,
                };
              }
            }
            return updatedForm;
          });
        }
      }
    };
    fetchData();
  }, []);

  const onChangeHandler = (value, name) => {
    let isValid = true;
    form[name].validators.forEach((validator) => {
      isValid = isValid && validator(value);
    });
    setForm(prevState => {
      const updatedForm = { ...prevState };
      updatedForm[name] = {
        ...updatedForm[name],
        value,
        valid: isValid,
        src: name === "image" ? URL.createObjectURL(value) : null,
      };
      return updatedForm;
    });
    //   ...form,
    //   [name]: {
    //     ...form[name],
    //     value,
    //     valid: isValid,
    //     src: name === "image" ? URL.createObjectURL(value) : null,
    //   },
    // });
  };

  const onSubmitHandler = async() => {
    setErrors([])
    
    ;
    let isFormValid = true;
    for (const key in form) {
      let isValid = true;
      form[key].validators.forEach((validator) => {
        if(key === "image" && form[key].value === "" && uuid ){
          return;
        }
        isValid = isValid && validator(form[key].value);
      });
      if(!isValid){
        setErrors((prevErrors) => [...prevErrors, form[key].error]);
      }
      isFormValid = isFormValid && isValid;
    }
    if (isFormValid) {
      setErrors([]);
      let formData = new FormData();
      for (const key in form) {
        if(key === "image" && form[key].value === "" && uuid ){
          continue;
        }
        formData.append(key, form[key].value);
      }
      if (uuid) {
        formData.append('uuid', uuid);
      }
      setIsSending(true);
      const response = await HTTP.request("POST", "user/profile-info", formData, {
        setLoading: setIsSending,
        isAuthenticated: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
  
      if (!response.error) {
        const { result } = response;
        if(result.data){
          setUuid(result.data.uuid);
        }
      }
      
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <AButton
          click={onSubmitHandler}
          disabled={isSending}
          btnLabel={
            <>
              <span className="me-2">Save</span>
            </>
          }
        />
      </div>
      {errors.length > 0 &&<AErrors errors={errors} />}
      <div className="mb-4">
        <div className="row">
          <FormInputItem
              autoComplete="first-name"
              value={form.first_name.value}
              change={onChangeHandler}
              input="first_name"
              formLable={"First Name"}
              className="col-12 col-md-3"
          />
          <FormInputItem
              autoComplete="last-name"
              value={form.last_name.value}
              change={onChangeHandler}
              input="last_name"
              formLable={"Last Name"}
              className="col-12 col-md-3"
            />
        </div>
        <div className="row">
          <FormInputItem
            autoComplete="phone-number"
            type="text"
            value={form.phone.value}
            change={onChangeHandler}
            input="phone"
            formLable={"Phone Number"}
            className="col-12 col-md-3"
          />
          <FormInputItem
              autoComplete="qualification"
              value={form.qualification.value}
              change={onChangeHandler}
              input="qualification"
              formLable={"Qualification"}
              className="col-12 col-md-3"
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
        <div className="text-2xl font-bold mb-1">Bottom Line</div>
        <MyCKEditor
          value={form.bottom_line.value}
          type="bottom_line"
          onChange={onChangeHandler}
          placeholder={"About Me content"}
        />
      </div>
      <div className="mb-4">
        <div className="text-2xl font-bold mb-1">Biography</div>
        <MyCKEditor
          value={form.biography.value}
          type="biography"
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
