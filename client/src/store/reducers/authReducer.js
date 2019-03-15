import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_FAVS,
  SET_CURRENT_USER_UNFAVS
} from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SET_CURRENT_USER_FAVS:
      console.log(action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          favorites: action.payload
        }
      };
    case SET_CURRENT_USER_UNFAVS:
      console.log(action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          favorites: state.user.favorites.filter(
            fav => fav.name !== action.payload.name
          )
        }
      };
    default:
      return state;
  }
};
