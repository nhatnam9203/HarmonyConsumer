import React, { useEffect } from "react";
import { View, StatusBar } from "react-native";
import { Header, PointCanUse, AccumulationProcess } from "./widget";
import { scaleWidth } from "utils";
import { useDispatch, useSelector } from "react-redux";
import { FocusAwareStatusBar } from "components";
import actions from "@redux/actions";

export default function index(props) {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.datalocalReducer.token);
  const { rewardProfile } = useSelector((state) => state.customerReducer);
  const { availableRewardPoint, currentRank, nextRank, nextRankExp, percentToNextRank } =
    rewardProfile ? rewardProfile : "";

  const timezone = new Date().getTimezoneOffset();

  useEffect(() => {
    dispatch(actions.customerAction.getRewardProfile(token));
    dispatch(actions.customerAction.getPoint(1, timezone, token, () => {}));
    dispatch(actions.customerAction.getPointUsed(1, timezone, token, () => {}));
    dispatch(actions.customerAction.getMemberBenefit(token));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="transparent" />
      <StatusBar barStyle="light-content" />
      <Header currentRank={currentRank} {...props} />
      <View style={{ flex: 6.5, paddingVertical: scaleWidth(3), backgroundColor: "#F8F8F8EB" }}>
        <PointCanUse availableRewardPoint={availableRewardPoint} {...props} />
        <AccumulationProcess
          nextRank={nextRank}
          nextRankExp={nextRankExp}
          percentToNextRank={percentToNextRank}
          currentRank={currentRank}
          {...props}
        />
      </View>
    </View>
  );
}
