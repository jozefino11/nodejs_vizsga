import { renderMW } from "../middlewares/render.js";
import { authMW } from "../middlewares/user/auth.js";
import { createTweetMW } from "../middlewares/tweet/createTweet.js";
import { deleteTweetMW } from "../middlewares/tweet/deleteTweet.js";
import { getLoggedInUserMW } from "../middlewares/user/getLoggedInUser.js";
import { getUsersListMW } from "../middlewares/user/getUsersList.js";
import { loginMW } from "../middlewares/user/login.js";
import { logoutMW } from "../middlewares/user/logout.js";
import { modTweetMW } from "../middlewares/tweet/modTweet.js";
import { modUserMW } from "../middlewares/user/modUser.js";
import { regMW } from "../middlewares/user/reg.js";
import { sendForgotPwMW } from "../middlewares/user/sendForgot.js";
import { delmyaccMW } from "../middlewares/user/delmyacc.js";
import { changePublicTweetsButtonValueMW } from "../middlewares/tweet/changePublicTweetsButtonValue.js";
import { resetVariableMW } from "../middlewares/user/resetVariable.js";
import { prevTweetMW } from "../middlewares/tweet/prevtweet.js";
import { createPictureMW } from "../middlewares/user/createPicture.js";
import { createFollowUserMW } from "../middlewares/user/createFollowUser.js";
import { deletePictureMW } from "../middlewares/user/deletePicture.js";
import { createRetweetMW } from "../middlewares/tweet/createRetweet.js";
import { v4 as uuidv4 } from "uuid";
import { emailService } from "../services/email.js";
import multer from "multer";
import path from "path";
import express from "express";
import { getAllTweetsMW } from "../middlewares/tweet/getAllTweets.js";

export const addRoutes = (app, { tweetModel, userModel, saveDB }) => {
  const objRepo = {
    tweetModel,
    userModel,
    uuidv4,
    saveDB,
    emailService,
  };

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const rnd = Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname).toLowerCase();
      return cb(null, `${file.fieldname}-${Date.now()}-${rnd}${ext}`);
    },
  });

  const uploadMW = multer({ storage });
  //app.use('/static', express.static('public'));

  app.use("/myuploads", authMW(), express.static("uploads"));

  //Routok

  app.get("/forgotpw", renderMW("forms/forgotpw")); //Elfelejtett jelszó oldal betöltése
  app.post(
    "/forgotpw",
    sendForgotPwMW(objRepo),
    renderMW("forms/forgotpw", objRepo),
  ); //Elfelejtett jelszóhoz email cím elküldése

  app.get("/newpw/:secret", renderMW("forms/newpw")); //Új jelszó oldal betöltése
  app.post(
    "/newpw/:secret",
    modUserMW(objRepo, "password"),
    renderMW("forms/newpw", objRepo),
  ); //Új jelszó  beküldése a rendszernek

  app.get(
    "/home",
    authMW(),
    getLoggedInUserMW(objRepo),
    getUsersListMW(objRepo),
    getAllTweetsMW(objRepo),
    renderMW("mainpage"),
  ); //Főoldal betöltése

  app.get(
    "/profile",
    authMW(),
    getLoggedInUserMW(objRepo),
    //getUsersListMW(objRepo),
    renderMW("profile"),
  ); //Profil oldal betöltése
  app.get("/reg", renderMW("forms/reg")); //Regisztrációs oldal betöltése
  app.post("/reg", regMW(objRepo), loginMW(objRepo)); //Regisztrációs adatok beküldése
  app.get("/logout", authMW(), logoutMW()); //Kijelentkezés

  app.get("/newtweet", authMW(), renderMW("forms/newtweet")); //Új tweet oldal betöltése
  app.post("/newtweet", authMW(), createTweetMW(objRepo)); //Új tweet posztolása

  app.get(
    "/modtweet/:tweetid",
    authMW(),
    prevTweetMW(objRepo),
    renderMW("forms/modifytweet", objRepo),
  ); //Tweet módosítása oldal betöltése

  app.post("/modtweet/:tweetid", authMW(), modTweetMW(objRepo)); //Egy tweet módosítása
  app.get("/deltweet/:tweetid", authMW(), deleteTweetMW(objRepo)); //Saját tweet törlése

  app.get("/followuser/:userid", authMW(), createFollowUserMW(objRepo)); //Követés funkció (follow)

  app.get(
    "/retweet/:tweetid",
    authMW(),
    prevTweetMW(objRepo),
    renderMW("forms/retweet"),
  ); //Retweet oldal betöltése
  app.post("/retweet/:tweetid", authMW(), createRetweetMW(objRepo));

  app.get(
    "/delmyacc",
    authMW(),
    getLoggedInUserMW(objRepo),
    delmyaccMW(objRepo),
    logoutMW(),
  ); //Saját fiók törlése

  app.get(
    "/users/:userid",
    changePublicTweetsButtonValueMW(objRepo),
    getUsersListMW(objRepo),
    renderMW("userlist", objRepo),
  );

  app.get("/upload", authMW(), renderMW("forms/upload", objRepo)); //A képfeltöltő oldalra ugrik a program.
  app.post(
    "/upload",
    authMW(),
    uploadMW.single("file"),
    createPictureMW(objRepo),
  ); //Egy kép feltöltése.
  app.get(
    "/delpic/:picture",
    authMW(),
    getLoggedInUserMW(objRepo),
    deletePictureMW(objRepo),
  ); //Egy kép törlése.

  app.get("/users", getUsersListMW(objRepo), renderMW("userlist", objRepo)); //A publikus tweetek oldalának betöltése.

  app.get(
    "/",
    resetVariableMW(objRepo),
    getUsersListMW(objRepo),
    renderMW("index", objRepo),
  ); //Üdvözlő oldal betöltése
  app.post("/", loginMW(objRepo)); //Bejelentkezési adatok beküldése
};
