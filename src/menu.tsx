import { useDispatch, useSelector } from "react-redux";
import { IState } from "src/redux/global-state";
import * as React from "react";

export function Menu() {
  const project = useSelector((state: IState) => state.project);
  const dispatch = useDispatch();

  const handleClick = (project: string) => {
    dispatch({ type: "changeProject", payload: project });
    alert("Project changed to " + project);
  };

  return (
    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
      <a
        href="#"
        className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
        onClick={() => handleClick("TwoA")}
      >
        Project 2A
      </a>
      <a
        href="#"
        className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
        onClick={() => handleClick("TwoB")}
      >
        Project 2B
      </a>
    </div>
  );
}
