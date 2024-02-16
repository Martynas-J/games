import mongoose from "mongoose";

const { Schema } = mongoose;

const marketSchema = new Schema(
  {
    name: { type: String, default: "Market" }, 
    sellMarket: [{
      item: { type: String, default: "", required: true },
      seller: { type: String, default: "", required: true },
      price: { type: Number, default: 0, required: true },
      purchased: { type: Boolean, default: false, required: true },
    }],
  },
  { timestamps: true }
);

let marketModel;
try {
  marketModel = mongoose.model("Market");
} catch (error) {
  marketModel = mongoose.model("Market", marketSchema);
}
export default marketModel;
