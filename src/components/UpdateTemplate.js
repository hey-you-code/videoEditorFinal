import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  clickedTemplate,
  selectLastTemplate,
  selectPage,
  selectPicture,
  clickedLastTemplate,
} from "../Store/store";
import "./UpdateTemplate.css";

import "./UpdateTemplate.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useSelector } from "react-redux";

function UpdateTemplate() {
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [filetype, setFiletype] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showPicture, setShowPicture] = useState(false);
  const dispatch = useDispatch();
  const filePickerRef = useRef();
  const picture = useSelector(selectPicture);
  const page = useSelector(selectPage);
  const lastTemplate = useSelector(selectLastTemplate);
  const [heading1, setHeading1] = useState("");
  const [heading2, setHeading2] = useState("");

  const addImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setFiletype(e.target.files[0].type);
    }
    if (e.target.files[0].type === "video/mp4") {
      reader.onload = (readerEvent) => {
        setVideoUrl(readerEvent.target.result);
        setUrl("");
      };
    } else {
      reader.onload = (readerEvent) => {
        setUrl(readerEvent.target.result);
        setVideoUrl("");
      };
    }
  };

  // console.log("file type", url.type);
  return (
    <div className="updateTemplate">
      {page === 0 ? (
        <h1>Update Template</h1>
      ) : (
        page === 2 && <h1>Update Credits</h1>
      )}

      <div className="updateTemplate__background">
        <div className="url__button" onClick={() => setShowInput(true)}>
          <h6>Enter Url</h6>
        </div>
        <AddAPhotoIcon
          className="add__background"
          fontSize="large"
          onClick={() => {
            setShowInput(false);
            filePickerRef.current.click();
            setShowPicture(true);
          }}
        />
      </div>

      {showInput && (
        <>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter url..."
          />
        </>
      )}

      {showPicture && url ? (
        <>
          <img
            src={url}
            width="200px"
            style={{
              borderRadius: "20px",
            }}
          />
        </>
      ) : (
        showPicture &&
        videoUrl && (
          <>
            <video
              src={videoUrl}
              autoPlay
              width="200px"
              style={{
                borderRadius: "20px",
              }}
            />
          </>
        )
      )}
      <input type="file" ref={filePickerRef} hidden onChange={addImage} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={() => {
            if (page === 0) {
              if (filetype === "video/mp4") {
                dispatch(
                  clickedTemplate({
                    ...picture,
                    video: videoUrl,
                    img: null,
                  })
                );
                setShowPicture(false);
                setUrl("");
                setVideoUrl("");
              } else {
                dispatch(
                  clickedTemplate({
                    ...picture,
                    img: url,
                    video: null,
                  })
                );
                setShowPicture(false);
                setUrl("");
                setVideoUrl("");
              }
            } 
            // else if (page === 2) {
            //   if (filetype === "video/mp4") {
            //     dispatch(
            //       clickedLastTemplate({
            //         ...picture,
            //         video: videoUrl,
            //         img: null,
            //       })
            //     );
            //     setShowPicture(false);
            //     setUrl("");
            //     setVideoUrl("");
            //   } else {
            //     dispatch(
            //       clickedLastTemplate({
            //         ...picture,
            //         img: url,
            //         video: null,
            //       })
            //     );
            //     setShowPicture(false);
            //     setUrl("");
            //     setVideoUrl("");
            //   }
            // }
          }
        }
        >
          Update background
        </button>
        <button
          onClick={() => {
            if (page === 0) {
              dispatch(
                clickedTemplate({
                  ...picture,
                  addImg: url,
                })
              );
              setShowPicture(false);
              setUrl("");
            } else if (page === 2) {
              dispatch(
                clickedLastTemplate({
                  ...picture,
                  addImg: url,
                })
              );
              setShowPicture(false);
              setUrl("");
            }
          }}
        >
          ADD IMAGE
        </button>
      </div>
      <input
        type="text"
        placeholder="update subHeading..."
        value={heading2}
        onChange={(e) => setHeading2(e.target.value)}
      />
      <button
        onClick={() => {
          if(page === 0 ) {
            dispatch(
              clickedTemplate({
                ...picture,
                text_heading: heading2,
              })
            );
            setHeading2("");
          } else if (page === 2) {
            dispatch(
              clickedLastTemplate({
                ...picture,
                text_heading: heading2,
              })
            );
            setHeading2("");
          }
         
        }}
      >
        Update SubHeading
      </button>
      <input
        type="text"
        placeholder="update Heading..."
        value={heading1}
        onChange={(e) => setHeading1(e.target.value)}
      />
      <button
        onClick={() => {
          if(page === 0) {
            dispatch(
              clickedTemplate({
                ...picture,
                text_cta: heading1,
              })
            );
            setHeading1("");
          } else if (page === 2) {
            dispatch(
              clickedLastTemplate({
                ...picture,
                text_cta: heading1,
              })
            );
            setHeading1("");
          }
        }}
      >
        Update Heading
      </button>
    </div>
  );
}

export default UpdateTemplate;
