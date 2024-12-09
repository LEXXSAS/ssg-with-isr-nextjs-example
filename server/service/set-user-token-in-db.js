// @ts-nocheck
import {db} from '../db.js';;
import jwt from 'jsonwebtoken';

export const login = (req, res) => {
  const refresh_token = res.locals.accessData.data.refresh_token || null
  const access_token = res.locals.accessData.data.access_token || null
  const userdata = res.locals.userInfo || null
  const userid = res.locals.userid || null
  const message = res.locals.message || ''
  const messagetwo = res.locals.accessData.message || ''

  // let user_id = userid;
  let user_agent = req.get('User-Agent');
  let user_name = userdata.name;
  let user_email = userdata.email;
  let user_password = null;
  let user_img = userdata.picture;
  let user_active = 'true';

  // res.locals.useragent = req.get('User-Agent');
  // if (res.locals.userInfo) {
  //   console.log('res.locals.userInfo => ', res.locals.userInfo)
  // }

  const q = "SELECT * FROM users WHERE username=?";

  db.query(q, [user_name], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      
      const q1 = "INSERT INTO users(`username`, `email`, `password`, `img`, `active`, `agent`) VALUES (?)"

      const values = [
        user_name,
        user_email,
        user_password,
        user_img,
        user_active,
        user_agent
      ]

      db.query(q1, [values], (err, datatwo) => {
        if (err) return res.status(500).json(err);

        const refreshToken = jwt.sign({id: datatwo.insertId}, process.env.SECRET_KEY_REFRESH, {expiresIn: process.env.GLOBAL_EXPIRES_IN_REFRESH_TOKEN})
        const accessToken = jwt.sign({id: datatwo.insertId}, process.env.SECRET_KEY, {expiresIn: process.env.GLOBAL_EXPIRES_IN_ACCESS_TOKEN});

        const q2 = "INSERT INTO refresh(`token`, `userid`) VALUES (?)"

        const valueswithtone = [
          refreshToken,
          datatwo.insertId
        ]

        db.query(q2, [valueswithtone], (err, refreshtokendata) => {
          if (err) return res.status(500).json(err);
        })

        res.cookie('refresh_token', refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: true
        })
        res.cookie('access_token', accessToken, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: true
        })
        res.redirect(process.env.VITE_GOOGLE_REDIRECT_URI_TWO)
      })
      }
      else {
        const q3 = "SELECT * FROM refresh WHERE `userid`=?"

        const userInfo = data;
        
        let tokenFromDb = null;
        const refreshToken = jwt.sign({id: userInfo[0].id}, process.env.SECRET_KEY_REFRESH, {expiresIn: process.env.GLOBAL_EXPIRES_IN_REFRESH_TOKEN})
        const accessToken = jwt.sign({id: userInfo[0].id}, process.env.SECRET_KEY, {expiresIn: process.env.GLOBAL_EXPIRES_IN_ACCESS_TOKEN});
    
        db.query(q3, [userInfo[0].id], (err, refreshtokendata) => {
          if (err) return res.status(500).json(err);
          if (refreshtokendata.length === 0) {
            tokenFromDb = null;
            tokenFromDb = refreshToken
          }
          else {
            tokenFromDb = null;
            tokenFromDb = refreshtokendata[0].token
            const q4 = "DELETE FROM refresh WHERE `userid` = ?";

            db.query(q4, [userInfo[0].id], (err, data) => {
              if (err) return res.status(500).json(err)
            }) 
          }
  
          const q5 = "INSERT INTO refresh(`token`, `userid`) VALUES (?)"
      
          const valuestwo = [
            tokenFromDb,
            userInfo[0].id
          ]
  
          db.query(q5, [valuestwo], (err, otherdata) => {
            if (err) return res.status(500).json(err);
          })
        })

        res.cookie('refresh_token', refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: true
        })
        res.cookie('access_token', accessToken, {
          maxAge: 15 * 60 * 1000,
          httpOnly: false,
          sameSite: true
        })
        // res.status(200).json(
        //   {
        //     accessToken: res.locals.accessData.data || null,
        //     userdata: res.locals.userInfo || null,
        //     message: res.locals.message || '',
        //     messagetwo: res.locals.accessData.message || '',
        //   }
        // )
        res.redirect(process.env.VITE_GOOGLE_REDIRECT_URI_TWO)
      }
 })
}


// res.cookie('access_token', accessToken, {
//   maxAge: 24 * 60 * 60 * 1000,
//   // maxAge: 15 * 60 * 1000, // 15 minutes
//   // maxAge: 2 * 60 * 1000, // 2 minutes
//   // maxAge: 60 * 1000, // 1 minute
//   httpOnly: false,
//   sameSite: true
// })
