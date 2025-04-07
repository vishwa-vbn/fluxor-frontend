import { actionTypes } from "./loaderActions";

const initialState = {
  isOpen: false,
};

export default function alert(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SHOW_LOADER:
      return payload;
    case actionTypes.HIDE_LOADER:
      return payload;
    default:
      return state;
  }
}
