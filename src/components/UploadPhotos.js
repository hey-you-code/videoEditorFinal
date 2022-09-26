import React, { useEffect, useRef, useState } from "react";
import "./UploadPhotos.css";
import UploadIcon from "@mui/icons-material/Upload";
import { useDispatch, useSelector } from "react-redux";
// import { useSelect } from "@mui/base";

import { selectedFile, setSelectedFile, reorderFile } from "../Store/store";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import {} from "uuid"
import uuid from "react-uuid";

// import { selectedFile, setSelectedFile } from "../Store/store";

function UploadPhotos() {
  const filePickerRef = useRef();
  //   const [selectedFile, setSelectedFile] = useState([]);
  const dispatch = useDispatch();
  const selectFiles = useSelector(selectedFile);
  // const [list, setList] = useState([]);

  // useEffect(() => {
  //   setList(selectFiles);
    
  // }, [dispatch, selectFiles]);

  // // console.log("initial List", list);
  // console.log("list", list);
  console.log("reorderd list", selectFiles);

  const addImage = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const reader = new FileReader();
      if (e.target.files[i]) {
        reader.readAsDataURL(e.target.files[i]);
      }

      reader.onload = (readerEvent) => {
        dispatch(
          setSelectedFile({
            id: uuid(),
            url: readerEvent.target.result,
          })
        );
      };
    }
  };

  const reorder = (selectFiles, startIndex, endIndex) => {
    const result = Array.from(selectFiles);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onEnd = (result) => {
    // setList(reorder(list, result.source.index, result.destination.index));
    
    // dispatch(setSelectedFile(list));
    // console.log("selectFiles", selectFiles)
    dispatch(
      reorderFile(reorder(selectFiles, result.source.index, result.destination.index))
    );

   
  };

  // const updateChange = () => {
  //   dispatch(reorderFile(list));
  // };

  return (
    <div className="uploadPhotos">
      <div
        className="uploadPhoto__icon"
        onClick={() => filePickerRef.current.click()}
      >
        <h3>Upload Photo</h3>
        <UploadIcon fontSize="large" />
      </div>
      <div>
        <input
          type="file"
          hidden
          multiple
          ref={filePickerRef}
          onChange={addImage}
        />
      </div>
      {/* <button onClick={updateChange}>Update Changes</button> */}

      <DragDropContext onDragEnd={onEnd}>
        <Droppable droppableId="1234567" direction="horizontal">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} className="selected__file">
              {selectFiles?.map((item, index) => (
                <Draggable
                  draggableId={`${item.id}`}
                  index={index}
                  key={`${item.id}`}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <img className="selected__image" src={item.url} alt="" />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default UploadPhotos;
