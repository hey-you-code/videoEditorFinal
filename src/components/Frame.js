import React from "react";
import { useSelector } from "react-redux";
import SplitPane, { Pane } from "react-split-pane";
import { selectPicture } from "../Store/store";
import "./Frame.css"
import Template from "./Template";


function Frame() {
  const picture = useSelector(selectPicture);
  return (
    <div className="frame">
      <Template
            id={picture?.id}
            img={picture?.img}
            text_heading={picture?.text_heading}
            text_cta={picture?.text_cta}
          />
   
   </div>
  );
}

export default Frame;
