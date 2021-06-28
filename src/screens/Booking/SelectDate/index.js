import React from "react";
import { View, ScrollView } from "react-native";
import Header from "./Header";
import Calendar from "./Calendar";
import TimePicker from "./TimePicker";
import HeaderReschedule from "./HeaderReschedule";
import ButtonConfirm from "./ButtonConfirm";
import { scaleHeight } from "utils";
import useHook from "./hook";
import styles from "./styles";

export default function index(props) {
  const [
    isReschedule,
    isLoading,
    setTimePicker,
    day,
    onChangeDay,
    reScheduleAction,
    reviewConfirmAction,
  ] = useHook();

  return (
    <View style={styles.container}>
      {!isReschedule ? <Header title={"Select Date/Time"} step={3} /> : <HeaderReschedule />}

      {!isLoading && (
        <React.Fragment>
          <View style={styles.body}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <View style={styles.wrapBody}>
                <Calendar daySelect={day} onChangeTime={onChangeDay} />
                <Line />
                <TimePicker setTimePicker={setTimePicker} />
              </View>
              <View style={{ height: scaleHeight(50) }} />
            </ScrollView>

            <ButtonConfirm
              onPress={isReschedule ? reScheduleAction : reviewConfirmAction}
              title={isReschedule ? "Confirm" : "Book"}
            />
          </View>
        </React.Fragment>
      )}
    </View>
  );
}

const Line = () => <View style={styles.line} />;
