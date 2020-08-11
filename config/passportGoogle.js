const GoogleStrategy = require("passport-google-oauth2").Strategy;
const GoogleUser = require("../models/GoogleUser");

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                // options for google strategy
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK_URL,
            },
            (accessToken, refreshToken, profile, done) => {
                // check if user already exists in our own db
                GoogleUser.findOne({ googleId: profile.id }).then(
                    (currentUser) => {
                        if (currentUser) {
                            // already have this user
                            done(null, currentUser);
                        } else {
                            // if not, create user in our db
                            new GoogleUser({
                                googleId: profile.id,
                            })
                                .save()
                                .then((newUser) => {
                                    done(null, newUser);
                                });
                        }
                    }
                );
            }
        )
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        GoogleUser.findById(id).then((user) => {
            done(null, user);
        });
    });
};
