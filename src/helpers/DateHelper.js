import * as moment from "moment-timezone";

export function getFormattedDiff({
  fromDate,
  toDate,
  timezone = "Asia/Calcutta",
}) {
  var now = fromDate ? moment.tz(fromDate, timezone) : moment.tz(timezone);
  var end = moment.tz(toDate, timezone);
  var duration = moment.duration(end.diff(now));

  //Get Days and subtract from duration
  var days = duration.days();
  duration.subtract(moment.duration(days, "days"));

  //Get hours and subtract from duration
  var hours = duration.hours();
  hours = Number(hours).toLocaleString("en-us", { minimumIntegerDigits: 2 });
  duration.subtract(moment.duration(hours, "hours"));

  //Get Minutes and subtract from duration
  var minutes = duration.minutes();
  minutes = Number(minutes).toLocaleString("en-us", {
    minimumIntegerDigits: 2,
  });
  duration.subtract(moment.duration(minutes, "minutes"));

  //Get seconds
  var seconds = duration.seconds();
  seconds = Number(seconds).toLocaleString("en-us", {
    minimumIntegerDigits: 2,
  });

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
