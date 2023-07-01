const express = require("express");
const moment = require("moment");

const app = express();

// Database to store user registrations
const registrations = [];

// Middleware to parse request body
app.use(express.json());

// Endpoint for user registration
app.post("/register", (req, res) => {
  const { name, dose, date, time } = req.body;

  // Validate user input
  if (!name || !dose || !date || !time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the dose is valid
  if (dose !== "first" && dose !== "second") {
    return res.status(400).json({ message: "Invalid dose" });
  }

  // Check if the date is within the allowed range (1st to 30th June 2021)
  const start = moment("2021-06-01");
  const end = moment("2021-06-30").endOf("day");
  const selectedDate = moment(date);

  if (
    !selectedDate.isValid() ||
    !selectedDate.isBetween(start, end, "day", "[]")
  ) {
    return res.status(400).json({ message: "Invalid date" });
  }

  // Check if the time is within the allowed range (10 AM to 5 PM)
  const startTime = moment("10:00:00", "HH:mm:ss");
  const endTime = moment("17:00:00", "HH:mm:ss");
  const selectedTime = moment(`${time}`, "HH:mm:ss");

  if (!selectedTime.isBetween(startTime, endTime, null, "[]"))
    return res.status(400).json({ message: "Invalid time" });

  // Check if the selected time slot is available
  const slotStart = moment(`${date}T${time}`);
  const slotEnd = moment(slotStart).add(30, "minutes");
  const isSlotAvailable = registrations.every((registration) => {
    const registeredSlotStart = moment(
      `${registration.date}T${registration.time}`
    );
    const registeredSlotEnd = moment(registrationStart).add(30, "minutes");
    return (
      slotStart.isSameOrAfter(registeredSlotEnd) ||
      slotEnd.isSameOrBefore(registeredSlotStart)
    );
  });
  if (!isSlotAvailable) {
    return res.status(400).json({ message: "Selected slot is not available" });
  }

  // Register the user for the selected slot
  registrations.push({ name, dose, date, time });

  res.json({ message: "Registration successful" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
