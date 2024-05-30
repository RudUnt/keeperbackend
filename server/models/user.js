import db from "../config/db.js";

async function getUserByEmail(email) {
    try {
        const user = await db.query("SELECT * FROM users WHERE email = $1",[email]);
        return user;
    } catch (err) {
        console.log(err);
    }
}

async function setUser(user) {
    try {
        const result = await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",[
            user.fullname, user.email, user.password
        ]);
        return result;
    } catch (err) {
        console.log(err);
    }
}

export {setUser, getUserByEmail};