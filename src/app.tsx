import * as React from "react";
import { TwoA } from "src/projects/TwoA";
import { IState } from "src/redux/global-state";
import { useSelector } from "react-redux";
import { TwoB } from "src/projects/TwoB";
import { selectProject } from "src/redux/project";
import { JSX } from "react";
import { Animator } from "src/projects/Animator";
import { ThreeA } from "src/projects/ThreeA";

export const App = () => {
  const project = useSelector(selectProject);

  // Yes, I could use a router here. Probably should do that.
  let childComponent: JSX.Element | null = null;

  if (project === "TwoA") {
    childComponent = <TwoA />;
  } else if (project === "TwoB") {
    childComponent = <TwoB />;
  } else if (project === "animator") {
    childComponent = <Animator />;
  } else if (project === "ThreeA") {
    childComponent = <ThreeA />;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className={"border-gray-500 border border-solid bg-white"}>
        {childComponent}
      </div>
    </div>
  );
};
