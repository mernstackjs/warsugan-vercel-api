require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://warsugan-client-vercel.vercel.app/",
    ],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "API is running success" });
});

app.use("/api", require("./router/index"));

const port = process.env.PORT;
app.listen(port, () => console.log(`server is running on port ${port}`));

mongoose
  .connect(process.env.MONGODB_URL)
  .then((res) => console.log("server is connected your db"))
  .catch((err) => console.log(err));
