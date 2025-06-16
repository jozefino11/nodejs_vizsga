import express from "express";
import session from "express-session";
import { initDb } from "./services/db.js";
import { addRoutes } from "./router/index.js";

const app = express();

app.use(
  session({
    secret: "hlk347347klhlkh234",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded());

app.set("view engine", "ejs");

initDb((err, { tweetModel, userModel, saveDB }) => {
  //console.log(saveDB);
  if (err) {
    return console.log("App cannot start", err);
  }
  addRoutes(app, { tweetModel, userModel, saveDB });

  app.listen(6001, function () {
    console.log("Running on: 6001");
  });
});


