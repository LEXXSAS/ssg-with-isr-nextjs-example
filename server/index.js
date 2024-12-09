// @ts-nocheck
import express from "express";
import cors from "cors"; 
import 'dotenv/config'
import cookieParser from "cookie-parser";
import fileRoutes from './routes/file.js';
import dataRoutes from './routes/data.js';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config'
import fileUpload from 'express-fileupload'
import cookieSession from "cookie-session";
import passportSetup from "./passport.js";
import passport from "passport";
import authRoute from './routes/auth.js';
import dumpRoute from './routes/getdump.js';

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

app.use(cookieSession(
  {
    name: 'session',
    keys: ['home'],
    // maxAge: 60 * 1000, // 1 min
    // maxAge: 24 * 60 * 60 * 1000, // 24 hours
    maxAge: 15 * 60 * 1000, // 15 minutes
    sameSite: "strict"
  }
));
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static('static'))
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, '../client/dist')));

// const arrayPath = ['/', '/login', '/upload'];

// app.get(arrayPath, function (req, res) {
//   res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
// });

app.use('/getdump', dumpRoute);
app.use('/auth', authRoute);
app.use('/api/data', dataRoutes);
app.use('/api/upload', fileRoutes);

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`)
})
