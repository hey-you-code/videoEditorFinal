import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "images",
  initialState: {
    image_list: [],
  },
  reducers: {
    fetchImageStarted: (state, action) => {},
    fetchImageSuccess: (state, action) => {
      state.image_list = action.payload.server_response.data.images;
    },
    fetchImageFailed: (state, action) => {},
  },
});

export const { fetchImageStarted, fetchImageSuccess, fetchImageFailed } =
  slice.actions;

export default slice.reducer;

export const fetchImages = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: "/editor/fetch_images/",
      method: "post",
      onStart: fetchImageStarted.type,
      onSuccess: fetchImageSuccess.type,
      onError: fetchImageFailed.type,
    })
  );
};
