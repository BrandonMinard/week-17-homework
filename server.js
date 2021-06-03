const express = require("express");
const mongoose = require("mongoose");

const PORT = 3000;

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//connect to db
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout_db", {
  useNewUrlParser: true,
  useFindAndModify: false
});

//get routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});