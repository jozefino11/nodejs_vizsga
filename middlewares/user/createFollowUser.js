export const createFollowUserMW = (objRepo) => {
  return (req, res, next) => {
    const { userModel, saveDB } = objRepo;

    const userid = req.params.userid;

    const user = userModel.findOne({
      id: req.session.userid,
    });
    const followedUserId = userid;
    user.myFollowedUsers.push(followedUserId);

    return saveDB((err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/profile");
    });
  };
};
