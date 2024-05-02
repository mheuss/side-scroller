import { Action, createSlice } from "@reduxjs/toolkit";

interface IProjectAction extends Action {
  payload: string;
}

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    value: "TwoA",
  },
  reducers: {
    changeProject: (state: any, action: IProjectAction) => {
      alert("Reducer - Project changed to " + action.payload);
      return { ...state, value: action.payload };
    },
  },
});

export const { changeProject } = projectSlice.actions;
export default projectSlice.reducer;
