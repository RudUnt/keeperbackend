import passport from "passport";
import { getUserByEmail } from "../models/user.js";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import { Strategy as JwtStrategy, ExtractJwt} from "passport-jwt";


passport.use(
  "user",
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await getUserByEmail(username);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        // userName = user.fullname;
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, result) => {
          if (err) {
            //Error with password check
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (result) {
              //Passed password check
              return cb(null, user);
            } else {
              //Did not pass password check
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      return cb(err);
    }
  })
);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "MayBeIsMySecret"
};

passport.use(new JwtStrategy(opts, async(jwtPayload, done) => {
  // Perform database lookup or other logic to find the user based on the JWT payload
  const user = await getUserByEmail(jwtPayload.userId);
  if (!user) {
    return done(null, false);
  }
  return done(null, user);
}));

//for serialize
passport.serializeUser((user, cb) => {
  cb(null, user);
});
// for deserialize
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// end

export default passport;
