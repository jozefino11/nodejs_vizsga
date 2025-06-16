export const delmyaccMW = (objRepo) => {
    const { userModel, saveDB } = objRepo;
  
    return (req, res, next) => {
      userModel.remove(res.locals.user);
      return saveDB((err) => {
        if (err) {
          return next(err);
        }
  
        return next();
      });
    };
  };
  