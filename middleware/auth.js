const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied, Token not provided');
  try {
    const decode = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decode;
    next();
  } catch(ex) {
    res.status(401).send('Access Denied, Invalid token');
  }
}

module.exports = auth;
