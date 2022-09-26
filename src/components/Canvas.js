import React from "react";
import templates from "./Templates";
import { useSelector } from "react-redux";
import {
  selectedFile,
  selectLastTemplate,
  selectPage,
  selectPicture,
} from "../Store/store";
import "./Canvas.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Template from "./Template";

function Canvas({}) {
  const picture = useSelector(selectPicture);
  const page = useSelector(selectPage);
  const lastTemplate = useSelector(selectLastTemplate);
  const selectFiles = useSelector(selectedFile);

  //   const page = useSelector(selectPage)
  return (
    <div className="canvas">
      {/* <div className="canvas__image">
        {picture?.img && (
          <div className="canvas__headings">
            <div className="headings">
              <h1>{picture?.text_cta}</h1>
              <div className="heading2">
                <h2>{picture?.text_heading}</h2>
              </div>
            </div>
          </div>
        )}
        <img src={picture?.img} alt="" />
      </div> */}

      {picture && page === 0 && (
        <div className="canvas__image">
          <Template
            id={picture?.id}
            img={picture?.img}
            video={picture?.video}
            text_heading={picture?.text_heading}
            text_cta={picture?.text_cta}
            addImg={picture?.addImg}
            style={{ height: "700px", width: "400px" }}
          />
        </div>
      )}
      {lastTemplate && page === 2 && (
        <div className="canvas__image">
          <Template
            id={lastTemplate?.id}
            img={lastTemplate?.img}
            style={{ height: "700px", width: "400px" }}
          />
        </div>
      )}
    </div>
  );
}

export default Canvas;
