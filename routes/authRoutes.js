var router = require("express").Router();
var path = require("path");
var passport = require("passport");

//auth login
router.get("/login", function(req, res) {
  res.render("../views/login.ejs", { user: req.user });
  //   res.sendFile(path.join(__dirname, "../public/index.html"));

  // res.render("../views/index.ejs", { user: req.user });
});

//auth logout
var logout = function() {
  return function(req, res, next) {
    req.logout();
    delete req.session;
    next();
  }
}

router.get("/logout", function(req, res) {
  //handle with passport
  console.log("logged out");
  res.redirect("/");
});

//auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

//callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), function(
  req,
  res
) {
  // res.send(req.user);
  res.redirect("/profile");
});
module.exports = router;
