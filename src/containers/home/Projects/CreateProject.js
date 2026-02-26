import React, { useState, useEffect } from "react";
import { image, required } from "../../../components/Helper/Validator";
import AButton from "../../../components/UI/AButton";
import FormInputItem from "../../../components/UI/FormInputItem";
import FormFileItem from "../../../components/UI/FormFileItem";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { getProject, updateProject } from "../../../store/reducer/projectReducer";
import { useNavigate, useParams } from "react-router-dom";
import { projectStoreActions } from "../../../store/store";

const CreateProject = () => {
  const { uuid } = useParams();
  const mapStateToProps = createSelector(
    [(state) => state.projectStore.selectedProject],
    (selectedProject) => ({
      selectedProject,
    })
  );
  const[isFetched, setIsFetched] = useState(false);
  const { selectedProject } = useSelector(mapStateToProps);
  useEffect(() => {
    if(uuid){
      if (!selectedProject ) {
        dispatch(getProject(uuid, setIsFetched));
      } else {
        updateForm(selectedProject);
      }

    }else{
      dispatch(projectStoreActions.setSelectedProject(null));
      updateForm();
    }
  }, [uuid, selectedProject, setIsFetched]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setSubmitted(true);
    let isFormValid = true;
    for (const key in form) {
      form[key].validators.forEach((validator) => {
        if (
          key === "image" &&
          form[key].value === "" &&
          selectedProject?.uuid
        ) {
          return;
        }
        isFormValid = isFormValid && validator(form[key].value);
      });
    }
    if (isFormValid) {
      const formData = new FormData();
      for (const key in form) {
        if (
          key === "image" &&
          form[key].value === "" &&
          selectedProject?.uuid
        ) {
          continue;
        }
        const val = form[key].value;
        if (key === "image") {
          if (val instanceof File) {
            formData.append("image", val);
          }
        } else {
          formData.append(key, val);
        }
      }
      dispatch(
        updateProject(formData, navigate, selectedProject?.uuid, setIsLoading)
      );
    }
  };
  const updateForm = (obj = null) => {
    setForm((prevState) => {
      const copy = { ...prevState };
      for (const key in copy) {
        if (key === "image") {
          copy[key].src = obj ? obj[key].full_url : "";
        }
        copy[key].value = obj && key !== "image" ? obj[key] : "";
        copy[key].valid = !!(obj && key !== "image");
      }
      return copy;
    });
  };
  return (
    <div className="border rounded p-3 mb-4 col-12 col-md-6">
      <FormInputItem
        autoComplete="project-name"
        value={form.name.value}
        change={onChangeHandler}
        valid={!form.name.valid && submitted}
        error={form.name.error}
        input="name"
        formLable={"Project Name"}
        className="col-12"
      />
      <FormInputItem
        autoComplete="project-type"
        value={form.type.value}
        change={onChangeHandler}
        valid={!form.type.valid && submitted}
        error={form.type.error}
        input="type"
        formLable={"Project Type"}
        className="col-12"
      />
      <FormInputItem
        autoComplete="city"
        value={form.city.value}
        change={onChangeHandler}
        input="city"
        formLable={"City"}
        valid={!form.city.valid && submitted}
        error={form.city.error}
        className="col-12"
      />
      <div className="mb-4">
        <FormFileItem
          valid={!form.image.valid && submitted && !selectedProject?.uuid}
          error={form.image.error}
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
      <AButton
        block={true}
        btnLabel={selectedProject ? "Update Project" : "Add Project"}
        click={onSubmitHandler}
        disabled={isLoading}
      />
    </div>
  );
};
export default CreateProject;
