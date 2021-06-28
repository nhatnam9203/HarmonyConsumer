import React from "react";
import { ProgressiveImage } from "components";
import styles from "./styles";

const LogoStore = ({ imgStore }) => {
  return <ProgressiveImage style={styles.store} source={imgStore} />;
};

export default LogoStore;
