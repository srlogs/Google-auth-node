const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth');
const dotenv = require('dotenv');
const URL = "http://localhost:3000/auth/google/callback";

dotenv.config();
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

app.get('/', (req, res) => {
    res.render('pages/auth');
});

app.get('/success', (req, res) => {
    res.send(userProfile);
});

app.get('/error', (req, res) => {
    res.send("error logging in");
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/error'
}),
    (req, res) => {
        res.redirect('/success');
    }
);

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: URL
},
    (accessToken, refreshToken, profile, done) => {
        userProfile = profile;
        return done(null, userProfile);
    }
));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('App is listening on port ' + port));