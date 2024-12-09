// @ts-nocheck
import { db } from "../db.js";
export const googlelogout = async(req, res) => {
  try {
    const {refresh_token} = req.cookies;
    if (!refresh_token) return res.status(401).json('Not authenticated!');
    
      const q4 = "DELETE FROM refresh WHERE `token`=?";

      db.query(q4, [refresh_token], (err, data) => {
        if (err) return res.status(500).json(err)
        if (data) {
          res.clearCookie('refresh_token', {
            sameSite: 'none',
            secure: true
          })
          res.status(200).json('Вы вышли из аккаунта!')
        }
      }) 

  } catch (error) {
    console.log(error)
  }
}
