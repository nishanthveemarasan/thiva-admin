import { createSlice } from "@reduxjs/toolkit";
import { updateSkill } from "../reducer/skillReducer";

const initialState = {
  experience: [],
    education:[],
    skills:[],
    actionSkills:[],
    selectedExperience: null,
     selectedEducation: null
};

const experienceSlice = createSlice({
    name: "experience",
    initialState,
    reducers: {
        selectedExperience: (state, action) => {
            state.selectedExperience = action.payload;
        },
         selectedEducation: (state, action) => {
            state.selectedEducation = action.payload;
        },
        setExperience: (state, action) => {
            state.experience = action.payload;
        },
        setEducation: (state, action) => {
            state.education = action.payload;
        },
        addExperience: (state, action) => {
            state.experience.push(action.payload);
        },
        removeExperience: (state, action) => {
            state.experience = state.experience.filter((exp, index) => exp.uuid !== action.payload);
        },
        updateExperience: (state, action) => {
            const experience = action.payload;
            const index = state.experience.findIndex((exp) => exp.uuid === experience.uuid);
            if (index >= 0 && index < state.experience.length) {
                state.experience[index] = experience;
            }
        },
        reorderExperience: (state, action) => {
            const { index, direction } = action.payload;
            const isMovingUp = direction === "up";
            if (
                (isMovingUp && index === 0) ||
                (!isMovingUp && index === state.experience.length - 1)
            ) {
                return;
            }
            const newIndex = isMovingUp ? index - 1 : index + 1;
            [state.experience[index], state.experience[newIndex]] =
                [state.experience[newIndex], state.experience[index]];  
        },
        addEducation: (state, action) => {
            state.education.push(action.payload);
        },
        removeEducation: (state, action) => {
            state.education = state.education.filter((edu, index) => edu.uuid !== action.payload);
        },
        updateEducation: (state, action) => {
            const education = action.payload;
            const index = state.education.findIndex((edu) => edu.uuid === education.uuid);
            if (index >= 0 && index < state.education.length) {
                state.education[index] = education;
            }
        },
        reorderEducation: (state, action) => {
            const { index, direction } = action.payload;
            const isMovingUp = direction === "up";
            if (
                (isMovingUp && index === 0) ||
                (!isMovingUp && index === state.education.length - 1)
            ) {
                return;
            }
            const newIndex = isMovingUp ? index - 1 : index + 1;
            [state.education[index], state.education[newIndex]] =
                [state.education[newIndex], state.education[index]];  
        },
        setSkills: (state, action) => {
            state.skills = action.payload;
        },
        addSkill: (state, action) => {
            state.skills.push(action.payload);
            state.actionSkills.push(action.payload);
        },
        removeSkill: (state, action) => {
            let skill = state.skills.find((skill) => skill.name === action.payload);
            let actionSkill = state.actionSkills.find((skill) => skill.name === action.payload);
            if(actionSkill){
                state.actionSkills = state.actionSkills.filter((skill) => skill.name !== action.payload);
            }else{
                state.actionSkills.push({name:action.payload, action:'delete', uuid: skill.uuid});
            }
            state.skills = state.skills.filter((skill, index) => skill.name !== action.payload);
        },
        updateSkill: (state, action) => {
            state.actionSkills = [];
        }

    },
})

export default experienceSlice;