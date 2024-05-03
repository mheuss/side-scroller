import * as React from "react";
import { TwoA } from "src/projects/TwoA";
import { IState } from "src/redux/global-state";
import { useSelector } from "react-redux";
import { TwoB } from "src/projects/TwoB";
import { selectProject } from "src/redux/project";

export const App = () => {
  const project = useSelector(selectProject);

  console.log(project);
  console.log(project === "TwoB");
  return (
    <div className="h-screen flex items-center justify-center">
      <div className={"border-gray-500 border border-solid bg-white"}>
        {project === "TwoB" ? <TwoB /> : <TwoA />}
      </div>
    </div>
  );
};
