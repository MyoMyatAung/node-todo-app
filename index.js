require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connect } = require("./src/db/db");

const todoRouter = require("./src/routes/todo.routes");
const authRouter = require("./src/routes/auth.routes");
const morgan = require("morgan");

let app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./public"));
app.use(morgan("common"));

app.use("/api/v1", authRouter);
app.use("/api/v1/todos", todoRouter);

connect()
  .then(() => console.log("DB SUCCESSFULLY CONNECTED"))
  .catch((error) => console.log("ERROR IN DB CONNECTION", error));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${port}`);
});
