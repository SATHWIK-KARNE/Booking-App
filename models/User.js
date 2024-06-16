import { Schema, model, models } from "mongoose";

// for authentication we're using Google provider through nextAuth
// so no need to store password as traditional

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  {
    timestamps: true, //automatically creates updatedAt and createdAt
  }
);

const User = models.User || model("User", UserSchema);

export default User;
