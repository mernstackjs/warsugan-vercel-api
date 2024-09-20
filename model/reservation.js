const { Schema, model } = require("mongoose");

const reservationSchema = new Schema({
  name: String,
  email: String,
  pin: {
    type: String,
    select: false,
  },
  phoneNumber: Number,
  reservationDate: {
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "canceled"],
    default: "pending",
  },
  numberOfPeople: {
    type: Number,
    min: 1,
    default: 1,
  },
  specialRequests: {
    type: String,
    maxlength: 500,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

reservationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Reservation = model("Reservation", reservationSchema);

module.exports = Reservation;
