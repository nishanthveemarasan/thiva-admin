import React, { useState , useEffect} from "react";
import { required } from "../Helper/Validator";
import FormInputItem from "../UI/FormInputItem";
import FormTextArea from "../UI/FormTextArea";
import AButton from "../UI/AButton";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import ACard from "../UI/ACard";
import AIcon from "../UI/AIcon";
import {
  cilArrowCircleBottom,
  cilArrowCircleTop,
  cilPencil,
  cilTrash,
} from "@coreui/icons";
import { experienceStoreActions } from "../../store/store";
import HTTP from "../Axios/api";
import { deleteEducation, updateEducation } from "../../store/reducer/educationReducer";
const EducationCard = () => {
  const mapStateToProps = createSelector(
    [
        (state) => state.experienceStore.education,
        (state) => state.experienceStore.selectedEducation
    ],
    (education, selectedEducation) => ({
      education, selectedEducation
    })
  );
  const { education, selectedEducation } = useSelector(mapStateToProps);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    from: {
      value: "",
      error: "Start Year of Education is required",
      valid: false,
      validators: [required],
    },
    to: {
      value: "",
      error: "Education End year is required",
      valid: false,
      validators: [required],
    },
    course: {
      value: "",
      valid: false,
      validators: [required],
      error: "Course name is required",
    },
    institution: {
      value: "",
      valid: false,
      validators: [required],
      error: "Institution Name is required",
    },
    description: {
      value: "",
      error: "Description is required",
      valid: false,
      validators: [required],
    },
  });
  useEffect(() => {
    const fetchData = async () => {
        if(education.length > 0) return;
      const response = await HTTP.request("GET", "user/education", null, {
        setLoading: isLoading,
        isAuthenticated: true,
      });
      if (!response.error) {
        const { result } = response;
        if (result.success) {
          let list = result.data.data;
          dispatch(experienceStoreActions.setEducation(list));
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
    if (name == "to" && value == "") isValid = true;
    setForm({
      ...form,
      [name]: {
        ...form[name],
        value: value,
        valid: isValid,
      },
    });
  };

  const onAddEducationHandler = () => {
    setSubmitted(true);
    let isFormValid = true;
    for (const key in form) {
      if (key === "to" && form[key].value === "") continue;
      form[key].validators.forEach((validator) => {
        isFormValid = isFormValid && validator(form[key].value);
      });
    }
    if (isFormValid) {
      const formData = {
        from: +form.from.value,
        to: form.to.value ? +form.to.value : "",
        course: form.course.value.trim(),
        institution: form.institution.value.trim(),
        description: form.description.value.trim(),
      };
      console.log(formData);
      if(selectedEducation){
        dispatch(updateEducation(formData, selectedEducation.uuid));
      }else{
          dispatch(updateEducation(formData));
      }
      updateForm();
    }
  };

  const onDeleteEducationHandler = (uuid) => {
    dispatch(deleteEducation(uuid));
  };

  const onMoveEducationHandler = (index, direction) => {
    dispatch(experienceStoreActions.reorderEducation({ index, direction }));
  };
  const onEditEducationHandler = (education) => {
    updateForm(education);
    dispatch(experienceStoreActions.selectedEducation(education));
  };

  const updateForm = (obj) => {
    setForm((prevState) => {
      const copyObject = { ...prevState };
      for (const key in copyObject) {
        copyObject[key] = {
          ...prevState[key],
          value: obj ? String(obj[key]) : "",
          valid: obj ? true : false,
        };
      }
      return copyObject;
    });
    setSubmitted(false);
  };
  return (
    <>
      
      <div className="border rounded p-3 mb-4 col-12 col-md-6">
        <div className="row">
          <FormInputItem
            autoComplete="start-year"
            value={form.from.value}
            change={onChangeHandler}
            valid={!form.from.valid && submitted}
            error={form.from.error}
            input="from"
            formLable={"Start Year"}
            className="col-12 col-md-6"
          />
          <FormInputItem
            autoComplete="end-year"
            value={form.to.value}
            change={onChangeHandler}
            valid={!form.to.valid && submitted}
            error={form.to.error}
            input="to"
            formLable={"End Year"}
            className="col-12 col-md-6"
          />
        </div>
        <div className="row">
          <FormInputItem
            autoComplete="job-title"
            value={form.course.value}
            change={onChangeHandler}
            valid={!form.course.valid && submitted}
            error={form.course.error}
            input="course"
            formLable={"Course Name"}
            className="col-12 "
          />
        </div>
        <div className="row">
          <FormInputItem
            autoComplete="institution"
            value={form.institution.value}
            change={onChangeHandler}
            valid={!form.institution.valid && submitted}
            error={form.institution.error}
            input="institution"
            formLable={"Institution"}
            className="col-12"
          />
        </div>
        <div className="row">
          <FormTextArea
            autoComplete="description"
            value={form.description.value}
            change={onChangeHandler}
            valid={!form.description.valid && submitted}
            error={form.description.error}
            input="description"
            formLable={"Description"}
            className="col-12"
          />
        </div>
        <AButton
          block={true}
          btnLabel={selectedEducation ? "Update Education":"Add Education"}
          click={onAddEducationHandler}
        />
      </div>
      {education.length > 0 &&
        education.map((edu, index) => (
          <div key={index} className="p-3 mb-1 col-12 col-md-6">
            <ACard
              title={
                <div className="d-flex justify-content-between align-items-center">
                  <h5>{edu.course}</h5>
                  <div>
                    <div className="flex items-center">
                      <AIcon
                        icon={cilTrash}
                        className="me-2"
                        click={() => onDeleteEducationHandler(edu.uuid)}
                      />
                      <AIcon
                        icon={cilPencil}
                        className="me-2"
                        click={() => onEditEducationHandler(edu)}
                      />
                      {index !== 0 && (
                        <AIcon
                          icon={cilArrowCircleTop}
                          className="me-2"
                          click={() => onMoveEducationHandler(index, "up")}
                        />
                      )}
                      {index < education.length - 1 &&
                        education.length !== 1 && (
                          <AIcon
                            icon={cilArrowCircleBottom}
                            click={() => onMoveEducationHandler(index, "down")}
                          />
                        )}
                    </div>
                  </div>
                </div>
              }
            >
              <span>
                {edu.from} - {edu.to}
              </span>
              <h6>At {edu.institution}</h6>
              <p>{edu.description}</p>
            </ACard>
          </div>
        ))}
    </>
  );
};
export default EducationCard;
