export function showPopupError(content) {
  return {
    type: "SHOW_POPUP_ERROR",
    content,
  };
}

export function hidePopupError() {
  return {
    type: "HIDE_POPUP_ERROR",
  };
}

export function showPopupSelection(content, cb) {
  return {
    type: "SHOW_POPUP_SELECTION",
    content,
    cb,
  };
}

export function hidePopupSelection(content, cb) {
  return {
    type: "HIDE_POPUP_SELECTION",
    content,
    cb,
  };
}

export function setBiometric(status) {
  return {
    type: "SET_BIOMETRIC",
    status,
  };
}

export function set_tips(payload) {
  return {
    type: "SET_TIPS",
    payload,
  };
}

export function toggleBottomTabbar(payload) {
  return {
    type: "TOGGLE_BOTTOM_TABBAR",
    payload,
  };
}

export function setPayComplete(isComplete) {
  return {
    type: "SET_IS_PAY_COMPLETE",
    isComplete
  }
}