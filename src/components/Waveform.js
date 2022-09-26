import Wavesurfer from "wavesurfer.js";
// import { Button, Flex } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import * as WaveformRegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";
// import randomColor from "randomcolor";

const Waveform = ({ url }) => {
  const waveform = useRef(null);

  useEffect(() => {
    if (waveform.current) {
      waveform.current.on("region-updated", (region) => {
        const regions = region.wavesurfer.regions.list;
        const keys = Object.keys(regions);

        if (keys.length > 1) {
          regions[keys[0]].remove();
          // regions[keys[0].element];
          // console.log("keys",regions[keys[0]] );
        }
      });
    }
  }, [waveform.current]);

  useEffect(() => {
    if (!waveform.current) {
      waveform.current = Wavesurfer.create({
        container: "#waveform",
        waveColor: "#567FFF",
        barGap: 2,
        barWidth: 3,
        barRadius: 3,
        cursorWidth: 3,
        cursorColor: "#567FFF",
        // Add the regions plugin.
        // More info here https://wavesurfer-js.org/plugins/regions.html
        plugins: [WaveformRegionsPlugin.create({ maxLength: 90 })],
      });
      waveform.current.load(url);

      // Enable dragging on the audio waveform
      waveform.current.enableDragSelection({
        maxLength: 90,
      });
      // Perform action when new region is created
      waveform.current.on("region-created", (e) => {
        e.color = "hsla(200, 100%, 86%, 0.4)";
        console.log(waveform.current.regions.list);
      });

      // waveform.current.on("audioprocess", () => {
      //   if (waveform.current.isPlaying()) {
      //       setCurrentTime(waveform.current.getCurrentTime());
      //   console.log(currentTime);
      //   }
        
      // });
    }
  }, [waveform.current]);



  // delete a particular region
  const deleteClip = (e) => {
    if (waveform.current) {
      waveform.current.regions.list.remove();
    }
  };

  // play a particular region
  const playClip = (clipid) => {
    waveform.current.regions.list[clipid].play();
  };

  const playAudio = () => {
    if (waveform.current.isPlaying()) {
      waveform.current.pause();
    } else {
      waveform.current.play();
    }
  };

  return (
    <div className="waveform">
      <div id="waveform" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <button onClick={playAudio}>Play / Pause</button>
        <button onClick={deleteClip}>Trim</button>
        <button onClick={playClip}>Play</button>
      </div>
    </div>
  );
};

export default Waveform;
