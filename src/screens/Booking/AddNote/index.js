import React from "react";
import { View, StyleSheet } from "react-native";
import InputAddNote from "./InputAddNote";
import { scaleWidth } from "utils";
import actions from "@redux/actions";
import { StatusBar, Header } from "components";
import * as RootNavigation from "navigations/RootNavigation";
import images from "assets";
import { useSelector, useDispatch } from "react-redux";

export default function index(props) {
  const dispatch = useDispatch();
  const { noteValue } = useSelector((state) => state.bookingReducer);
  const { token } = useSelector((state) => state.datalocalReducer);
  const [valueNote, setValueNote] = React.useState("");

  const { appointmentId } = props.route.params;

  React.useEffect(() => {
    setValueNote(noteValue);
  }, []);

  const onBack = () => {
    RootNavigation.back();
  };

  const submitAddNote = () => {
    const body = {
      notes: valueNote,
    };
    dispatch(actions.appointmentAction.addNoteAppointment(token, body, appointmentId));
  };

  const addNote = () => {
    if (valueNote !== noteValue) {
      dispatch(actions.bookingAction.checkEdit(true));
    }
    dispatch(actions.bookingAction.addNoteValue(valueNote));
    onBack();
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#f8f8f8" }}>
        <StatusBar />
        <Header
          title="Add note"
          headerLeft
          headerRight
          iconRight={images.icon_check_select}
          onPressRight={appointmentId ? submitAddNote : addNote}
          onBack={onBack}
        />
      </View>
      <View style={styles.body}>
        <InputAddNote
          valueNote={valueNote}
          setValueNote={setValueNote}
          onSubmit={appointmentId ? submitAddNote : addNote}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  body: {
    flex: 1,
    padding: scaleWidth(3),
  },
});
