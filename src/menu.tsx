import { useDispatch, useSelector } from "react-redux";
import { IState } from "src/redux/global-state";
import * as React from "react";
import { changeProject, selectProject } from "./redux/project";

interface IMenuItems {
  project: string;
  title: string;
}

export function Menu() {
  const project = useSelector(selectProject);
  const dispatch = useDispatch();

  const projectInventory: IMenuItems[] = [
    { project: "animator", title: "Animator" },
    {
      project: "TwoA",
      title: "Project 2A",
    },
    {
      project: "TwoB",
      title: "Project 2B",
    },
    { project: "ThreeA", title: "Side Scroller" },
  ];

  const handleClick = (project: string) => {
    dispatch(changeProject(project));
  };

  const selectedClass =
    "border-indigo-500 text-indigo-600 hover:border-indigo-300 hover:text-indigo-700 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium";

  const unSelectedClass = `border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-100 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`;

  console.log("project", project);

  return (
    <nav className="-mb-px flex space-x-8 ml-8" aria-label="Tabs">
      {projectInventory.map((item: IMenuItems) => {
        console.log(project, item.project);
        return (
          <a
            href="#"
            key={`menu-key-${item.project}`}
            className={
              project === item.project ? selectedClass : unSelectedClass
            }
            onClick={() => {
              // Only fire if we are changing
              if (project !== item.project) handleClick(item.project);
            }}
            aria-current={project === item.project ? "page" : undefined}
          >
            {item.title}
          </a>
        );
      })}
    </nav>
  );
}
