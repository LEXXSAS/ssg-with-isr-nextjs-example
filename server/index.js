// @ts-nocheck
import express from "express";
import cors from "cors"; 
import 'dotenv/config'
import cookieParser from "cookie-parser";
import fileRoutes from './routes/file.js';
import dataRoutes from './routes/data.js';
import fileUpload from 'express-fileupload'
import cookieSession from "cookie-session";
import authTwoRoute from './routes/authtwo.js';
import dumpRoute from './routes/getdump.js';

const app = express();
const PORT = process.env.SERVER_PORT || 8765;


app.use(cookieSession(
  {
    name: 'session',
    keys: ['random_word'],
    maxAge: 15 * 60 * 1000, // 15 minutes
    sameSite: "strict"
  }
));

app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static('static'))
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));

app.use('/getdump', dumpRoute);
app.use('/authtwo', authTwoRoute);
app.use('/api/data', dataRoutes);
app.use('/api/upload', fileRoutes);
app.use(function(err, req, res, next) {
  if (err) {
    res.redirect('http://localhost:5173/logintwo')
  }
});

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`)
})
