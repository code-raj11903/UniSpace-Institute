import mongoose from "mongoose";


// Define the Booking Schema
const OrderSchema = new mongoose.Schema({
  resource_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now },
  total_amount: { type: Number, required: true },
  payment_status: { type: String, default: "Pending" },
  start_date: { type: Date},
  end_date: { type: Date },
});

// Register the Booking model with Mongoose
const Order = mongoose.model("Order", OrderSchema);

export default Order;
