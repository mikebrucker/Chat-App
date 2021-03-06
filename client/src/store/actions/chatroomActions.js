import axios from "axios";

import {
  ADD_CHATROOM,
  GET_CHATROOM,
  GET_CHATROOMS,
  CHATROOM_LOADING,
  DELETE_CHATROOM,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

// Get All Chatrooms
export const getChatrooms = () => dispatch => {
  dispatch(setChatroomLoading());
  axios
    .get("/api/chatroom")
    .then(res =>
      dispatch({
        type: GET_CHATROOMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CHATROOMS,
        payload: null
      })
    );
};

// Get Chatroom by name
export const getChatroomByName = chatroomname => dispatch => {
  dispatch(setChatroomLoading());
  axios
    .get(`/api/chatroom/${chatroomname}`)
    .then(res =>
      dispatch({
        type: GET_CHATROOM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CHATROOM,
        payload: null,
        errors: err.response.data
      })
    );
};

// Get Chatroom by ID
export const getChatroomById = id => dispatch => {
  dispatch(setChatroomLoading());
  axios
    .get(`/api/chatroom/id/${id}`)
    .then(res =>
      dispatch({
        type: GET_CHATROOM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CHATROOM,
        payload: null
      })
    );
};

// Add Chatroom
export const addChatroom = chatroomData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/chatroom", chatroomData)
    .then(res =>
      dispatch({
        type: ADD_CHATROOM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Message
export const addMessage = (messageData, chatroomName) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/chatroom/message/${chatroomName}`, messageData)
    .then(res =>
      dispatch({
        type: GET_CHATROOM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Chatroom
export const deleteChatroom = id => dispatch => {
  axios
    .delete(`/api/chatroom/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_CHATROOM,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Chatroom Loading
export const setChatroomLoading = () => {
  return {
    type: CHATROOM_LOADING
  };
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
