export const getUsersListMW = (objRepo) => {
  const { userModel } = objRepo;

  return (req, res, next) => {
    const allUsers = userModel.find();
    res.locals.allUsers = allUsers;

    return next();
  };
};

  