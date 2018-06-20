const router = require('express').Router();
// this is our strategy specific for Github from passport
const GithubStrategy = require('passport-github')
const passport = require('passport');
const User = require('./db');

// We are using constant to pass in all of the credentials to break up our strategy and make it more readable
const githubCredentials = {
  clientID: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  callbackURL: `YOUR_CALLBACK_URL`
}

// This is passport's magic callback function that does all our heavy auth lifting
const verificationCb = (token, refreshToken, profile, done) => {
  // This will set their default username to their github login
  const info = {
    username: `${profile.username}`
  };

  User.findOrCreate({
    where: { githubId: profile.id },
    defaults: info
  })
  .spread((user, created) => {
      // a githubId will be set on the new user
      done(null, user);
  })
  .catch(done);
}

// This is our authentication middleware
passport.use(new GithubStrategy(githubCredentials, verificationCb));

// This route needs to get called in order to start the passport process.
// ( Notice that sesssions are set to false, if you want to utilze them you can remove this option )
router.get('/', passport.authenticate('github', { session: false }))

// This route is called by the third party service that you are authenticating with
// this should be set as your callback URL in your settings for your specific auth service
// ( Same as above, sessions are set to false )
router.get('/callback', passport.authenticate('github', { session: false }), (req, res) => {
  // This callback func will give you a req.user obj to use if you want the login to persist, you can tokenize parts of the user
  // and send it with this route to add to local storage or add it to your session you've created
  res.redirect(`/users/${req.user.username}`)
})

// Don't forget to export so that the middleware can be used! 

module.exports = router;