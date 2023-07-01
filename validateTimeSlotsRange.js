const moment = require("moment");

const startTime = moment("10:00:00", "HH:mm:ss");
const endTime = moment("17:00:00", "HH:mm:ss");

let time = "17:00 PM";

time = moment(time, "hh:mm A").format("HH:mm:ss");

const selectedTime = moment(time, "HH:mm:ss");

if (selectedTime.isBetween(startTime, endTime, null, "[]")) {
  console.log("valid time slot");
} else {
  console.log("Invalid time slot");
}
