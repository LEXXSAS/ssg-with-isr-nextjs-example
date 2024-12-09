function isLoggedIn(req, res, next) {
  req.user ? next() : res.status(200).json({ 
    username: '',
    success: false,
    message: 'failure'
  });
}

export default isLoggedIn;
