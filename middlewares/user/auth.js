export const authMW = () => {
    return (req, res, next) => {
      if (typeof req.session.userid === "undefined") {
        return res.redirect("/");
      }
  
      return next();
    };
  };
  