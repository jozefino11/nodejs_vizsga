export const getAllTweetsMW = (objRepo) => {
    const { tweetModel } = objRepo;
  
    return (req, res, next) => {
      const tweets = tweetModel.find();
      res.locals.tweets = tweets;
  
      tweets.sort(function (a, b) {
        return b.timestamp - a.timestamp;
      });
      return next();
    };
  };
  