# Google oAuth 


## oAuth 2.0

The Google OAuth 2.0 authentication strategy authenticates users using a Google account and OAuth 2.0 tokens. The strategy requires a `verify` callback, which accepts these credentials and calls `done` providing a user, as well as `options` specifying a client ID, client secret, and callback URL.


#### Configuration

```sh
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


//  Use the GoogleStrategy within Passport.
//  Strategies in Passport require a `verify` function, which accept
//  credentials (in this case, an accessToken, refreshToken, and Google
//  profile), and invoke a callback with a user object.


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));
```

#### Routes

Use `passport.authenticate()`, specifying the 'google' strategy, to authenticate requests. Authentication with Google requires an extra `scope` parameter.

```sh
//  GET /auth/google
//  Use passport.authenticate() as route middleware to authenticate the
//  request.  The first step in Google authentication will involve
//  redirecting the user to google.com.  After authorization, Google
//  will redirect the user back to this application at /auth/google/callback


app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


//  GET /auth/google/callback
//  Use passport.authenticate() as route middleware to authenticate the
//  request.  If authentication fails, the user will be redirected back to the
//  login page.  Otherwise, the primary route function function will be called,
//  which, in this example, will redirect the user to the home page.

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
```

#### Link

A link or button can be placed on a web page, allowing one-click sign in with Google.

```sh
    <a href="/auth/google">Sign In with Google</a>
```