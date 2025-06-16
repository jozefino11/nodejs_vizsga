export const createPictureMW = (objRepo) => {
  const { userModel, saveDB } = objRepo;

  return (req, res, next) => {
    if (typeof req.file === "undefined") {
      return next();
    }

    const user = userModel.findOne({
      id: req.session.userid,
    });
    const picture = req.file.filename;
    user.mypictures.push(picture);

    return saveDB((err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/home");
    });
  };
};