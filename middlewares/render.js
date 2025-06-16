export const renderMW = (templateFile, objRepo) => {
    return (req, res, next) => {
      res.render(templateFile, res.locals);
      return next()
    };
  };
  