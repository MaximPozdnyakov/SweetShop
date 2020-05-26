module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    // req.flash('error_msg', 'Please log in to view that resource');
    res.redirect("http://localhost:3000/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("http://localhost:3000");
  },
};
