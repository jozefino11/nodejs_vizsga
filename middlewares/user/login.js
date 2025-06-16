export const loginMW = (objRepo) => {
    const { userModel } = objRepo;
  
    return (req, res, next) => {
      if (
        typeof req.body.email === "undefined" ||
        typeof req.body.password === "undefined"
      ) {
        return next();
      }
  
      const user = userModel.findOne({
        email: req.body.email,
        password: req.body.password,
      });
  
      if (!user) {
        res.locals.errors = res.locals.errors || [];
        res.locals.errors.push("Wrong email or password!");
        return next();
      }
  
      req.session.userid = user.id;
    
      return req.session.save((err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/home");
      });
    };
  };
  


