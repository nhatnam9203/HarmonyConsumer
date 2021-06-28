export function getUserRewardPointsSummary(token) {
  return {
    type: "GET_USER_REWARD_POINT_SUMMARY",
    method: "GET",
    route: `user/rewardPoint`,
    token,
  };
}

export function reCalulateTotal(body, token, cb) {
  return {
    type: "RE_CALULATE_TOTAL",
    method: "PUT",
    body: body,
    route: `appointment/reCalulateTotal`,
    token,
    cb,
  };
}

export function resetStateReCalculteTotal() {
  return {
    type: "RESET_STATE_RE_CALCULTE_TOTAL",
    payload: false,
  };
}
export function get_number_invoice(token) {
  return {
    type: "GET_INVOICE",
    method: "GET",
    route: "notification/pay",
    token,
  };
}

export function add_tip_and_pay(body, bodyPayment, token, paymentId, appointmentId, cb) {
  return {
    type: "ADD_TIP_AND_PAY",
    method: "PUT",
    token,
    route: `appointment/tip/${appointmentId}`,
    body,
    bodyPayment,
    paymentId,
    cb,
  };
}

export function payment(body, token, appointmentId, cb) {
  return {
    type: "PAYMENT",
    method: "PUT",
    route: `user/checkout/${appointmentId}`,
    body,
    token,
    cb,
  };
}

export function paymentTransaction(
  token,
  userId,
  page,
  fromTime,
  toTime,
  filterType,
  timezone,
  cb,
) {
  return {
    type: "PAYMENT_TRANSACTION",
    method: "GET",
    route: `paymentTransaction/${userId}?page=${page}&quickFilter=&from=${fromTime}&to=${toTime}&api-version=2.0&filterType=${filterType}&timezone=${timezone}`,
    token,
    cb,
    page,
  };
}

export function onChangeFilterType(filterType) {
  return {
    type: "ON_CHANGE_FILTER_TYPE",
    filterType,
  };
}

export function payment_by_scan(body, token) {
  return {
    type: "PAYMENT_BY_SCAN",
    method: "PUT",
    route: `user/checkoutScanQRCode`,
    body,
    token,
  };
}
