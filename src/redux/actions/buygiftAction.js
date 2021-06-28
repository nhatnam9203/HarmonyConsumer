export const get_all_template = (token, typeGift) => {
  return {
    type: "GET_ALL_TEMPLATE",
    method: "GET",
    route: `giftcardtemplate/type?type=${typeGift}`,
    token,
    typeGift,
  };
};

export function search_manually(token, body, cb) {
  return {
    type: "SEARCH_MANUALLY",
    method: "GET",
    route: `user/search?${body}`,
    token,
    cb,
  };
}

export function set_gift_send(payload) {
  return {
    type: "SET_GIFT_SEND",
    payload,
  };
}

export function get_contacts(token, body) {
  return {
    type: "GET_CONTACTS",
    method: "GET",
    route: `user/getbycontact?listphone=${body}`,
    token,
  };
}

export function post_template_card(token, body) {
  return {
    type: "POST_TEMPLATE_CARD",
    method: "POST",
    route: "giftcardtemplate",
    token,
    body,
  };
}

export function send_gift_card(token, body, cb) {
  return {
    type: "SEND_GIFT_CARD",
    method: "POST",
    route: `p2pgiftcard`,
    token,
    body,
    cb,
  };
}

export function claim_gift_card(token, body, giftcardId, notificationId, cb) {
  return {
    type: "CLAIM_GIFT_CARD",
    method: "PUT",
    route: `p2pgiftcard/claim/${giftcardId}`,
    token,
    body,
    notificationId,
    cb,
  };
}

export function fitler_contacts(payload) {
  return {
    type: "FILTER_CONTACTS",
    payload,
  };
}
