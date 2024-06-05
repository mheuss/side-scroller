/*
 * See note in global-state
 */

import { Action, createSlice } from "@reduxjs/toolkit";

interface IProjectAction extends Action {
  payload: string;
}

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    value: "SideScroller",
  },
  reducers: {
    changeProject: (state: any, action: IProjectAction) => {
      return { ...state, value: action.payload };
    },
  },
});

export function selectProject(state: any) {
  return state.project.value;
}

export const { changeProject } = projectSlice.actions;
export default projectSlice.reducer;
