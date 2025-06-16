import loki from "lokijs";
let db = false;

export const initDb = (cb) => {
  console.log("init database");
  db = new loki("database.db");

  db.loadDatabase({}, (err) => {
    if (err) {
      return cb(err);
    }

    let tweetModel = db.getCollection("tweet");
    if (tweetModel === null) {
      tweetModel = db.addCollection("tweet", ["id", "user_id"]);
    }

    let userModel = db.getCollection("user");
    if (userModel === null) {
      userModel = db.addCollection("user", {
        indices: ["id", "email"],
        unique: ["email", "username"],
      });
    }

    db.saveDatabase((err) => {
      if (err) {
        return cb(err);
      }
      console.log("Saved database after init.");
      //console.log(tweetModel)
      //console.log(userModel)
      return cb(undefined, {
        tweetModel,
        userModel,
        saveDB: (cb) => {
          console.log("Saving DB...");
          db.saveDatabase(cb);
        },
      });
    });
  });
};


