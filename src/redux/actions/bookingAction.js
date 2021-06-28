export function addService(payload) {
  return {
    type: "ADD_SERVICE",
    payload,
  };
}

export function addProduct(payload) {
  return {
    type: "ADD_PRODUCT",
    payload,
  };
}

export function addExtra(payload) {
  return {
    type: "ADD_EXTRA",
    payload,
  };
}

export function selectStaff(payload) {
  return {
    type: "SELECT_STAFF",
    payload,
  };
}

export function selectStaffService(payload) {
  return {
    type: "SELECT_STAFF_SERVIE",
    payload,
  };
}

export function selectStatus(payload) {
  return {
    type: "SELECT_STATUS",
    payload,
  };
}

export function selectDate(payload) {
  return {
    type: "SELECT_DATE",
    payload,
  };
}

export function selectTime(payload) {
  return {
    type: "SELECT_TIME",
    payload,
  };
}

export function updateService(payload) {
  return {
    type: "UPDATE_SERVICE",
    payload,
  };
}

export function selectDay(payload) {
  return {
    type: "SELECT_DAY",
    payload,
  };
}

export function addNote(payload) {
  return {
    type: "ADD_NOTE",
    payload,
  };
}

export function setReview(isReview) {
  return {
    type: "SET_REVIEW",
    isReview,
  };
}

export function setAddmore(isAddMore) {
  return {
    type: "SET_ADDMORE",
    isAddMore,
  };
}

export function setChangeBasket(isChangeBasket) {
  return {
    type: "SET_CHANGE_BASKET",
    isChangeBasket,
  };
}

export function removeItemInCart(payload) {
  return {
    type: "REMOVE_ITEM_IN_CART",
    payload,
  };
}

export function updateQuantityInCart(payload) {
  return {
    type: "UPDATE_QUANTITY_IN_CART",
    payload,
  };
}

export function resetBooking() {
  return {
    type: "RESET_BOOKING",
  };
}

export function deleteService(service) {
  return {
    type: "DELETE_SERVICE",
    service,
  };
}

export function deleteServiceSuccess(service) {
  return {
    type: "DELETE_SERVICE_SUCCESS",
    service,
  };
}

export function deleteProduct(product) {
  return {
    type: "DELETE_PRODUCT",
    product,
  };
}

export function deleteProductSuccess(product) {
  return {
    type: "DELETE_PRODUCT_SUCCESS",
    product,
  };
}

export function deleteExtra(extra) {
  return {
    type: "DELETE_EXTRA",
    extra,
  };
}

export function setReschedule(isReschedule) {
  return {
    type: "SET_RE_SCHEDULE",
    isReschedule,
  };
}

export function setEditAppointment(idEditAppointment) {
  return {
    type: "SET_EDIT_APPOINTMENT",
    idEditAppointment,
  };
}

export function checkEdit(isCheckEdit) {
  return {
    type: "CHECK_EDIT",
    isCheckEdit,
  };
}

export function addNoteValue(payload) {
  return {
    type: "ADD_NOTE_VALUE",
    payload,
  };
}
