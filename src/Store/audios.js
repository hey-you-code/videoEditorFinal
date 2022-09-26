import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "audios",
  initialState: {
    audio_list: [],
  },
  reducers: {
    fetchAudioStarted: (state, action) => {},
    fetchAudioSuccess: (state, action) => {
      state.audio_list = action.payload.server_response.data.audios;
    },
    fetchAudioFailed: (state, action) => {},
  },
});

export const { fetchAudioStarted, fetchAudioSuccess, fetchAudioFailed } =
  slice.actions;

export default slice.reducer;

export const fetchAudios = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: "/editor/fetch_audios/",
      method: "post",
      onStart: fetchAudioStarted.type,
      onSuccess: fetchAudioSuccess.type,
      onError: fetchAudioFailed.type,
    })
  );
};
