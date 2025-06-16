export const modTweetMW = (objRepo) => {
    const { tweetModel, saveDB } = objRepo;
  
    return (req, res, next) => {
      const tweet = tweetModel.findOne({
        id: req.params.tweetid,
      });
  
      tweet.text = req.body.text;
      tweetModel.update(tweet);
  
      saveDB();
  
      res.redirect("/profile");
    };
  };
  