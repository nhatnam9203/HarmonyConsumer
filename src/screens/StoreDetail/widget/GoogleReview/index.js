import React from "react";
import { View, Linking } from "react-native";
import { useSelector } from "react-redux";
import { scaleHeight } from "utils";
import { Text } from "components";
import Summary from "./Summary";
import Comments from "./Comments";
import ButtonReview from "./ButtonReview";
import styles from "./styles";
import { isEmpty } from "lodash";

export default function GoogleReviews() {
  const merchant = useSelector((state) => state.storeReducer.merchant_detail);
  const reviewLink = merchant.reviewLink || "";
  const data = merchant?.googleReview?.reviews || [];

  const rating = merchant?.googleReview?.rating || "";
  const user_ratings_total = merchant?.googleReview?.user_ratings_total || "";

  const linkToReviewPage = () => {
    if (!isEmpty(reviewLink)) {
      Linking.openURL(reviewLink);
    } else {
      alert("Not found this store on google.");
    }
  };

  return (
    <View style={styles.container}>
      {!isEmpty(data) ? (
        <React.Fragment>
          <Summary rating={rating} count={user_ratings_total} />
          <ButtonReview onPress={linkToReviewPage} />
          <Comments reviews={data} />
          {data.length === 0 && <View style={{ height: scaleHeight(85) }} />}
          {data.length > 0 && <View style={{ height: scaleHeight(60) }} />}
        </React.Fragment>
      ) : (
        <Text style={styles.txtNotFound}>Not found this store on google.</Text>
      )}
    </View>
  );
}
