import {
  ADD_CHATROOM,
  GET_CHATROOM,
  GET_CHATROOMS,
  CHATROOM_LOADING,
  DELETE_CHATROOM
} from "../actions/types";

const initialState = {
  chatrooms: [],
  chatroom: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHATROOM_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_CHATROOM:
      return {
        ...state,
        chatroom: action.payload,
        errors: action.errors
      };
    case GET_CHATROOMS:
      return {
        ...state,
        chatrooms: action.payload,
        loading: false
      };
    case GET_CHATROOM:
      return {
        ...state,
        chatroom: action.payload,
        errors: action.errors,
        loading: false
      };
    case DELETE_CHATROOM:
      return {
        ...state,
        chatrooms: state.chatroom.filter(
          chatroom => chatroom._id !== action.payload
        ),
        loading: false
      };
    default:
      return state;
  }
};
