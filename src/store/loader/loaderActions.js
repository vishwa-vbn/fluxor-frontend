export const actionTypes = {
  SHOW_LOADER: "SHOW_LOADER",
  HIDE_LOADER: "HIDE_LOADER",
};

export function showLoader() {

  return (dispatch) => {
    dispatch({
      type: actionTypes.SHOW_LOADER,
      payload: {
        isOpen: true,
      },
    });
  };
}
export function hideLoader() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.HIDE_LOADER,
      payload: {
        isOpen: false,
      },
    });
  };
}
