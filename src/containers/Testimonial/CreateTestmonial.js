import React, { useState, useEffect } from "react";
import { number, range, required } from "../../components/Helper/Validator";
import FormInputItem from "../../components/UI/FormInputItem";
import MyCKEditor from "../../components/UI/MyCKEditor";
import AButton from "../../components/UI/AButton";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTestimonial,
  updateTestimonial,
} from "../../store/reducer/testimonialReducer";
import { CSpinner } from "@coreui/react";
import { testimonialStoreActions } from "../../store/store";

const CreateTestmonial = () => {
  const { uuid } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    title: {
      value: "",
      error: "Title is required",
      valid: false,
      validators: [required],
    },
    star: {
      value: "",
      error: "Rating is required(1-5)",
      valid: false,
      validators: [number, range({ min: 1, max: 5 })],
    },

    content: {
      value: "",
      error: "Content is required",
      valid: false,
      validators: [required],
    },
  });

  const mapStateToProps = createSelector(
    [(state) => state.testimonialStore.selectedTestimonial],
    (selectedTestimonial) => ({
      selectedTestimonial,
    })
  );
  const [isFetched, setIsFetched] = useState(false);
  const { selectedTestimonial } = useSelector(mapStateToProps);

  useEffect(() => {
    if (uuid) {
      if (!selectedTestimonial) {
        dispatch(getTestimonial(uuid, setIsFetched));
      } else {
        setForm((prevState) => {
          const updatedForm = { ...prevState };
          for (const key in updatedForm) {
            if (selectedTestimonial[key]) {
              updatedForm[key] = {
                ...updatedForm[key],
                value: selectedTestimonial[key],
                valid: true,
              };
            }
          }
          return updatedForm;
        });
      }
    }else{
      dispatch(testimonialStoreActions.setSelectedTestimonial(null));
      updatedForm();
    }
  }, [uuid, selectedTestimonial]);
  const onChangeHandler = (value, name) => {
    let isValid = true;
    form[name].validators.forEach((validator) => {
      isValid = isValid && validator(value);
    });
    setForm((prevState) => {
      let copyState = { ...prevState };
      copyState[name] = {
        ...prevState[name],
        value,
        valid: isValid,
      };
      return copyState;
    });
  };

  const onSubmitHandler = () => {
    setSubmitted(true);
    let isFormValid = true;
    for (const key in form) {
      form[key].validators.forEach((validator) => {
        isFormValid = isFormValid && validator(form[key].value);
      });
    }
    if (!isFormValid) return;
    const formData = {
      first_name: form.first_name.value.trim(),
      last_name: form.last_name.value.trim(),
      title: form.title.value.trim(),
      star: +form.star.value,
      content: form.content.value.trim(),
    };
    dispatch(
      updateTestimonial(
        formData,
        navigate,
        selectedTestimonial?.uuid,
        setIsLoading
      )
    );
  };

  const updatedForm = (obj = null) => {
    setForm((prevState) => {
      const updatedForm = { ...prevState };
      for (const key in updatedForm) {
          updatedForm[key] = {
            ...updatedForm[key],
            value: obj ? obj[key] : "",
            valid: !!(obj && obj[key]),
          };
      }
      return updatedForm;
    });
  }

  return (
    <div className="border rounded p-3 mb-4 col-12 col-md-6">
      <div className="row">
        <FormInputItem
          autoComplete="first-name"
          value={form.first_name.value}
          change={onChangeHandler}
          valid={!form.first_name.valid && submitted}
          error={form.first_name.error}
          input="first_name"
          formLable={"First Name"}
          className="col-12 col-sm-6"
        />
        <FormInputItem
          autoComplete="last-name"
          value={form.last_name.value}
          change={onChangeHandler}
          valid={!form.last_name.valid && submitted}
          error={form.last_name.error}
          input="last_name"
          formLable={"Last Name"}
          className="col-12 col-sm-6"
        />
      </div>
      <div className="row">
        <FormInputItem
          autoComplete="title"
          value={form.title.value}
          change={onChangeHandler}
          valid={!form.title.valid && submitted}
          error={form.title.error}
          input="title"
          formLable={"Title"}
          className="col-12 "
        />
      </div>
      <div className="row">
        <FormInputItem
          autoComplete="rating"
          type="number"
          value={form.star.value}
          change={onChangeHandler}
          valid={!form.star.valid && submitted}
          error={form.star.error}
          input="star"
          formLable={"Rating"}
          className="col-12"
        />
      </div>
      <div className="row mb-2">
        {!form.content.valid && form.content.error && submitted && (
          <p style={{ color: "red", fontSize: "10px" }}>
            {form.bottom_line.error}
          </p>
        )}
        <div className="text-2xl font-bold mb-1">Content</div>
        <MyCKEditor
          value={form.content.value}
          type="content"
          onChange={onChangeHandler}
          placeholder={"About Me content"}
          height={"200px"}
        />
      </div>
      <AButton
        block={true}
        btnLabel={
          selectedTestimonial ? "Update Testimonial" : "Add Testimonial"
        }
        click={onSubmitHandler}
        disabled={isLoading}
      />
    </div>
  );
};
export default CreateTestmonial;
