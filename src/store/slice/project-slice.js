import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    projects: [],
    selectedProject: null,
    refresh: false,
}

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        updateRefresh: (state) => {
            state.refresh = !state.refresh;
        },
        setSProjects: (state, action) => {
            state.projects = action.payload;
        },
        setSelectedProject: (state, action) => {
            state.selectedProject = action.payload;
        },
        addProject: (state, action) => {
            state.projects.push(action.payload);
        },
        removeProject: (state, action) => {
            state.projects = state.projects.filter((project, index) => index !== action.payload);
        },
        updateProject: (state, action) => {
            const { index, project } = action.payload;
            if (index >= 0 && index < state.projects.length) {
                state.projects[index] = project;
            }
        }
    }
});

export default projectSlice;