const getUserInfoFromGoogle = async(token) => {
  const userInfoGoogle = await fetch(process.env.VITE_GOOGLE_USER_INFO_URI, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      return {message: 'error', data: data.error}
    }
    return {message: 'ok', data: data}
  })
  .catch(err => {
    return {message: "Не авторизован", data: ''}
  })

  return userInfoGoogle
}

const getUserInfoMiddleware = async(req, res, next) => {
  
  const tokenFromRes = res.locals.accessData.data.access_token
  const userInfoGoogle = await getUserInfoFromGoogle(tokenFromRes)

  if (userInfoGoogle.message === 'error' || userInfoGoogle.message === 'Не авторизован') {
    return next(new Error('Не авторизован'))
  }
  else (userInfoGoogle.message === 'ok')
  {
    const {message} = userInfoGoogle
    const {email, picture, name, id} = userInfoGoogle.data
    res.locals.userid = id
    res.locals.message = message
    res.locals.userInfo = {email, picture, name}
    next()
  }
}

export default getUserInfoMiddleware
