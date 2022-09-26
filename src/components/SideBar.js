import React, { useState, useEffect } from "react";
import "./SideBar.css";
import GridViewIcon from "@mui/icons-material/GridView";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import Template from "./Template";
import templates from "./Templates";
import {
  loadedTemplate,
  loadMore,
  selectPage,
  setSelectedFile,
} from "../Store/store";
import { useDispatch, useSelector } from "react-redux";
import { MoveToPage } from "../Store/store";
import AudioPlayer from "./AudioPlayer";
import { connect } from "react-redux";
import { fetchTemplates } from "../Store/templates";
import { fetchAudios } from "../Store/audios";
import { fetchImages } from "../Store/images";
import AudioWaveform from "./AudioWaveform";
import AddIcon from "@mui/icons-material/Add";
import Chip from "@mui/material/Chip";

function SideBar({
  isClicked,
  setIsClicked,
  isAudioIconClicked,
  setIsAudioIconClicked,
  isBrowseIconClicked,
  setIsBrowseIconClicked,
  templates_list,
  fetchTemplates,
  audio_list,
  fetchAudios,
  image_list,
  fetchImages,
}) {
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const loadTemplates = useSelector(loadedTemplate);
  const [label, setLabel] = useState("");

  console.log("stylesss", label);

  const fashionStyles = ["Street Wear", "Traditional", "Y2K"];

  console.log("style", label);

  useEffect(() => {
    console.log("Fetching available templates");
    fetchTemplates(0, 5, "hello");
    fetchAudios();
    fetchImages();
  }, []);

  useEffect(() => {
    console.log("Templates list changed", templates_list);
    console.log("Audios:", audio_list);
    console.log("Images:", image_list);
  }, [templates_list, audio_list, image_list]);

  const currentSideBar = () => {
    if (page == 0 || page === 2) {
      return (
        <>
          {isClicked && (
            <div className="sideBar__right">
              {templates_list.slice(0, loadTemplates).map((template, index) => (
                <Template
                  key={index}
                  img={template.params?.background_media?.src}
                  id={template.id}
                  text_cta={template.params?.text_cta?.text}
                  text_heading={template.params?.text_heading?.text}
                  style={{ height: "200px", width: "150px" }}
                />
              ))}
              <div
                style={{
                  position: "fixed",
                  bottom: "20px",

                  padding: " 12px 20px",
                  margin: "auto",
                  width: "18vw",
                  // background: "white",
                  display: "flex",
                  justifyContent: "center",
                  zIndex: "10",
                }}
              >
                <button
                  style={{
                    width: "100%",
                    marginRight: "3px",
                    borderRadius: "20px",
                  }}
                  onClick={() => dispatch(loadMore())}
                >
                  Load More
                </button>
              </div>
            </div>
          )}
        </>
      );
    } else if (page == 3) {
      return (
        <>
          {isAudioIconClicked && (
            <div className="sideBarAudio__right">
              {audio_list?.map((audio, index) => (
                <AudioPlayer
                  key={index}
                  src={audio.src}
                  name={audio.name}
                  author={audio.metadata?.author}
                />
              ))}
            </div>
          )}
        </>
      );
    } else if (page === 1) {
      return (
        <>
          {isBrowseIconClicked && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "20vw",
              }}
            >
              {/* <input
                style={{
                  border: "none",
                  padding: "10px",
                  width: "80%",
                  outline: "none",
                  borderRadius: "20px",
                }}
                type="text"
                value={label}
              /> */}
              
              <div
                className="chip"
                style={{
                  display: "flex",
                  color: "white",
                  overflow: "scroll",
                  padding: "20px",
                  
                }}
              >
                {fashionStyles?.map((item, index) => (
                  <div style={{ marginRight: "5px"}} key={index}>
                  <Chip
                    label={item}
                    // key={index}
                    // variant="filled"
                    color="primary"
                    size="medium"
                    onClick={() => setLabel(item)}
                  />
                  </div>
                ))}


              </div>
              {label.length != 0 && (
                <Chip
                  label={label}
                  // variant="outlined"
                  color="secondary"
                  size="medium"
                  onDelete={() => setLabel("")}
                />
              )}

              <div className="sideBarImage__right">
                {image_list
                  ?.filter((image) => {
                    // for (var i = 0; i < label.length - 1; i++) {
                    //   if (image?.style.includes(label[i])) return image;
                    // }
                    if (image?.style === label) return image;
                  })
                  .map((image, index) => (
                    <Template
                      key={index}
                      img={image?.src}
                      id={image?.id}
                      style={{ height: "200px", width: "150px" }}
                    />
                  ))}
              </div>
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div className="sideBar">
      <div className="sideBar__left">
        <div
          onClick={() => {
            isClicked ? setIsClicked(false) : setIsClicked(true);
            if (page != 2) {
              dispatch(MoveToPage(0));
            }

            setIsAudioIconClicked(false);
            setIsBrowseIconClicked(false);
          }}
          className={`sideBar__icons ${isClicked && "sideBar__clickedIcon"}`}
        >
          <GridViewIcon fontSize="large" />
          <h2>Templates</h2>
        </div>
        <div
          onClick={() => {
            isBrowseIconClicked
              ? setIsBrowseIconClicked(false)
              : setIsBrowseIconClicked(true);
            dispatch(MoveToPage(1));
            setIsAudioIconClicked(false);
            setIsClicked(false);
          }}
          className={`sideBar__icons ${
            isBrowseIconClicked && "sideBar__clickedIcon"
          }`}
        >
          <AddIcon fontSize="large" />
          <h2>Browse</h2>
        </div>
        <div
          onClick={() => {
            isAudioIconClicked
              ? setIsAudioIconClicked(false)
              : setIsAudioIconClicked(true);
            dispatch(MoveToPage(3));
            setIsClicked(false);
            setIsBrowseIconClicked(false);
          }}
          className={`sideBar__icons ${
            isAudioIconClicked && "sideBar__clickedIcon"
          }`}
        >
          <AudiotrackIcon fontSize="large" />
          <h2>Audio</h2>
        </div>
      </div>
      <>{currentSideBar()}</>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  templates_list: state.templates.templates_list,
  audio_list: state.audios.audio_list,
  image_list: state.images.image_list,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTemplates: (start_from, num_to_fetch, template_label) =>
    dispatch(fetchTemplates(start_from, num_to_fetch, template_label)),
  fetchAudios: () => dispatch(fetchAudios()),
  fetchImages: () => dispatch(fetchImages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
