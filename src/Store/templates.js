import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "templates",
  initialState: {
    templates_list: [],
    start_from: -1,
    num_to_fetch: -1,
    template_label: "",
  },
  reducers: {
    fetchTemplateStarted: (state, action) => {},
    fetchTemplateSuccess: (state, action) => {
      state.start_from = action.payload.data.start_from;
      state.num_to_fetch = action.payload.data.num_to_fetch;
      state.template_label = action.payload.data.template_label;
      state.templates_list = action.payload.server_response.data.templates;
    },
    fetchTemplateFailed: (state, action) => {},
  },
});

export const {
  fetchTemplateStarted,
  fetchTemplateSuccess,
  fetchTemplateFailed,
} = slice.actions;

export default slice.reducer;

export const fetchTemplates =
  (start_from, num_to_fetch, template_label) => (dispatch, getState) => {
    return dispatch(
      apiCallBegan({
        url: "/editor/fetch_templates/",
        data_to_server: {
          start_from: start_from,
          num_to_fetch: num_to_fetch,
          template_label: template_label,
        },
        data: {
          start_from: start_from,
          num_to_fetch: num_to_fetch,
          template_label: template_label,
        },
        method: "post",
        onStart: fetchTemplateStarted.type,
        onSuccess: fetchTemplateSuccess.type,
        onError: fetchTemplateFailed.type,
      })
    );
  };
