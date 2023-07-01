const moment = require("moment");

const startDate = moment().set({ hour: 10, minute: 0, second: 0 });
const endDate = moment().set({ hour: 17, minute: 0, second: 0 });

const timeSlots = [];

const currentTime = moment(startDate);

while (currentTime.isBefore(endDate)) {
  timeSlots.push(currentTime.format("hh:mm A"));
  currentTime.add(30, "minutes");
}

console.log(timeSlots);
