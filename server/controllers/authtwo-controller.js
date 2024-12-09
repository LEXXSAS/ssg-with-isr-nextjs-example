// @ts-nocheck
import { db } from "../db.js";

export const googlelogin = (req, res) => {
  const q = "SELECT * FROM users WHERE username=?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json('Пользователь не найден!');

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

    if (!isPasswordCorrect) return res.status(400).json('Имя пользователя или пароль не верны');

    const q3 = "SELECT * FROM refresh WHERE `userid`=?"

    const userInfo = data;

    let tokenFromDb = null;
    const refreshToken = jwt.sign({id: userInfo[0].id}, process.env.SECRET_KEY_REFRESH, {expiresIn: "30d"})
    const accessToken = jwt.sign({id: userInfo[0].id}, process.env.SECRET_KEY,  {expiresIn: "4d"});

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
    const q2 = "INSERT INTO refresh(`token`, `userid`) VALUES (?)"

    const values = [
      tokenFromDb,
      userInfo[0].id
    ]

    db.query(q2, [values], (err, tokendata) => {
      if (err) return res.status(500).json(err);

    const {password, ...other} = data[0];

    res.cookie('refresh_token', tokenFromDb, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: true})
    return res.status(200).json({userdata: other, accessToken: accessToken});
  });
})
})
}
