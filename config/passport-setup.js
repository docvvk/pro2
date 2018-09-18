var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var keys = require("./keys");
var cookieSession = require("cookie-session");
var db = require("../models/index");
var User = require("../models/user");
var env = require('dotenv').load();


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.User.findOne({
        'id': id
    }).then((user) => {
        if (user == null) {
            done(new Error('Wrong user id.'))
        }
        done(null, user)
    });
});

passport.use(
    new GoogleStrategy({
    //options for the google strategy
    clientID: process.env.GOOGLE_OAUTH_TEST_APP_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_TEST_APP_CLIENT_SECRET,
    callbackURL: "https://cryptic-badlands-31521.herokuapp.com/auth/google/redirect"
}, (accessToken, refreshToken, profile, done) => {
    //passport callback function
    console.log("p cb f ")
    // console.log(profile);

    db.User.findOne({
        where: {
            googleId: profile.id
        }
    }).then(currentUser => {
        if(currentUser) {
            //user already exists in database
            console.log(`User with Username: ${currentUser.username} is already there!`);
            done(null, currentUser)
        } else {
            //create user in users table in budget database
            db.User.create({
                username: profile.displayName,
                googleId: profile.id,
                password: "password",
                thumbnail: profile._json.image.url
            }).then(newUser => {
                console.log(`New User with Username: ${newUser.username} and GoogleID: ${newUser.googleId} Created !`)
                done(null, newUser);
            });        
        }
    })
})
)





