import express from 'express';
import getAccessTokenMiddlewareForServerRedirect from '../middlewares/getaccesstoken-middleware.js';
import getUserInfoMiddleware from '../middlewares/getuserinfo-middleware.js';
import authMiddleware from '../middlewares/auth-middleware.js'
import { login } from '../service/set-user-token-in-db.js';
import { userinfo } from '../controllers/user-controller.js';
import { googlelogout } from '../controllers/logout-controller.js';

const router = express.Router();

router.get('/geturi',
(req, res) => {
  const VITE_GOOGLE_SCOPES = ["https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"]
  const urilink = `${process.env.VITE_GOOGLE_AUTH_URI}?redirect_uri=${process.env.VITE_GOOGLE_REDIRECT_URI_TWO_SERVER}&response_type=code&client_id=${process.env.VITE_GOOGLE_CLIENT_ID_TWO}&prompt=consent&access_type=offline&scope=${VITE_GOOGLE_SCOPES.join(' ')}`

  res.status(200).json({
    urilink: urilink
  })
})

router.get('/redirect',
getAccessTokenMiddlewareForServerRedirect,
getUserInfoMiddleware,
login
)

router.post('/googlerefreshandinfo', authMiddleware, userinfo)
router.post('/googlelogout', googlelogout)

export default router;
