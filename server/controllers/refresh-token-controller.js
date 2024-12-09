// @ts-nocheck
import {db} from '../db.js';
import jwt from 'jsonwebtoken';

const getNewTokenGoogle = async(token) => {
  const formData = {
    client_id: process.env.VITE_GOOGLE_CLIENT_ID_TWO,
    client_secret: process.env.VITE_GOOGLE_CLIENT_SECRET_TWO,
    redirect_uri: process.env.VITE_GOOGLE_REDIRECT_URI_TWO_SERVER,
    grant_type: "refresh_token",
    refresh_token: token
  }

  const urlSearchPar = new URLSearchParams(formData);
  
  const accessTokenGoogle = await fetch(process.env.VITE_GOOGLE_REFRESH_TOKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: urlSearchPar
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      return {message: 'error', data: data.error}
    }
    const {access_token} = data
    return {message: 'ok', data: {access_token}}
  })
  .catch(err => {
    return {message: "Не авторизован", data: ''}
  })

  return accessTokenGoogle
}

const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.SECRET_KEY_REFRESH);
    return userData;
  } catch (error) {
    return null;
  }
}

export const newtokens = async(req, res) => {
  const {refresh_token} = req.cookies;
  if (!refresh_token) {
    return res.status(401).json({message: 'Не авторизован'})
  }

  const userData = validateRefreshToken(refresh_token);

  if (!userData) {
    return res.status(401).json({message: 'Не авторизован'})
  }

  const q3 = "SELECT * FROM refresh WHERE `userid`=?"

  db.query(q3, [userData.id], (err, refreshtokendata) => {
    if (err) return res.status(500).json(err);
    if (refreshtokendata.length === 0) {
      tokenFromDb = null;
      tokenFromDb = refreshToken
    }
  })
}
