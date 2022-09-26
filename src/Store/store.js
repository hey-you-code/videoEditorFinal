import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import api from "./middleware/api";

import { combineReducers } from "redux";
import templateReducer from "./templates";
import audioReducer from "./audios";
import imageReducer from "./images";

export const pictureSlice = createSlice({
  name: "picture",
  initialState: {
    picture: null,
    selectedFile: [],
    loadedTemplate: 3,
    lastTemplate: null,
  },

  reducers: {
    clickedTemplate: (state, action) => {
      state.picture = action.payload;
    },
    setSelectedFile: (state, action) => {
      state.selectedFile = [...state.selectedFile, action.payload];
    },
    reorderFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    loadMore: (state) => {
      state.loadedTemplate = state.loadedTemplate + 3;
    },
    clickedLastTemplate: (state, action) => {
      state.lastTemplate = action.payload;
    },
  },
});

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    page: 0,
  },

  reducers: {
    NextPage: (state) => {
      state.page += 1;
    },
    PreviousPage: (state) => {
      state.page -= 1;
    },
    MoveToPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const audioSlice = createSlice({
  name: "audio",
  initialState: {
    audio: null,
    breakPoints: [],
  },
  reducers: {
    selectedAudio: (state, action) => {
      state.audio = action.payload;
    },
    setBreakPoints: (state, action) => {
      state.breakPoints = action.payload;
    },
  },
});

export const {
  clickedTemplate,
  setSelectedFile,
  reorderFile,
  loadMore,
  clickedLastTemplate,
} = pictureSlice.actions;

export const { NextPage, PreviousPage, MoveToPage } = pageSlice.actions;

export const { selectedAudio, setBreakPoints } = audioSlice.actions;

export const selectPicture = (state) => state.picture.picture;

export const selectedFile = (state) => state.picture.selectedFile;

export const loadedTemplate = (state) => state.picture.loadedTemplate;

export const selectPage = (state) => state.page.page;

export const selectAudio = (state) => state.audio.audio;

export const breakPoint = (state) => state.audio.breakPoints;

export const selectLastTemplate = (state) => state.picture.lastTemplate;

const reducer = combineReducers({
  picture: pictureSlice.reducer,
  page: pageSlice.reducer,
  audio: audioSlice.reducer,
  templates: templateReducer,
  audios: audioReducer,
  images: imageReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    var default_middleware = getDefaultMiddleware();
    default_middleware.push(api);
    return default_middleware;
  },
});
