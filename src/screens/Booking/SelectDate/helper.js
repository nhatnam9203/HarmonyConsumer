import moment from "moment";

export function getTimeAvaible(staff_available_time) {
  const time12PM = `${moment().format("YYYY-MM-DD")}T12:00:00`;
  const time05PM = `${moment().format("YYYY-MM-DD")}T17:00:00`;

  const morning = staff_available_time.filter((obj) => {
    const timeFilter = `${moment().format("YYYY-MM-DD")}T${moment(obj.time, ["h:mm A"]).format(
      "HH:mm:ss",
    )}`;
    return moment(timeFilter).isSameOrBefore(time12PM);
  });

  const afternoon = staff_available_time.filter((obj) => {
    const timeFilter = `${moment().format("YYYY-MM-DD")}T${moment(obj.time, ["h:mm A"]).format(
      "HH:mm:ss",
    )}`;
    return moment(timeFilter).isAfter(time12PM) && moment(timeFilter).isBefore(time05PM);
  });

  const evening = staff_available_time.filter((obj) => {
    const timeFilter = `${moment().format("YYYY-MM-DD")}T${moment(obj.time, ["h:mm A"]).format(
      "HH:mm:ss",
    )}`;
    return moment(timeFilter).isSameOrAfter(time05PM);
  });

  return {
    morning,
    afternoon,
    evening,
  };
}
