import React, { PureComponent } from "react";
import { View } from "react-native";
import ItemPickTime from "./ItemPickTime";
import { Text } from "components";
import styles from "./styles";

const ColumnTimePicker = (props) => {
  const { data, title, timePicker, onPress } = props;

  return (
    <View style={styles.columnTime}>
      <Text fontFamily="medium" style={styles.txtMorning}>
        {title}
      </Text>
      {data.map((obj) => {
        return (
          <ItemPickTime
            key={obj.id + "avaiableTime" + new Date()}
            onPress={onPress}
            isBooked={obj.isBooked}
            time={obj.time}
            isActive={timePicker === obj.time ? true : false}
          />
        );
      })}
    </View>
  );
};

export default ColumnTimePicker;

// const ListTime = () =>{
//   return(

//   )
// }
