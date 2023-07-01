const moment = require("moment");

const startDate = moment();
const endDate = moment().add(2, "months");

const dates = [];

const currentDate = moment(startDate);

while (currentDate.isSameOrBefore(endDate)) {
  dates.push(currentDate.format("YYYY-MM-DD"));
  currentDate.add(1, "day");
}

console.log(dates);
