import bcryptjs from "bcryptjs";

import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

// Register User
export const signup = async (req, res, next) => {
   const { username, email, password, confirmPassword } = req.body;

   // Trim username and email to remove any leading/trailing spaces
   const trimmedUsername = username.trim();
   const trimmedEmail = email.trim();

   // Validation
   if (
      !trimmedUsername ||
      !trimmedEmail ||
      !password ||
      !confirmPassword ||
      trimmedUsername === "" ||
      trimmedEmail === "" ||
      password === "" ||
      confirmPassword === ""
   ) {
      next(errorHandler(400, "All fields are required"));
   }

   // Validate username length and characters
   const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
   if (!usernameRegex.test(trimmedUsername)) {
      next(
         errorHandler(
            400,
            "Username must be 3-30 characters long and can only contain letters, numbers, and underscores"
         )
      );
   }

   // Validate password length and complexity
   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
   if (!passwordRegex.test(password)) {
      next(
         errorHandler(
            400,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number, and be at least 6 characters long"
         )
      );
   }

   // Confirm password match
   if (password !== confirmPassword) {
      next(errorHandler(400, "Passwords do not match"));
   }

   // Validate email format
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(trimmedEmail)) {
      next(errorHandler(400, "Please enter a valid email address"));
   }

   try {
      // Check if the email already exists
      const userExists = await User.findOne({ email: trimmedEmail });
      if (userExists) {
         next(errorHandler(400, "Email has already been registered"));
      }

      // Hash the password asynchronously
      const hashedPassword = await bcryptjs.hash(password, 10);

      // Create a new user
      const newUser = new User({
         username: trimmedUsername,
         email: trimmedEmail,
         password: hashedPassword,
      });

      // Save new user
      await newUser.save();

      // Respond with success
      res.status(200).json({ message: "New user created successfully" });
   } catch (error) {
      // Handle errors
      next(error);
   }
};
