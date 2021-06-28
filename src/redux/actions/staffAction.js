export function staffGetByMerchant(merchantId, token) {
  return {
    type: "STAFF_GET_BY_MERCHANT",
    method: "GET",
    route: `staff/getbymerchant/${merchantId}`,
    token,
  };
}

export function staffGetAvaiableTime(staffId, token, body) {
  return {
    type: "STAFF_GET_AVAIABLE_TIME",
    method: "PUT",
    route: `staff/getavailabletime/${staffId}`,
    token,
    body,
  };
}

export function getFavouriteStaffMerchant(token) {
  return {
    type: "GET_FAVOURITE_STAFF_MERCHANT",
    method: "GET",
    route: `UserFavoriteStaff`,
    token,
  };
}

export function updateFavouriteStaff(token, body) {
  return {
    type: "UPDATE_FAVOURITE_STAFF",
    method: "POST",
    route: `UserFavoriteStaff`,
    token,
    body,
  };
}

export function getStaffAppointment(token, appointmentId) {
  return {
    type: "GET_STAFF_APPOINTMENT",
    method: "GET",
    route: `staff/getbyappointment/${appointmentId}`,
    token,
  };
}
