import passport from "passport";
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

passport.use(
  new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    // scope: ["email", "profile"],
    // passReqToCallback: true
    // state: true
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile)
    // console.log('PASSPORT ROUTE ', accessToken)
    // if (accessToken) {
    //   done(null, profile)
    //   return res.status(200).json({accessToken: accessToken});
    // }
    // console.log(profile.displayName)

    // res.cookie('refresh_token', tokenFromDb, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: true})
    // return res.status(200).json({userdata: other, accessToken: accessToken});  
    // if (err) { return done(err) }
  }
));

passport.serializeUser(async(user, done) => {
  done(null,  {id: user.id, name: user.name });
  // console.log('SERIALIZE USER', {id: user.id, name: user.name })
  // done(null, user);
});

passport.deserializeUser(async(user, done) => {
  done(null, user);
});

export default passport
