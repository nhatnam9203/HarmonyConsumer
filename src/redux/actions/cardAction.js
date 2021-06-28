export const get_card_by_user = (token, userId, cb) => {
  return {
    type: "GET_CARD_BY_USER",
    method: "GET",
    route: `usercard/getbyuser/${userId}`,
    token,
    cb,
  };
};

export const get_card_by_id = (token, id) => {
  return {
    type: "GET_CARD_BY_ID",
    method: "GET",
    route: `usercard/${id}?api-version=2.0`,
    token,
  };
};

export function update_primary_card(token, isPrimary, cardId) {
  return {
    type: "UPDATE_PRIMARY_CARD",
    method: "PUT",
    route: `usercard/setprimary/${cardId}?isPrimary=${isPrimary}`,
    token,
  };
}

export function add_card(token, body) {
  return {
    type: "ADD_CARD",
    method: "POST",
    route: `usercard`,
    token,
    body,
  };
}

export function set_card_reload(payload) {
  return {
    type: "SET_CARD_RELOAD",
    payload,
  };
}

export function set_card_detail(payload) {
  return {
    type: "SET_CARD_DETAIL",
    payload,
  };
}

export const add_money_to_card = (token, body, userCardId, cb) => {
  return {
    type: "ADD_MONEY_TO_CARD",
    method: "PUT",
    route: `usercard/reload/${userCardId}`,
    token,
    body,
    userCardId,
    cb,
  };
};

export const auto_reload = (token, body, userCardId) => {
  return {
    type: "AUTO_RELOAD",
    method: "PUT",
    route: `userCard/${userCardId}`,
    token,
    body,
    userCardId,
  };
};

export function transfer_card(token, body, cb) {
  return {
    type: "TRANSFER_CARD",
    method: "PUT",
    route: `usercard/transfer`,
    token,
    body,
    cb,
  };
}

export const remove_Card = (token, userCardId, cb) => {
  return {
    type: "REMOVE_CARD",
    method: "DELETE",
    route: `usercard/${userCardId}`,
    token,
    cb,
  };
};

export const sendLinkInvite = (body, token, cb) => {
  return {
    type: "SEND_LINK_INVITE",
    method: "POST",
    route: `P2PGiftCard`,
    body,
    token,
    cb,
  };
};
