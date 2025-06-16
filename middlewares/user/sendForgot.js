export const sendForgotPwMW = (objRepo) => {
    const { userModel, uuidv4, saveDB, emailService } = objRepo;
  
    return (req, res, next) => {
      if (req.body.email === "undefined") {
        return next();
      }
  
      const user = userModel.findOne({
        email: req.body.email,
      });
  
      if (!user) {
        res.locals.errors = res.locals.errors || [];
        res.locals.errors.push("This email doesnt exist!");
        return next();
      }
  
      user.secret = uuidv4();
      userModel.update(user);
  
      emailService.sendEmail(
        user.email,
        "Remembered password",
        `Please use this link:http://localhost:6001/newpw/${user.secret}`,
      );
  
      res.locals.pwResetSuccess = true;
      return saveDB(next);
    };
  };
  