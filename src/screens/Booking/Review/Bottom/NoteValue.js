import React from "react";
import { Text } from "components";
import styles from "./styles";

const NoteValue = ({ noteValue = [] }) => {
  if (noteValue.length > 0) return <Text style={styles.txtAddNote}>{noteValue}</Text>;

  return null;
};

export default NoteValue;
