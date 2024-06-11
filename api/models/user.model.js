import mongoose from "mongoose";

const userSchema = mongoose.Schema(
   {
      username: {
         type: String,
         required: [true, "Please enter a username"],
         unique: true,
      },
      email: {
         type: String,
         required: [true, "Please enter a valid email address"],
         unique: true,
         trim: true,
         match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
