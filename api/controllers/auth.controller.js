import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

// Register User
export const signup = async (req, res) => {
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
      return res.status(400).json({ error: "Please fill all required fields" });
   }

   // Validate username length and characters
   const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
   if (!usernameRegex.test(trimmedUsername)) {
      return res.status(400).json({
         error: "Username must be 3-30 characters long and can only contain letters, numbers, and underscores",
      });
   }

   /*    // Validate password length
   if (password.length < 6) {
      return res
         .status(400)
         .json({ error: "Password must be at least 6 characters" });
   } */

   // Validate password length and complexity
   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
   if (!passwordRegex.test(password)) {
      return res.status(400).json({
         error: "Password must contain at least one uppercase letter, one lowercase letter, and one number, and be at least 6 characters long",
      });
   }

   // Confirm password match
   if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
   }

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(trimmedEmail)) {
      return res
         .status(400)
         .json({ error: "Please enter a valid email address" });
   }

   try {
      // Check if the email already exists
      const userExists = await User.findOne({ email: trimmedEmail });
      if (userExists) {
         return res
            .status(400)
            .json({ error: "Email has already been registered" });
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
      res.status(201).json({ message: "New user created successfully" });
   } catch (error) {
      // Handle errors
      res.status(500).json({ error: "Something went wrong" });
   }
};
