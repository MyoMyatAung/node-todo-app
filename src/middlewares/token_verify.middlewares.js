const jwt = require("jsonwebtoken");
const {
  create401Response,
  create500Response,
} = require("../utils/responseFuns");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return create401Response(res, "Access Denined");
  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET);
    req.user = verified._doc;
    next();
  } catch (error) {
    create500Response(res, error);
  }
};
