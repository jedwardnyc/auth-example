const router = require('express').Router();
// this is our strategy specific for Google from passport
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
const User = require('./db');

// We are using constant to pass in all of the credentials to 
// break up our strategy and make it more readable
const googleCredentials = {
  clientID: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  callbackURL: `YOUR_CALLBACK_URL`
}

// This is passport's magic callback function that does all our heavy auth lifting
const verificationCb = (token, refreshToken, profile, done) => {
  // This will set their default username to their firstname.lastname
  const info = {
    username: `${profile.emails[0].value.split('@')[0]}`
  };

  User.findOrCreate({
    where: { googleId: profile.id },
    defaults: info
  })
  .spread((user, created) => {
      // a googleId will be set on the new user which 
      // will be used in place of the the username
      done(null, user);
  })
  .catch(done);
}

// This middleware function uses the two constants that 
// we build above and passes them into the GoogleStrategy Class
passport.use(new GoogleStrategy(googleCredentials, verificationCb));

// This route needs to get called in order to start the passport process.
// Notice how it has 'google' as it's first argument, this is how you specify
// what strategy to use! 
// ( Notice that sesssions are set to false, if you want to utilze them you can remove this option )
router.get('/', passport.authenticate('google', { scope: 'email', session: false }))

// This route is called by the third party service that you are authenticating with
// this should be set as your callback URL in your settings for your specific auth service
// ( Same as above, sessions are set to false )
router.get('/callback', passport.authenticate('google', { session: false }), (req, res) => {
  // This callback func will give you a req.user obj to use
  // if you want the login to persist, you can tokenize parts of the user
  // and send it with this route to add to local storage 
  // or add it to your session you've created
  res.redirect(`users/${req.user.username}`)
})

// Don't forget to export so that the middleware can be used! 

module.exports = router;
