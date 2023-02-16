const Joi = require("@hapi/joi");
const { create400Response } = require("../utils/responseFuns");

const registerSchema = Joi.object({
  username: Joi.string().min(5).max(20).required(),
  email: Joi.string().min(7).max(40).required().email(),
  password: Joi.string().min(6).max(20).required(),
});

exports.registerRequestValidator = async (req, res, next) => {
  try {
    const { error } = await registerSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return create400Response(res, error.details[0].message);
  }
};

const loginSchema = Joi.object({
  email: Joi.string().min(7).max(40).required().email(),
  password: Joi.string().min(6).max(20).required(),
});

exports.loginRequestValidator = async (req, res, next) => {
  try {
    const { error } = await loginSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return create400Response(res, error.details[0].message);
  }
};
