import React, { useState, useEffect } from "react";
import { required } from "../Helper/Validator";
import FormInputItem from "../UI/FormInputItem";
import FormTextArea from "../UI/FormTextArea";
import AButton from "../UI/AButton";
import AIcon from "../UI/AIcon";
import { cilPlus, cilTrash } from "@coreui/icons";
import { useDispatch, useSelector } from "react-redux";
import { serviceStoreActions } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { updateService } from "../../store/reducer/serviceReducer";
import { createSelector } from "@reduxjs/toolkit";
const ServiceForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: {
      value: "",
      error: "Title is required",
      valid: false,
      validators: [required],
    },
    description: {
      value: "",
      error: "Description is required",
      valid: false,
      validators: [required],
    },
    points: {
      value: [],
      error: "At least one point is required",
      valid: false,
      validators: [required],
    },
    special_point: {
      value: "",
      error: "Special Point is required",
      valid: false,
      validators: [required],
    },
  });

  const mapStateToProps = createSelector(
    [(state) => state.serviceStore.selectedService],
    (selectedService) => ({
      selectedService,
    })
  );
  const { selectedService } = useSelector(mapStateToProps);

  useEffect(() => {
    if (selectedService) {
      updateForm(selectedService);
    }
  }, [selectedService]);

  const onChangeHandler = (value, name) => {
    let isValid = true;
    form[name].validators.forEach((validator) => {
      isValid = isValid && validator(value);
    });
    setForm({
      ...form,
      [name]: {
        ...form[name],
        value: value,
        valid: isValid,
      },
    });
  };

  const onAddPointHandler = () => {
    setForm((prevState) => {
      const copy = { ...prevState };
      copy.points.value.push("");
      return copy;
    });
  };

  const onChangePointsHandler = (value, name, index) => {
    let isValid = true;
    form.points.validators.forEach((validator) => {
      isValid = isValid && validator(value);
    });
    setForm((prevState) => {
      const copy = { ...prevState };
      copy.points.value[index] = value;
      copy.points.valid = isValid;
      return copy;
    });
  };

  const onDeletePointHandler = (index) => {
    setForm((prevState) => {
      const copy = { ...prevState };
      copy.points.value.splice(index, 1);
      return copy;
    });
  };

  const onAddServiceHandler = () => {
    setSubmitted(true);
    let isFormValid = true;
    for (const key in form) {
      if(key === "points"){
        form[key].value.forEach((point) => {
          form[key].validators.forEach((validator) => {
            isFormValid = isFormValid && validator(point);
          });
        });
        continue;
      }
      form[key].validators.forEach((validator) => {
        isFormValid = isFormValid && validator(form[key].value);
      });
    }
    if (isFormValid) {
      const formData = {
        title: form.title.value,
        description: form.description.value,
        points: form.points.value,
        special_point: form.special_point.value,
      };
      if(!selectedService){
      dispatch(updateService(formData, navigate));
      }else{
        dispatch(updateService(formData, navigate, selectedService.uuid));
      }
      updateForm();
    }
  };

  const updateForm = (obj=null) => {
    setForm(prevState => {
        const copyObject = {...prevState};
        for (const key in copyObject) {
            copyObject[key] = {
                ...prevState[key],
                value: obj ? obj[key] : (Array.isArray(copyObject[key].value) ? [] : ""),
                valid: obj ? true : false,
            }
        }
        return copyObject;
    });
    setSubmitted(false);
}

  return (
    <div className="border rounded p-3 mb-4 col-12 col-md-6">
      <div className="row">
        <FormInputItem
          autoComplete="service-title"
          value={form.title.value}
          change={onChangeHandler}
          valid={!form.title.valid && submitted}
          error={form.title.error}
          input="title"
          formLable={"Title"}
          className="col-12"
        />
      </div>
      <div className="row">
        <FormTextArea
          autoComplete="service-description"
          value={form.description.value}
          change={onChangeHandler}
          valid={!form.description.valid && submitted}
          error={form.description.error}
          input="description"
          formLable={"Description"}
          className="col-12"
        />
      </div>
      <div className="row">
        <FormTextArea
          autoComplete="special-points"
          value={form.special_point.value}
          change={onChangeHandler}
          valid={!form.special_point.valid && submitted}
          error={form.special_point.error}
          input="special_point"
          formLable={"Special Point(About us Page)"}
          className="col-12"
        />
      </div>
      <div>
        {form.points.value.length > 0 && (
          <div>
            <h6>Points</h6>
            {form.points.value.map((point, index) => (
              <div className="row mt-1" key={index}>
                <FormInputItem
                  autoComplete={`point-${index}`}
                  value={point}
                  change={(value, type) => {
                    onChangePointsHandler(value, type, index);
                  }}
                  valid={!form.points.valid && submitted}
                  error={form.points.error}
                  input={`points`}
                  className="col-12"
                  index={index}
                  appendIcon={cilTrash}
                  clickAppend={() => onDeletePointHandler(index)}
                />
              </div>
            ))}
          </div>
        )}
        <div className="d-flex justify-content-end my-2">
          <AButton
            color="success"
            click={onAddPointHandler}
            btnLabel={
              <span className="text-white">
                <AIcon icon={cilPlus} /> Add Points
              </span>
            }
          />
        </div>
      </div>
      <AButton block={true} btnLabel={selectedService ? "Update Service" :"Add Service"} click={onAddServiceHandler}/>
    </div>
  );
};
export default ServiceForm;
