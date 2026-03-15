import { createSlice } from "@reduxjs/toolkit";

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    user: null,
    projects: [],
    skills: [],
    applications: [],
  },
  reducers: {
    setPortfolioData: (state, action) => {
      state.user = action.payload.user;
      state.projects = action.payload.projects;
      state.skills = action.payload.skills;
      state.applications = action.payload.applications;
    },
  },
});

export const { setPortfolioData } = portfolioSlice.actions;
export default portfolioSlice.reducer;
