const authMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log("Im from authmiddleware");
      return next();
    }
    res.status(401).json({ msg: 'Unauthorized' });
  };
  
export default authMiddleware;
  