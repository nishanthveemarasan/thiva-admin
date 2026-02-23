import React from "react";
import { required } from "../Helper/Validator";
import FormInputItem from "../UI/FormInputItem";
import AButton from "../UI/AButton";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ABadge from "../UI/ABadge";
import AIcon from "../UI/AIcon";
import { cilX } from "@coreui/icons";
import { experienceStoreActions } from "../../store/store";
const Skills = () => {
  const mapStateToProps = createSelector(
    [(state) => state.experienceStore.skills],
    (skills) => ({
      skills,
    })
  );
  const { skills } = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({
    skill: {
      value: "",
      error: "Skill is required",
      valid: false,
      validators: [required],
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
        value: value,
        valid: isValid,
      },
    });
  };

  const onAddSkillHandler = () => {
    setSubmitted(true);
    let isFormValid = true;
    for (const key in form) {
      form[key].validators.forEach((validator) => {
        isFormValid = isFormValid && validator(form[key].value);
      });
    }
    if (isFormValid) {
      const formData = {
        skill: form.skill.value.trim(),
      };
      dispatch(experienceStoreActions.addSkill(formData.skill));
      setForm({
        ...form,
        skill: {
          ...form.skill,
          value: "",
          valid: false,
        },
      });
      setSubmitted(false);
    }
  };

  const onRemoveSkillHandler = (index) => {
    dispatch(experienceStoreActions.removeSkill(index));
  }
  return (
    <>
      <div className="border rounded p-3 mb-4 col-12 col-md-6">
        <div className="row">
          <FormInputItem
            autoComplete="job-title"
            value={form.skill.value}
            change={onChangeHandler}
            valid={!form.skill.valid && submitted}
            error={form.skill.error}
            input="skill"
            formLable={"Skill"}
            className="col-12 "
          />
        </div>
        <AButton
          block={true}
          btnLabel={"Add Skill"}
          click={onAddSkillHandler}
        />
      </div>

      {skills.length > 0 && <div className="d-flex flex-wrap">{skills.map((skill, index) => (
        <AButton
          key={index}
          color="warning"
          btnLabel={<div className="d-flex align-items-center">
            <span className="me-2">{skill}</span> <ABadge badgeLabel={<AIcon icon={cilX} />} />
          </div>}
          className={"me-1"}
          click={()=>onRemoveSkillHandler(index)}
          />
          ))}</div>}
        
    </>
  );
};
export default Skills;
