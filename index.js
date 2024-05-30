// server/index.js
import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import db from "./server/config/db.js";
import authRoutes from "./server/routes/authRoutes.js";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { fileURLToPath } from 'url';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Specify the path to the .env file
const envPath = path.resolve(__dirname, '../.env'); // Adjust the path as needed

// Load the environment variables
dotenv.config({ path: envPath });

db.connect()
    .then(() => {
        console.log('Connection to PostgreSQL DB successful');
        return client.end(); // close the connection
    })
    .catch(err => {
        console.error('Connection to PostgreSQL DB failed', err.stack);
    });

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// cookies and sessions
// start
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //   maxAge: 1000 * 60
    // }
  })
);

app.use(passport.initialize());
app.use(passport.session());
// end


// const notes = [{
//   title: "Study",
//   content: "React Hooks"
// },
// {
//   title: "Shopping",
//   content: "Buy Milk, Buy Cookies, Buy Vegetables"
// }]

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
//   });
// }


app.use('/api', authRoutes);

// app.get('/api', (req, res) => {
//   res.send({myNotes: notes});
// });

// app.post('/api', (req, res) => {
//   res.send(notes);
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});