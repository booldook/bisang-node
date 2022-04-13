const createError = require('http-errors');

const isUser = (req, res, next) => {
  if(req.session && req.session.user && req.session.user.grade >= 1) next();
  else next(createError(401, '인증되지 않았습니다.'))
}

const isAdmin = (req, res, next) => {
if(req.session && req.session.user && req.session.user.grade >= 2) next();
  else next(createError(401, '인증되지 않았습니다.'))
}

const isGuest = (req, res, next) => {
  if(req.session && req.session.user && req.session.user.idx) next(createError(401, '회원은 접근할 수 없습니다.'))
  else next()
}

module.exports = { isUser, isAdmin, isGuest }