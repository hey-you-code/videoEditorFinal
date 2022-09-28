import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectPicture,
  selectedFile,
  selectAudio,
  setBreakPoints,
  breakPoint,
  selectLastTemplate,
} from "../Store/store";
import Canvas from "./Canvas";
import Template from "./Template";
import "./FinalScreen.css";
import Waveform from "./Waveform";
import SplitPane, { Pane } from "react-split-pane";
import AudioWaveform from "./AudioWaveform";
import { useState } from "react";
import Chip from "@mui/material/Chip";
import { useDispatch } from "react-redux";

function FinalScreen() {
  const picture = useSelector(selectPicture);
  const selectFiles = useSelector(selectedFile);
  const selectedAudio = useSelector(selectAudio);
  const breakPoints = useSelector(breakPoint);
  const lastTemplate = useSelector(selectLastTemplate);
  const player = useRef(null);
  const dispatch = useDispatch();
  const [audioDuration, setAudioDuration] = useState(0);
  console.log("duartionssss", audioDuration);
  // const [breakPoints, setBreakPoints] = useState([]);
  // const [frames, setFrames] = useState([]);
  // console.log(frames);

  // useEffect(() => {
  //   // if (picture) {
  //   //   setFrames([picture.img]);
  //   // }
  //   if (selectFiles) {
  //     for (var i = 0; i < selectFiles.length; i++) {
  //       setFrames([...frames, selectFiles[i].url]);
  //     }
  //   }
  // }, [selectFiles]);

  const remainingArray = (start_index, end_endex) => {
    const result = Array.from(breakPoints);
    result.splice(start_index, end_endex);
    return result;
  };

  return (
    <div className="finalScreen">
      <div className="upper__section">
        {/* <SplitPane className="upper__section" split="vertical"> */}

        <div className="first__template">
          {picture && (
            <>
              <Template
                id={picture?.id}
                img={picture?.img}
                text_heading={picture?.text_heading}
                text_cta={picture?.text_cta}
                video={picture?.video}
                style={{ height: "120px", width: "100px" }}
              />
              <div>
                {breakPoints.length != 0 && (
                  <div style={{ color: "white" }}>
                    <Chip
                      label={`0 - ${breakPoints[0]}`}
                      // variant="outlined"
                      color="primary"
                      size="small"
                      onDelete={() => dispatch(setBreakPoints([]))}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {selectFiles?.map((item, index) => (
          <div className="image__template">
            <Template
              key={index}
              id={item.id}
              img={item.url}
              style={{ height: "120px", width: "100px" }}
            />
            <div>
              {breakPoints[index + 1] != null && (
                <div style={{ color: "white" }}>
                  <Chip
                    label={`${breakPoints[index]} - ${breakPoints[index + 1]}`}
                    // variant="outlined"
                    color="primary"
                    size="small"
                    onDelete={() => {
                      dispatch(
                        setBreakPoints(
                          remainingArray(
                            index + 1,
                            breakPoints.length - index - 1
                          )
                        )
                      );
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        {lastTemplate && (
          <Template
            id={lastTemplate?.id}
            img={lastTemplate?.img}
            style={{ height: "120px", width: "100px" }}
          />
        )}
        {/* </SplitPane> */}
      </div>
      {selectedAudio && (
        <div className="lower__section">
          {/* <Waveform url={selectedAudio.url} /> */}
          <AudioWaveform
            fileURL={selectedAudio.url}
            setAudioDuration={setAudioDuration}
          />
        </div>
      )}

      {/* <audio
        ref={player}
        src="https://www.codepunker.com/resources/audio-sync-with-text/10bears.mp3"
        controls
      ></audio> */}

      {/* {selectFiles && <button onClick={handleVideo}>PLAY</button>} */}
    </div>
  );
}

export default FinalScreen;
