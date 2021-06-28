export const get_creditCard = (token) => {
  return {
    type: "GET_CREDIT_CARD_FOR_USER",
    method: "GET",
    route: "card",
    token,
  };
};

export const get_BankCard = (token) => {
  return {
    type: "GET_BANK_CARD_FOR_USER",
    method: "GET",
    route: "bank",
    token,
  };
};

export const add_creditCard = (body, token, cb) => {
  return {
    type: "ADD_CREDIT_CARD",
    method: "POST",
    route: "card",
    body,
    token,
    cb,
  };
};

export const add_BankCard = (body, token, resetForm) => {
  return {
    type: "ADD_BANK_CARD",
    method: "POST",
    route: "bank",
    body,
    token,
    resetForm,
  };
};

export const set_detail_card = (payload) => {
  return {
    type: "SET_DETAIL_CARD",
    payload,
  };
};

export const is_first_card = (payload) => {
  return {
    type: "IS_FIRST_CARD",
    payload,
  };
};

export const remove_credit_card = (cardId, token, cb) => {
  return {
    type: "REMOVE_CREDIT_CARD",
    method: "DELETE",
    route: `card/${cardId}`,
    token,
    cb,
  };
};

export const remove_bank_card = (cardId, token, cb) => {
  return {
    type: "REMOVE_BANK_CARD",
    method: "DELETE",
    route: `bank/${cardId}`,
    token,
    cb,
  };
};
