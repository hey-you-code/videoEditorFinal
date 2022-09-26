import * as actions from "../api";
import { api_mock } from './mock_api';

const API_HOST = "http://localhost:8000"

var ISMOCK = true;

let store;
export const injectStore = _store => {
    store = _store
}
// Create an axiosApiInstance.
const axios = require('axios');
export const axiosApiInstance = axios.create();

async function make_axios_call(method, url, data, headers) {
    if (ISMOCK) {
        const api_response = await api_mock(url, method, data);
        return [api_response, true];
    }
    else {
        try {
            const response = await axiosApiInstance({
                method: method,
                url: `${API_HOST}${url}`,
                data: data,
                headers: headers,
            });
            return [response.data, true];
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return [error.response.data, false];
            } else {
                return ['Internal API error', false];
            }
        }
    }
}


const api = ({ dispatch }) => next => async action => {
    // Bypass, if the api middleware should not act on this action type. 
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data_to_server, data, onStart, onSuccess, onError, successApiCallPayload } = action.payload;

    if (onStart) dispatch({ type: onStart, payload: { data: data } });

    next(action);

    var headers = {
        'Accept': "application/json",
        'Content-Type': 'application/json',
    };

    const [response_data, response_status] = await make_axios_call(method, url, data_to_server, headers);

    if (response_status) {
        dispatch(actions.apiCallSuccess(response_data));
    }

    if (response_status && onSuccess) {
        dispatch({ type: onSuccess, payload: { data: data, server_response: response_data } });
        if (successApiCallPayload != undefined) {
            dispatch(
                actions.apiCallBegan(successApiCallPayload)
            );
        }
    }

    if (!response_status && onError) {
        dispatch({ type: onError, payload: { server_response: response_data } });
    }
}

export default api;