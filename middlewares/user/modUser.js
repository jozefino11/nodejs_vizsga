export const modUserMW = (objRepo, whichField) => {
    const { userModel, saveDB, uuidv4 } = objRepo;
  
    return (req, res, next) => {
      const user = userModel.findOne({
        secret: req.params.secret,
      });
  
      if (!user) {
        return res.redirect("/");
      }
  
      user[whichField] = req.body[whichField];
      res.locals.resetPasswordSuccess = true;
      return saveDB(next);
    };
  };
  