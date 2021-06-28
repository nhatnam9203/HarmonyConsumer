export function getCategoryByStore(merchantId, token, cb) {
  return {
    type: "GET_CATEGORY_BY_STORE",
    method: "GET",
    token,
    route: `category/getbymerchant/${merchantId}`,
    cb,
  };
}

export function getServiceByStore(merchantId, token, cb) {
  return {
    type: "GET_SERVICE_BY_STORE",
    method: "GET",
    token,
    route: `service/getbymerchant/${merchantId}`,
    cb,
  };
}

export function getProductByStore(merchantId, token, cb) {
  return {
    type: "GET_PRODUCT_BY_STORE",
    method: "GET",
    token,
    route: `product/getbymerchant/${merchantId}`,
    cb,
  };
}

export function getExtraByStore(merchantId, token, cb) {
  return {
    type: "GET_EXTRA_BY_STORE",
    method: "GET",
    token,
    route: `extra/getbymerchant/${merchantId}`,
    cb,
  };
}

export function addAppointment(body, token, cb) {
  return {
    type: "ADD_APPOINTMENT",
    method: "POST",
    route: `appointment`,
    token,
    body,
    cb,
  };
}

export function updateAppointment(body, token, appointmentId, cb, isUpdateBasket = false) {
  return {
    type: "UPDATE_APPOINTMENT",
    method: "PUT",
    route: `appointment/${appointmentId}`,
    appointmentId,
    token,
    body,
    cb,
    isUpdateBasket,
  };
}

export function updateStatusAppointment(body, token, appointmentId, cb) {
  return {
    type: "UPDATE_STATUS_APPOINTMENT",
    method: "PUT",
    route: `appointment/updatestatus/${appointmentId}`,
    appointmentId,
    token,
    body,
    cb,
  };
}

export function getAppointmentByCustomer(token, page, cb) {
  return {
    type: "GET_APPOINTMENT_BY_CUSTOMER",
    method: "GET",
    // route: `appointment/?page=${page}`,
    route: `appointment`,
    token,
    cb,
  };
}

export function getDetailAppointment(token, appointmentId, cb, isEditBooking) {
  return {
    type: "GET_DETAIL_APPOINTMENT",
    method: "GET",
    route: `appointment/${appointmentId}`,
    appointmentId,
    token,
    cb,
    isEditBooking,
  };
}

export const getGroupAppointmentById = (token, appointmentId) => {
  return {
    type: "GET_GROUP_APPOINTMENT_BY_ID",
    method: "GET",
    route: `appointment/getGroupById/${appointmentId}`,
    token,
  };
};

export function setAppointmentDetail(appointment) {
  return {
    type: "SET_APPOINTMENT_DETAIL",
    appointment,
  };
}

export function removeItem(appointmentId, body, token, cb) {
  return {
    type: "REMOVE_ITEM",
    method: "PUT",
    route: `appointment/removeitem/${appointmentId}`,
    appointmentId,
    body,
    token,
    cb,
  };
}

export function addItem(appointmentId, body, token, cb) {
  return {
    type: "ADD_ITEM",
    method: "PUT",
    route: `appointment/additem/${appointmentId}`,
    appointmentId,
    body,
    token,
    cb,
  };
}

export function countByType(_type, token) {
  return {
    type: "COUNT_BY_TYPE",
    method: "GET",
    route: `appointment/countByType/${_type}`,
    token,
    _type,
  };
}

export function getCountAllType(token) {
  return {
    type: "GET_COUNT_ALL_TYPE",
    token,
  };
}

export function getAppointmentUpcoming(token) {
  return {
    type: "GET_APPOINTMENT_UPCOMING",
    method: "GET",
    route: `appointment/getByType/upcoming?page=0`,
    token,
  };
}

export function getAppointmentPast(token, page, cb, firstLoading) {
  return {
    type: "GET_APPOINTMENT_PAST",
    method: "GET",
    page,
    route: `appointment/getByType/past?page=${page}`,
    token,
    cb,
    firstLoading,
  };
}

export function addNoteAppointment(token, body, appointmentId) {
  return {
    type: "ADD_NOTE_APPOINTMENT",
    method: "PUT",
    body,
    route: `appointment/note/${appointmentId}`,
    token,
    appointmentId,
  };
}

export function setCheckOut(payload) {
  return {
    type: "SET_CHECKOUT",
    payload,
  };
}
