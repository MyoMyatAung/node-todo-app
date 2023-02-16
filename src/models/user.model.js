const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 5,
      maxLength: 20,
      required: true,
    },
    email: {
      type: String,
      minLength: 7,
      maxLength: 40,
      required: true,
      unique: true,
      validate: {
        validator: (val) => {
          var validRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          return val.match(validRegex);
        },
        message: (props) => `Invalid email format`,
      },
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
  },
  { timestamps: true }
);

exports.UserModel = mongoose.model("user", userSchema);
