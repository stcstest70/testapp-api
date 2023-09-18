import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config({ path: './config.env' });
import cors from 'cors';
import auth from './router/auth.js';
import bodyParser from "body-parser";

const allowedOrigins = [
    "https://testapp-tau-inky.vercel.app",
    "https://testapp-stcstest70-gmailcom.vercel.app",
    "https://testapp-git-main-stcstest70-gmailcom.vercel.app"
  ];

// Configure CORS middleware with the allowed origins and other options.
app.use(cors({
    origin: allowedOrigins,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Include credentials in the request (if needed).
    optionsSuccessStatus: 204, // Return a 204 status for preflight requests.
    allowedHeaders: 'Content-Type',
}));

// Use bodyParser middleware to handle URL-encoded and JSON request bodies.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});