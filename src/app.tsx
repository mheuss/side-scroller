import * as React from "react";
import { SideScroller } from "src/side-scroller";

export const App = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className={"border-gray-500 border border-solid bg-white"}>
        <SideScroller />
      </div>
    </div>
  );
};
