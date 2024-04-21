import mongoose from "mongoose";
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,8}$/;
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, dataType: "email" },
  password: {
    type: String,
    required: true
    // validate: {
    //   validator: function (value) {
    //     return passwordPattern.test(value);
    //   },
    //   message: `Invalid password. It must contain at least 1 capital letter, 1 small letter, 1 number, 1 special character, and have a maximum length of 8 characters.`
    // }
  },
  number: { type: String },
  profilepic: { type: String },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  forgotPasswordToken: { type: String },
  forgotPasswordExpiry: { type: Date },
  courses: { type: Array },
  status: { type: String },
  price: { type: String },
  coupenCode: { type: String },
  verifyToken: { type: String },
  verifyTokenExpiry: { type: Date },
  date: { type: Date, default: Date.now },
  time: { type: String, default: () => new Date().toLocaleTimeString() }
});

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;
