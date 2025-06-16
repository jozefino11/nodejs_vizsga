export const regMW = (objRepo) => {
  const { userModel, uuidv4, saveDB } = objRepo;

  return (req, res, next) => {
    if (
      typeof req.body.email === "undefined" ||
      typeof req.body.password === "undefined" ||
      typeof req.body.username === "undefined"
    ) {
      return next();
    }

    try {
      userModel.insert({
        id: uuidv4(),
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        publictweetsbutton: false,
        mytweets: [],
        mypictures: [],
        myFollowedUsers: [],
        secret: false,
      });
    } catch (err) {
      return res.send("Foglalt email cím!!");
    }

    return saveDB(next);
  };
};
  