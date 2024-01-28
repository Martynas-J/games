import mongoose from "mongoose";

const { Schema } = mongoose;

 const messageSchema= new Schema(
  {
    playerName: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true,  }
);
const chatSchema = new Schema(
  {
    messages: [messageSchema],

  },
  { timestamps: true }
);
let chatModel;
try {
  chatModel = mongoose.model("Chat");
} catch (error) {
  chatModel = mongoose.model("Chat", chatSchema);
}
export default chatModel;
