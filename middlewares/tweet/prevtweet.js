export const prevTweetMW = (objRepo) => {
    const { tweetModel } = objRepo;
  
    return (req, res, next) => {
      const tweet = tweetModel.findOne({
        id: req.params.tweetid,
      });
  
      res.locals.tweet = tweet;
      return next();
    };
  };
  