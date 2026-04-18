const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email is required for creating a new account"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "invalid email address",
      ],
      unique: [true, "this email is already in use"],
    },
    name: {
      type: String,
      required: [true, "name is required for creating an account"],
    },
    password: {
      type: String,
      required: [true, "password is required for creating an account"],
      minlength: [6, "password must contain atleast 6 characters"],
      select: false, //so that it doesn't come by default in any query fetched from db
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  return;
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
