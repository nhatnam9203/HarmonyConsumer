export function set_token(token) {
  return {
    type: "SET_TOKEN",
    payload: token,
  };
}

export function set_location_tab_store(payload) {
  return {
    type: "SET_LOCATION_TAB_STORE",
    payload,
  };
}

export function set_current_location(payload) {
  return {
    type: "SET_CURRENT_LOCATION",
    payload,
  };
}

export function saveToCall(payload) {
  return {
    type: "SAVE_TO_CALL",
    payload,
  };
}

export function onChangeInbox(payload) {
  return {
    type: "ON_CHANGE_INBOX",
    payload,
  };
}
