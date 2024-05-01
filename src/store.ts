import { configureStore } from "@reduxjs/toolkit";

export interface IState {
  project: string;
}

export default configureStore({ reducer: {} });
