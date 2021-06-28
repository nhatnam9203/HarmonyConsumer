export function getRewardProfile(token) {
  return {
    type: "GET_REWARD_PROFILE",
    method: "GET",
    route: `user/rewardPointProfile`,
    token,
  };
}

export function getMemberBenefit(token) {
  return {
    type: "GET_MEMBER_BENEFIT",
    method: "GET",
    route: `memberbenefit`,
    token,
  };
}

export function getPoint(page, timezone, token, cb) {
  return {
    type: "GET_POINT",
    method: "GET",
    route: `rewardPointTransaction/getByType/get?timezone=${timezone}&page=${page}`,
    token,
    page,
    timezone,
    cb,
  };
}

export function getPointUsed(page, timezone, token, cb) {
  return {
    type: "GET_POINT_USED",
    method: "GET",
    route: `rewardPointTransaction/getByType/use?timezone=${timezone}&page=${page}`,
    token,
    page,
    timezone,
    cb,
  };
}
