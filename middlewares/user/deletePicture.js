export const deletePictureMW = (objRepo) => {
  const { saveDB } = objRepo;

  return (req, res, next) => {
    const picture = req.params.picture;

    const user = res.locals.user;
    user.mypictures = user.mypictures.filter((e) => e !== picture);

    return saveDB((err) => {
      if (err) {
        return next(err);
      }

      return res.redirect("/profile");
    });
  };
};