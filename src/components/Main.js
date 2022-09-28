import React, { useState } from "react";
import SideBar from "./SideBar";
import "./Main.css";
import Canvas from "./Canvas";
import UpdateTemplate from "./UpdateTemplate";
import { useDispatch } from "react-redux";
import {
  NextPage,
  PreviousPage,
  selectedFile,
  selectPicture,
} from "../Store/store";
import { useSelector } from "react-redux";
import { selectPage } from "../Store/store";
import UploadPhotos from "./UploadPhotos";
import FinalScreen from "./FinalScreen";
import Waveform from "./Waveform";
import Frame from "./Frame";
import AudioWaveform from "./AudioWaveform";

function Main() {
  //   console.log("After Clicking: ", isSelect);
  const [isClicked, setIsClicked] = useState(false);
  const [isCreditIconClicked, setIsCreditIconClicked] = useState(false);
  const [isAudioIconClicked, setIsAudioIconClicked] = useState(false);
  const [isBrowseIconClicked, setIsBrowseIconClicked] = useState(false);
  const dispatch = useDispatch();

  const page = useSelector(selectPage);
  const picture = useSelector(selectPicture);
  const selectFiles = useSelector(selectedFile);

  const currentPage = () => {
    if (page === 0) {
      return (
        <>
          <Canvas />

          <UpdateTemplate />
        </>
      );
    } else if (page === 1) {
      return (
        <>
          <UploadPhotos />
        </>
      );
    } else if (page === 3) {
      return (
        <>
          <FinalScreen />
        </>
      );
    } else {
      return (
        <>
          <Canvas />
          
        </>
      );
    }
  };

  return (
    <div className="main">
      {/* SideBar */}
      <SideBar
        isClicked={isClicked}
        setIsClicked={setIsClicked}
        isAudioIconClicked={isAudioIconClicked}
        setIsAudioIconClicked={setIsAudioIconClicked}
        isBrowseIconClicked={isBrowseIconClicked}
        setIsBrowseIconClicked={setIsBrowseIconClicked}
        isCreditIconClicked={isCreditIconClicked}
        setIsCreditIconClicked={setIsCreditIconClicked}
      />
      <div className="main__progressBar">
        <div className="progress__bar">
          <div
            style={{
              width:
                page === 0
                  ? "25%"
                  : page === 1
                  ? "50%"
                  : page === 2
                  ? "75%"
                  : "100%",
            }}
          ></div>
        </div>
      </div>

      <>{currentPage()}</>
      <div className="main__footer">
        <div className="main__buttons">
          <button
            disabled={page === 0}
            onClick={() => {
              dispatch(PreviousPage());
              setIsAudioIconClicked(false);
            }}
          >
            Prev
          </button>
          <button
            onClick={() => {
              if (page === 3) {
                console.log(
                  `template: ${picture?.img}, uploadedPictures: ${selectFiles}`
                );
              } else {
                dispatch(NextPage());
                setIsClicked(false);
              }
            }}
          >
            {page === 3 ? "Publish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
