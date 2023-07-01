const moment = require("moment");

const startDate = moment("2021-06-01");
const endDate = moment("2022-06-30").endOf("day");

const selectedDate = moment("2021-06-23");

if (selectedDate.isBetween(startDate, endDate, "day", "[]")) {
  console.log("Yes");
} else {
  console.log("no");
}
