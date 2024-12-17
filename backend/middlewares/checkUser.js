module.exports = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'user')) {
      return next();
    } else {
      return res.status(403).json({ msg: 'Access denied: Users only' });
    }
  };