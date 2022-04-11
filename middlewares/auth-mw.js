const createError = require('http-errors');

const isUser = (req, res, next) => {
  if(req.user.lev >= 2) next();
  else next(createError(401, '인증되지 않았습니다.'))
}

const isAdmin = (req, res, next) => {
if(req.user.lev >= 3) next();
  else next(createError(401, '인증되지 않았습니다.'))
}

const isGuest = (req, res, next) => {
if(!req.user) next();
  else next(createError(401, '회원은 접근할 수 없습니다.'))
}

module.exports = { isUser, isAdmin, isGuest }