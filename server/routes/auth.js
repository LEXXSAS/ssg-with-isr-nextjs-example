import express from 'express';
import passport from 'passport';
import isLoggedIn from '../middlewares/isloggedin.js';

const router = express.Router();

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure from login failed'
  })
})

router.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.status(200).json('Вы вышли из аккаунта гугл!')
})

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: process.env.CLIENT_REDIRECT_URL,
  failureRedirect: '/login/failed'
})
);

router.get('/login/success', isLoggedIn, (req, res) => {
  res.status(200).json({
    username: req.user.name.givenName,
    success: true,
    message: 'successfully'
  })
});

export default router;
