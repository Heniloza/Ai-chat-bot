import mongoose, { mongo } from "mongoose";

const userChatSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    chats: [
      {
        _id: {
          type: String,
          required: true,
        },
        title: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default:Date.now()
          },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.userChat || mongoose.model("userchat",userChatSchema);
