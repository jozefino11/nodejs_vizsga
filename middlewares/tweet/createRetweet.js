export const createRetweetMW = (objRepo) => {
    const { tweetModel } = objRepo;
  
    return (req, res, next) => {
      const tweet = tweetModel.findOne({
        id: req.params.tweetid,
      });
  
      tweet.retweets.push(req.body.text);
      return res.redirect("/home");
    };
  };
  