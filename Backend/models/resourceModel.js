import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Resource type is required"],
  },
  description: {
    type: String,
    required: [true, "Resource description is required"],
  },
  availability: { type: Boolean, default: true },
  department_id: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  institute_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institute",
    required: [true, "Institute reference is required"],
  },
  price_per_day: {
    type: Number,
    required: [true, "Resource price per day is required"],
  },
  image_url: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Resource = mongoose.model("Resource", ResourceSchema);
export default Resource;
