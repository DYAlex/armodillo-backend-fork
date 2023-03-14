import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { DB } from './DB/db.js';
import { updateDB } from './helper.js';

dotenv.config();

function createAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: +process.env.JWT_ACCESS_TOKEN_LIFETIME_IN_SECONDS,
  });
}

function createRefreshToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: +process.env.JWT_REFRESH_TOKEN_LIFETIME_IN_SECONDS,
  });
}

const checkToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error(error.message);
  }
};

async function refresh(req) {
  const currentUser = DB.users.find(
    (user) => user.id === req.userId && user.refreshToken === req.userToken
    );
    console.log(currentUser);
  if (!currentUser) {
    throw new Error('401');
  }
  const accessToken = jwtCreator.createAccessToken({
    email: currentUser.email,
    id: currentUser.id,
  });
  const refreshToken = jwtCreator.createRefreshToken({
    email: currentUser.email,
    id: currentUser.id,
  });
  currentUser.refreshToken = refreshToken;
  currentUser.accessToken = accessToken;
  const newContent = `export const DB = ${JSON.stringify(DB)}`;
  updateDB(newContent);
  return {
    accessToken,
    refreshToken,
  };
}

export const jwtCreator = {
  createAccessToken,
  createRefreshToken,
  checkToken,
  refresh,
};
