import React from "react";
import { useDispatch } from "react-redux";
import "./Template.css";
import {
  clickedLastTemplate,
  clickedTemplate,
  selectPage,
  setSelectedFile,
} from "../Store/store";
import { useSelector } from "react-redux";
import uuid from "react-uuid";

function Template({ img, id, text_heading, text_cta, video, style, addImg }) {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);

  return (
    <div
      className="template"
      onClick={() => {
        if (page === 0) {
          dispatch(
            clickedTemplate({
              id: id,
              img: img,
              text_cta: text_cta,
              text_heading: text_heading,
              addImg: addImg,
              video: video,
            })
          );
          // dispatch(setSelectedFile({ id: id, url: img }));
        } else if (page === 1) {
          dispatch(setSelectedFile({ id: uuid(), url: img }));
        } else if (page === 2) {
          dispatch(
            clickedLastTemplate({
              id: id,
              img: img,
              text_cta: text_cta,
              text_heading: text_heading,
              addImg: addImg,
              video: video,
            })
          );
        }
      }}
    >
      <div className="template__elements" style={style}>
        <div className="template__headings">
          <h4>{text_cta}</h4>
          <h5>{text_heading}</h5>
          {addImg && (
            <img
              style={{
                height: "100px",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100px",
                objectFit: "cover",
              }}
              src={addImg}
              alt=""
            />
          )}
        </div>
        {img ? (
          <img src={img} alt="" />
        ) : (
          video && <video autoPlay loop src={video} />
        )}
        {/* {video && <video src={video} />} */}
      </div>
    </div>
  );
}

export default Template;
