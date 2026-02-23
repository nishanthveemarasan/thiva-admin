import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  experience: [
        {
            "from": 2028,
            "to": 2032,
            "role": "fdgd",
            "company": "cvb",
            "description": "cvbvc"
        }
    ],
    education:[
        {
            "from": 2028,
            "to": 2032,
            "course": "fdgd",
            "institution": "cvb",
            "description": "cvbvc"
        }
    ],
    skills:['add', 'deduct']
};

const experienceSlice = createSlice({
    name: "experience",
    initialState,
    reducers: {
        addExperience: (state, action) => {
            state.experience.push(action.payload);
        },
        removeExperience: (state, action) => {
            state.experience = state.experience.filter((exp, index) => index !== action.payload);
        },
        updateExperience: (state, action) => {
            const { index, experience } = action.payload;
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
            state.education = state.education.filter((edu, index) => index !== action.payload);
        },
        updateEducation: (state, action) => {
            const { index, education } = action.payload;
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
            addSkill: (state, action) => {
            state.skills.push(action.payload);
        },
        removeSkill: (state, action) => {
            state.skills = state.skills.filter((skill, index) => index !== action.payload);
        },

    },
})

export default experienceSlice;