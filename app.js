import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config({ path: './config.env' });
import cors from 'cors';
import auth from './router/auth.js';
import bodyParser from "body-parser";

// const allowedOrigins = [
//     "https://testapp-tau-inky.vercel.app",
//     "https://testapp-stcstest70-gmailcom.vercel.app",
//     "https://testapp-git-main-stcstest70-gmailcom.vercel.app"
//   ];
  
//   app.use(cors({
//     origin: allowedOrigins,
//     credentials: true,
//   }));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});