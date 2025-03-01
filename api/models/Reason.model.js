import mongoose from "mongoose";

const ReasonSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: true,
    },
    Phone: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Reason = mongoose.model("Reason", ReasonSchema);

export default Reason;
