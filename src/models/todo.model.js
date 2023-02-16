const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 10,
      maxLength: 20,
      required: true,
    },
    description: {
      type: String,
      minLength: 10,
      maxLength: 100,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "user",
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    dueDate: {
      type: Date,
      default: null,
      validate: {
        validator: (value) => {
          if(!value){
            return true;
          }
          let dueDate = new Date(value);
          let currentDate = new Date();
          return dueDate.getTime() > currentDate.getTime();
        },
        message: (props) => `Invalid due date!`,
      },
    },
    priority: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 1,
    },
    flags: [String],
  },
  { timestamps: true }
);

exports.TodoModel = mongoose.model("todo", todoSchema);
