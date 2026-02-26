import React, {useEffect, useState} from "react";
import { required } from "../Helper/Validator";
import FormInputItem from "../UI/FormInputItem";
import AButton from "../UI/AButton";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ABadge from "../UI/ABadge";
import AIcon from "../UI/AIcon";
import { cilX } from "@coreui/icons";
import { experienceStoreActions } from "../../store/store";
import HTTP from "../Axios/api";
import { updateSkill } from "../../store/reducer/skillReducer";
const Skills = () => {
  const mapStateToProps = createSelector(
    [
      (state) => state.experienceStore.skills,
      (state) => state.experienceStore.actionSkills
    ],
    (skills, actionSkills) => ({
      skills, actionSkills
    })
  );
  const { skills, actionSkills } = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const[isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = React.useState({
    skill: {
      value: "",
      error: "Skill is required",
      valid: false,
      validators: [required],
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      if(skills.length > 0) return;
      const response = await HTTP.request("GET", "user/skill", null, {
        setLoading: isLoading,
        isAuthenticated: true,
      });
      if (!response.error) {
        const { result } = response;
        if (result.success) {
          let list = result.data;
          dispatch(experienceStoreActions.setSkills(list));
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
      dispatch(experienceStoreActions.addSkill({name:formData.skill, action:'add'}));
      resetForm();
    }
  };

  const onRemoveSkillHandler = (name) => {
    dispatch(experienceStoreActions.removeSkill(name));
  };
  const onSubmitHandler = () => {
    dispatch(updateSkill({skills:actionSkills}, setIsSubmitting));
    resetForm();
  };

  const resetForm = () => { 
    setForm(prevForm => ({
      ...prevForm,
      skill: {
        ...prevForm.skill,
        value: "",
        valid: false,
      },
    }));
    setSubmitted(false);
  };
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
          disabled={isSubmitting}
        />
      </div>
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

      {skills.length > 0 && (
        <div className="d-flex flex-wrap">
          {skills.map((skill, index) => (
            <AButton
              key={skill.uuid || index}
              color="warning"
              btnLabel={
                <div className="d-flex align-items-center">
                  <span className="me-2">{skill.name}</span>{" "}
                  <ABadge badgeLabel={<AIcon icon={cilX} />} />
                </div>
              }
              className={"me-1 mb-1"}
              click={() => onRemoveSkillHandler(skill.name)}
            />
          ))}
        </div>
      )}
    </>
  );
};
export default Skills;
