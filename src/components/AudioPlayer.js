import React, { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useDispatch } from "react-redux";
import { selectedAudio } from "../Store/store";

function AudioPlayer({ src, name, author }) {
  const audioElem = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch(selectedAudio);

  useEffect(() => {
    if (isPlaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isPlaying]);

  return (
    <div
      className="audioPlayer"
      onClick={() => {
        dispatch(
          selectedAudio({
            url: src,
          })
        );
        console.log("url:", src);
      }}
    >
      <audio src={src} ref={audioElem} />
      <div className="audioPlayer__title">
        <h4>{name}</h4>
        <h6>{author}</h6>
      </div>

      <div className="audioPlayer__controls">
        {!isPlaying ? (
          <PlayArrowIcon onClick={() => setIsPlaying(!isPlaying)} />
        ) : (
          <PauseIcon onClick={() => setIsPlaying(!isPlaying)} />
        )}
      </div>

      {/* progressbar */}
      {/* controlbuttons */}
    </div>
  );
}

export default AudioPlayer;
