export const resetVariableMW = (objRepo) => {
    const { userModel, saveDB } = objRepo;
  
    return (req, res, next) => {
      const allUsers = userModel.find();
  
      allUsers.forEach((user) => {
        user.publictweetsbutton = false;
        userModel.update(user);
      });
  
      return saveDB(next);
    };
  };
  