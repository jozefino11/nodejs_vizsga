export const getLoggedInUserMW = (objRepo) => {
    const { userModel, tweetModel } = objRepo;
  
    return (req, res, next) => {
      const user = userModel.findOne({
        id: req.session.userid,
      });
  
      if (!user) {
        return next(new Error("User from session doesnt exist!"));
      }
  
      user.mytweets = tweetModel.find({
        user_id: req.session.userid,
      });
  
      res.locals.user = user;
      res.locals.userid=user.id;
      res.locals.myfollowedusers=user.myFollowedUsers;
      return next();
    };
  };
  