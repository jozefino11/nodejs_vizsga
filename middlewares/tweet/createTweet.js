export const createTweetMW = (objRepo) => {
  const { tweetModel, userModel, uuidv4, saveDB } = objRepo;

  return (req, res, next) => {
    if (typeof req.body.text === "undefined") {
      return next();
    }

    const user = userModel.findOne({
      id: req.session.userid,
    });
    const tweet = tweetModel.insert({
      id: uuidv4(),
      user_id: req.session.userid,
      text: req.body.text,
      visibility: req.body.visibility,
      username: user.username,
      timestamp: Date.now(),
      retweets: [],
    });

    res.locals.tweet = tweet;
    user.mytweets.push(tweet);

    return saveDB((err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/home");
    });
  };
};

  