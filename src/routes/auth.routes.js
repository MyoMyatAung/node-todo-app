const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const {
  registerRequestValidator,
  loginRequestValidator,
} = require("../middlewares/auth.validator");
const router = express.Router();

router.post("/register", registerRequestValidator, register);
router.post("/login", loginRequestValidator, login);

module.exports = router;
