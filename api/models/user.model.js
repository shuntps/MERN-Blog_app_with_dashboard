import mongoose from "mongoose";

const userSchema = mongoose.Schema(
   {
      username: {
         type: String,
         required: [true, "Please enter a username"],
         unique: true,
         trim: true,
         minlength: [3, "Username must be at least 3 characters"],
         maxlength: [30, "Username must be at most 30 characters"],
         match: [
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores",
         ],
      },
      email: {
         type: String,
         required: [true, "Please enter a valid email address"],
         unique: true,
         trim: true,
         match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address",
         ],
      },
      password: {
         type: String,
         required: [true, "Please enter a password"],
         minlength: [6, "Password must be at least 6 characters"],
      },
   },
   {
      timestamps: true,
   }
);

const User = mongoose.model("User", userSchema);

export default User;
