export const deleteTweetMW = (objRepo) => {
  const { tweetModel, saveDB } = objRepo;

  return (req, res, next) => {
    const tweet = tweetModel.findOne({
      id: req.params.tweetid,
    });

    tweetModel.remove(tweet);

    return saveDB((err) => {
      if (err) {
        return next(err);
      }

      return res.redirect("/profile");
    });
  };
};
  