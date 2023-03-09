import { sessions } from '../src/sessions.js';

export const checkAuth = (req, res, next) => {
  const sidFromUser = req.cookies.sid;
  if (sessions[sidFromUser]) {
    return next();
  }
  return res.status(401).json('Необходимо авторизоваться');
};
