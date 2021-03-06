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
// router.get("/logout", function(req, res) {
//   //handle with passport
//   req.logout();
//   req.session.destroy();
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// });

// router.get('/logout', function (req, res){
//   req.session.destroy(function (err) {
//     res.redirect('/'); //Inside a callback… bulletproof!
//   });
// });

router.get('/logout', function (req, res) { 
  req.logOut(); // remove all session data 
  req.session = null; 
  res.redirect('/'); 
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
