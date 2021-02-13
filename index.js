const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./models");

const { User } = require("./models");

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5555;

app.get("/", (req, res) => {
  res.send(`Hello World form ${port}`);
});

app.post("/signin", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const googleId = req.body.googleId;
  const channelName = req.body.channelName;
  const profilePictureUrl = req.body.profilePictureUrl;

  User.create({
    name: name,
    email: email,
    googleId: googleId,
    channelName: channelName,
    profilePictureUrl: profilePictureUrl,
  }).catch((err) => {
    console.log(err.errors[0]);
  });

  res.send("inserted into db");
});

db.sequelize.sync().then((req) => {
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
});
