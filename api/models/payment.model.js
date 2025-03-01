import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {

    currentuserId: {
      type: String,
      required: true,
      
      
    },

    name: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Phone: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    petname: {
      type: String,
      required: true,
    },

    CardNumber: {
      type: Number,
      required: true,
    },
    Date: {
      type: String,
      required: true,
    },
    cvc: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const payment = mongoose.model("payment", paymentSchema);

export default payment;
