import express from "express";
import { registerUser } from "../Controllers/authControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
import passport from "../config/passport.js";
import {
  setNote,
  getNotesByUserID,
  deleteNoteByUserIDAndNoteID,
  getNotesByIDAndDate,
} from "../models/note.js";
import jwt from "jsonwebtoken";
// import { userID } from "../../client/src/index.js";

const router = express.Router();

router.post("/register", (req, res) => {
  registerUser(req, res);
});

router.post(
  "/login",
  passport.authenticate("user", { session: false }),
  (req, res) => {
    const { user_id, email, username } = req.user;
    const token = jwt.sign({ userId: email }, "MayBeIsMySecret", {
      expiresIn: "1h",
    });
    const response = {
      user_id: user_id,
      email: email,
      username: username,
    };
    res.json({ user: response, token: token });
  }
);

// // Protected route example
// router.get("/protected", authMiddleware, (req, res) => {
//   res.json({ msg: "This is a protected route", user: req.user });
// });

// Protected route example
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "Authenticated successfully" });
  }
);

router.post(
  "/protected/note/get",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const notes = await getNotesByUserID(req.body.user_id);
    // console.log(notes.rows);
    res.json({ msg: "This is a protected route", user: notes.rows });
  }
);

router.post(
  "/protected/note/set",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const result = await setNote(req.body);
    res.json({ msg: "This is a protected route", user: result.rows });
  }
);

router.post(
  "/protected/note/delete",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const result = await deleteNoteByUserIDAndNoteID(req.body);
    res.json({ msg: "This is a protected route", user: result.rows });
  }
);

router.post(
  "/protected/note/getnotebydate",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // console.log(req.body);
    const result = await getNotesByIDAndDate(req.body);
    // console.log(result);
    res.json({ msg: "This is a protected route", user: result.rows });
  }
);

// router.post("/protected/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.json({ msg: "Logged out" });
//   });
// });

export default router;
