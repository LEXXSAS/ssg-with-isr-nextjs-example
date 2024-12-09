const getAccessTokenAndUserInfoGoogle = async(encodeCode) => {
  const decodeCodeFromLocation = decodeURIComponent(encodeCode);

  const formData = {
    client_id: process.env.VITE_GOOGLE_CLIENT_ID_TWO,
    client_secret: process.env.VITE_GOOGLE_CLIENT_SECRET_TWO,
    redirect_uri: process.env.VITE_GOOGLE_REDIRECT_URI_TWO_SERVER,
    grant_type: "authorization_code",
    code: decodeCodeFromLocation,
  }

  const urlSearchPar = new URLSearchParams(formData);
  
  const accessTokenGoogle = await fetch(process.env.VITE_GOOGLE_TOKEN_URI, {
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
    const {access_token, refresh_token} = data
    return {message: 'ok', data: {access_token, refresh_token}}
  })
  .catch(err => {
    return {message: "Не авторизован", data: ''}
  })

  return accessTokenGoogle
}

const getAccessTokenMiddlewareForServerRedirect = async(req, res, next) => {
  const { code } = req.query;
  if (!code) return res.status(401).json('No code!');

  const accessTokenGoogle = await getAccessTokenAndUserInfoGoogle(code)

  if (accessTokenGoogle.message === 'error' || accessTokenGoogle.message === 'Не авторизован') {
    return next(new Error('Не авторизован'))
  }
  else (accessTokenGoogle.message === 'ok')
  {
    res.locals.accessData = accessTokenGoogle
    next()
  }
}

export default getAccessTokenMiddlewareForServerRedirect
