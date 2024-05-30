import { getUserByEmail, setUser } from "../models/user.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  const saltRounds = 10;

  const userForAdd = {
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const checkResult = await getUserByEmail(userForAdd.email);
    if (checkResult.rows.length > 0) {
      const error = "Email already exist, Please login!";
      res.status(200).json({ msg: error });
    } else {
      bcrypt.hash(userForAdd.password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          userForAdd.password = hash;
          const user = await setUser(userForAdd);
          if(user.rows.length > 0) {
            res.json({ user: user });
          }else {
            res.json({msg: "user not registered"});
          }  
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};


export { registerUser };
