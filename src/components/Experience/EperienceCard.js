import React, { useState, useEffect } from "react";
import { required } from "../Helper/Validator";
import FormInputItem from "../UI/FormInputItem";
import FormTextArea from "../UI/FormTextArea";
import AButton from "../UI/AButton";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { experienceStoreActions } from "../../store/store";
import ACard from "../UI/ACard";
import AIcon from "../UI/AIcon";
import {
  cilArrowCircleBottom,
  cilArrowCircleTop,
  cilPencil,
  cilTrash,
} from "@coreui/icons";
import HTTP from "../Axios/api";
import { addExperience, deleteExperience, updateExperience } from "../../store/reducer/experienceReducer";
const EperienceCard = () => {
  const mapStateToProps = createSelector(
    [
        (state) => state.experienceStore.experience,
        (state) => state.experienceStore.selectedExperience
    ],
    (experience,selectedExperience) => ({
      experience,selectedExperience
    })
  );
  const { experience, selectedExperience } = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    from: {
      value: "",
      error: "Start Year of experience is required",
      valid: false,
      validators: [required],
    },
    to: {
      value: "",
      error: "Experience End year is required",
      valid: true,
      validators: [required],
    },
    role: {
      value: "",
      valid: false,
      src: "",
      validators: [required],
      error: "Job Title is required",
    },
    company: {
      value: "",
      valid: false,
      src: "",
      validators: [required],
      error: "Company is required",
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
        const response = await HTTP.request("GET", "user/experience", null, {
                setLoading: isLoading,
                isAuthenticated: true,
              });
        if(!response.error){
            const {result} = response;
            if(result.success){
                let list = result.data.data;
                dispatch(experienceStoreActions.setExperience(list));
            }
        }
    }
    fetchData();
  }, []);

  console.log(experience);
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

  const onAddExperienceHandler = () => {
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
        role: form.role.value.trim(),
        company: form.company.value.trim(),
        description: form.description.value.trim(),
      };
      if(selectedExperience){
        dispatch(updateExperience(formData, selectedExperience.uuid));
      }else{
          dispatch(addExperience(formData));
      }
      updateForm();
    }
  };

  const onDeleteExperienceHandler = (index) => {
    dispatch(deleteExperience(experience[index].uuid));
  };

  const onMoveExperienceHandler = (index, direction) => {
    dispatch(experienceStoreActions.reorderExperience({ index, direction }));
  };
  const onEditExperienceHandler = (experience) => {
    updateForm(experience);
    dispatch(experienceStoreActions.selectedExperience(experience));
  };

  const updateForm = (obj = null) => {
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
            value={form.role.value}
            change={onChangeHandler}
            valid={!form.role.valid && submitted}
            error={form.role.error}
            input="role"
            formLable={"Job Title"}
            className="col-12 "
          />
        </div>
        <div className="row">
          <FormInputItem
            autoComplete="company"
            value={form.company.value}
            change={onChangeHandler}
            valid={!form.company.valid && submitted}
            error={form.company.error}
            input="company"
            formLable={"Company"}
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
          btnLabel={selectedExperience ? "Update Experience" : "Add Experience"}
          click={onAddExperienceHandler}
        />
      </div>
      {experience.length > 0 &&
        experience.map((exp, index) => (
          <div key={index} className="p-3 mb-1 col-12 col-md-6">
            <ACard
              title={
                <div className="d-flex justify-content-between align-items-center">
                  <h5>{exp.role}</h5>
                  <div>
                    <div className="flex items-center">
                      <AIcon
                        icon={cilTrash}
                        className="me-2"
                        click={() => onDeleteExperienceHandler(index)}
                      />
                      <AIcon
                        icon={cilPencil}
                        className="me-2"
                        click={() => onEditExperienceHandler(exp)}
                      />
                      {index !== 0 && (
                        <AIcon
                          icon={cilArrowCircleTop}
                          className="me-2"
                          click={() => onMoveExperienceHandler(index, "up")}
                        />
                      )}
                      {index < experience.length - 1 &&
                        experience.length !== 1 && (
                          <AIcon
                            icon={cilArrowCircleBottom}
                            click={() => onMoveExperienceHandler(index, "down")}
                          />
                        )}
                    </div>
                  </div>
                </div>
              }
            >
              <span>
                {exp.from} - {exp.to || "Present"}
              </span>
              <h6>At {exp.company}</h6>
              <p>{exp.description}</p>
            </ACard>
          </div>
        ))}
    </>
  );
};
export default EperienceCard;
