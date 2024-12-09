// @ts-nocheck
import { db } from "../db.js";
import jwt from 'jsonwebtoken';

export const gettoken = async(req, res) => {
  const {refresh_token} = req.cookies

  if (!refresh_token) return res.status(401).json('Not authenticated!');
 
  jwt.verify(refresh_token, process.env.SECRET_KEY_REFRESH, (err, userInfo) => {
    if (err) return res.status(403).json("Refresh Token is not valid");
 
    const q3 = "SELECT * FROM refresh WHERE `userid`=?"

    let tokenFromDb = null;
    const refreshToken = jwt.sign({id: userInfo.id}, process.env.SECRET_KEY_REFRESH, {expiresIn: "30d"})
    const accessToken = jwt.sign({id: userInfo.id}, process.env.SECRET_KEY, {expiresIn: "4d"});

    db.query(q3, [userInfo.id], (err, refreshtokendata) => {
      if (err) return res.status(500).json(err);
      if (refreshtokendata.length === 0) {
        tokenFromDb = null;
        tokenFromDb = refreshToken
      }
      else {
        tokenFromDb = null;
        tokenFromDb = refreshtokendata[0].token
        const q4 = "DELETE FROM refresh WHERE `userid` = ?";
        db.query(q4, [userInfo.id], (err, data) => {
          if (err) return res.status(500).json(err)
        }) 
      }   

    const q = "SELECT * FROM users WHERE `id`=?"

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json('Not authenticated!');

      const q2 = "INSERT INTO refresh(`token`, `userid`) VALUES (?)"

      const values = [
        tokenFromDb,
        userInfo.id
      ]

      db.query(q2, [values], (err, tokendata) => {
        if (err) return res.status(500).json(err);

      res.cookie('refresh_token', tokenFromDb, {maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: true})
      return res.json({userdata: '', accessToken: accessToken, message: 'ok'});
    })
    })
  })
  }
)
}
