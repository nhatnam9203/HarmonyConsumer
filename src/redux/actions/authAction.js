export function login(body, cb) {
  return {
    type: "LOGIN",
    method: "POST",
    route: "user/login",
    body,
    cb,
  };
}

export function loginSocial(body, cb) {
  return {
    type: "LOGIN_SOCIAL",
    method: "POST",
    route: "user/sociallogin",
    body,
    cb,
  };
}

export function loginApple(userIdApple, cb) {
  return {
    type: "LOGIN_APPLE",
    method: "GET",
    route: `user/getByAppleIdToken/${userIdApple}`,
    cb,
  };
}

export function quickLogin(body, cb) {
  return {
    type: "QUICK_LOGIN",
    method: "POST",
    route: "user/quickLogin",
    body,
    cb,
  };
}

export function phoneHasSignin(phone, cb) {
  return {
    type: "PHONE_HAS_SIGNIN",
    method: "GET",
    route: `customer/phoneHasSignin/${phone}`,
    cb,
  };
}

export function checkPassword(body, cb) {
  return {
    type: "CHECK_PASSWORD",
    method: "POST",
    route: "user/login",
    body,
    cb,
  };
}

export function updatePincodeSuccess(body, cb) {
  return {
    type: "UPDATE_PINCODE_SUCCESS",
    method: "POST",
    route: "user/login",
    body,
  };
}

export function logout(token) {
  return {
    type: "LOGOUT",
    method: "PUT",
    route: "user/logout",
    token,
  };
}

export function setPassword(verifyPhoneId, body, infoOldCustomer, cb) {
  return {
    type: "SET_PASSWORD",
    method: "POST",
    route: `user/setPassword/${verifyPhoneId}`,
    verifyPhoneId,
    body,
    infoOldCustomer,
    cb,
  };
}

export function getCustomerByPhone(phone, handleFoundPhoneNumber, handleNotFoundPhoneNumber) {
  return {
    type: "GET_CUSTOMER_BY_PHONE",
    method: "GET",
    route: `user/getByPhone/${phone}`,
    handleFoundPhoneNumber,
    handleNotFoundPhoneNumber,
    phone,
  };
}

export function verifyPhoneCustomer(body, cb) {
  return {
    type: "VERIFY_PHONE_CUSTOMER",
    method: "POST",
    route: `user/verifyPhone/?api-version=2.0`,
    body,
    cb,
  };
}

export function verifyPhoneCode(body, verifyPhoneCodeId, cb) {
  return {
    type: "VERIFY_PHONE_CODE",
    method: "PUT",
    route: `verifyPhoneCode/${verifyPhoneCodeId}`,
    body,
    cb,
  };
}

export function createCustomer(body, cb) {
  return {
    type: "CREATE_CUSTOMER",
    method: "POST",
    route: `user/?api-version=2.0`,
    body,
    cb,
  };
}

export function updateCustomer(body, token, cb) {
  return {
    type: "UPDATE_CUSTOMER",
    method: "PUT",
    route: `user`,
    body,
    token,
    cb,
  };
}

export function getCustomerById(userId, token, cb = () => {}, typeFetch = "") {
  return {
    type: "GET_CUSTOMER_BY_ID",
    method: "GET",
    route: `user/${userId}`,
    token,
    cb,
    typeFetch,
  };
}

export function changePincode(body, token, cb) {
  return {
    type: "CHANGE_PINCODE",
    method: "PUT",
    route: `user/changepassword`,
    body,
    token,
    cb,
  };
}

export function uploadAvatar(body, cb) {
  return {
    type: "UPLOAD_AVATAR",
    route: `file?category=avatar`,
    method: "POST",
    body,
    cb,
  };
}

export function forgotPassword(body, cb) {
  return {
    type: "FORGOT_PASSWORD",
    method: "POST",
    route: `user/forgotpassword/?api-version=2.0`,
    body,
    cb,
  };
}

export function checkEmail(email, info, cb) {
  return {
    type: "CHECK_EMAIL",
    method: "GET",
    route: `user/checkemail?email=${email}&api-version=2.0`,
    info,
    cb,
  };
}

export function updateAccount(body, token) {
  return {
    type: "UPDATE_ACCOUNT",
    method: "PUT",
    route: `user/account`,
    body,
    token,
  };
}
