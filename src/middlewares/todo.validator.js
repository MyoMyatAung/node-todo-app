const Joi = require("@hapi/joi");
const { create400Response } = require("../utils/responseFuns");

const createTodoSchema = Joi.object({
  title: Joi.string().min(10).max(20).required(),
  description: Joi.string().min(10).max(100).required(),
  dueDate: Joi.date(),
  priority: Joi.number(),
  flags: Joi.array(),
});

exports.createTodoReqValidator = async (req, res, next) => {
  try {
    const { error } = await createTodoSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return create400Response(res, error.details[0].message);
  }
};
