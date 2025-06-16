export const getShowedUserTweetsMW = (objRepo) => {
    const { tweetModel } = objRepo;
  
    return (req, res, next) => {
      const userid = req.params.userid;
  
      const tweets = tweetModel.find({
        user_id: userid,
        visibility: "public",
      });
  
      res.locals.tweets = tweets;
      return next();
    };
  };
  