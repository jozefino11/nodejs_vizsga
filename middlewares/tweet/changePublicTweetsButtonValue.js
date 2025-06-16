export const changePublicTweetsButtonValueMW = (objRepo) => {
  const { tweetModel, userModel, saveDB } = objRepo;

  return (req, res, next) => {
    const userid = req.params.userid;

    const user = userModel.findOne({
      id: userid,
    });

    user.publictweetsbutton = !user.publictweetsbutton;
    userModel.update(user);

    return saveDB((err) => {
      if (err) {
        return next(err);
      }

      return next();
    });
  };
};