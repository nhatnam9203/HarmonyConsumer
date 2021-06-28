export function getNotify(page, token) {
  return {
    type: "GET_NOTIFY",
    method: "GET",
    route: `notification?page=${page}&row=10`,
    token,
  };
}

export function readNotify(ids, token) {
  return {
    type: "READ_NOTIFY",
    method: "PUT",
    route: `notification/view/${ids}`,
    ids,
    token,
  };
}

export function getNotifyToday(timezone, token, cb) {
  return {
    type: "GET_NOTIFY_TODAY",
    method: "GET",
    route: `notification/type/today?page=0&timezone=${timezone}&api-version=2.0`,
    token,
    cb,
  };
}

export function countUnread(token) {
  return {
    type: "COUNT_UNREAD",
    method: "GET",
    route: `notification/countUnRead?api-version=2.0`,
    token,
  };
}

export function getNotifyHistory(page, timezone, token, cb) {
  return {
    type: "GET_NOTIFY_HISTORY",
    method: "GET",
    route: `notification/type/history?page=${page}&row=20&timezone=${timezone}&api-version=2.0`,
    token,
    page,
    cb,
  };
}

export function readAllInbox(token) {
  return {
    type: "READ_ALL_INBOX",
    method: "PUT",
    route: `notification/view/all`,
    token,
  };
}

export function deleteAllInbox(token) {
  return {
    type: "DELETE_ALL_INBOX",
    method: "DELETE",
    route: `notification?ids=all&api-version=2.0`,
    token,
  };
}
