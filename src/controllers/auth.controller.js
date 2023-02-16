const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../models/user.model");
const {
  create400Response,
  create201Response,
  create500Response,
  create200Response,
} = require("../utils/responseFuns");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const emailExist = await UserModel.findOne({ email: email });
    if (emailExist) {
      return create400Response(res, "Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserModel({ username, email, password: hashedPassword });
    const saveUser = await user.save();
    const token = jwt.sign({ ...saveUser }, process.env.TOKEN_SECRET);
    return create201Response(res, { user: saveUser, token });
  } catch (error) {
    return create500Response(res, error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) return create400Response(res, "Incorrect Email");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return create400Response(res, "Incorrect Password");

  try {
    const token = jwt.sign({ ...user }, process.env.TOKEN_SECRET);
    return create200Response(res, { user, token });
  } catch (error) {
    return create500Response(res, error);
  }
};
