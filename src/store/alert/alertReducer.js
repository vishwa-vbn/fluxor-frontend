import { actionTypes } from "./alertActions";

const initialState = {
  isOpen: false,
  title: "",
  type: "",
  msg: "",
  showError: false,
};

export default function alert(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SHOW_ALERT:
      return {
        ...state,
        isOpen: payload.isOpen,
        type: payload.type,
        title: payload.title,
        msg: payload.msg,
      };
    case actionTypes.HIDE_ALERT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
