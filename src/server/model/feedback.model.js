import mongoose, { mongo } from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    context: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      requied: true,
    },
  },
  { timestamps: true }
);

const Feedbacks = mongoose.models.Feedbacks || mongoose.model("Feedbacks", FeedbackSchema);
module.exports = Feedbacks;
