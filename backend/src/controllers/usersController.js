import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { usersValidationSchema } from '../validators/usersValidator.js';
import { DB } from '../DB/db.js';
import * as fs from 'fs';
import { sessions } from '../sessions.js';

const saltRounds = 10;
function getAllUsers(req, res) {
  try {
    return res.json(DB.users);
  } catch (error) {
    return res.sendStatus(500);
  }
}

function getUserByID(req, res) {
  try {
    const userID = req.params.userID;
    const currentUser = DB.users.find((user) => user.id === userID);
    if (currentUser) {
      return res.json(currentUser);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function addNewUser(req, res) {
  try {
    const { body } = req;
    if (DB.users.find((user) => user.email === body.email)) {
      return res.status(409).json('Пользователь с таким email уже существует');
    }
    let userData = {};
    try {
      userData = await usersValidationSchema.validate(body, {
        abortEarly: false,
      });
    } catch (error) {
      const errorObject = error.inner.reduce((acc, el) => {
        if (acc[el.path]) {
          typeof el.errors[0] !== 'object'
            ? (acc[el.path] = acc[el.path] + `, ${el.errors}`)
            : (acc[el.path] = acc[el.path] + `, ${el.type}`);
        } else {
          typeof el.errors[0] !== 'object'
            ? (acc[el.path] = el.errors[0])
            : (acc[el.path] = el.type);
        }
        return acc;
      }, {});
      return res.status(400).json(errorObject);
    }
    const hashPassword = await bcrypt.hash(body.password, saltRounds);
    const newUser = {
      name: userData.name,
      email: userData.email,
      id: crypto.randomUUID(),
    };
    DB.users.push(newUser);
    DB.passwords.push({
      email: userData.email,
      password: hashPassword,
    });
    const newContent = `export const DB = ${JSON.stringify(DB)}`;
    fs.writeFile('./src/DB/db.js', newContent, (errorWrite) => {
      if (errorWrite) {
        console.log(errorWrite);
        return;
      }
    });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;
  const currentUser = DB.passwords.find((user) => user.email === email);
  if (currentUser) {
    if (await bcrypt.compare(password, currentUser.password)) {
      const sid = crypto.randomUUID();
      sessions[sid] = email;
      res.cookie('sid', sid, {
        httpOnly: true,
        maxAge: 36e5,
      });
      const newContent = `export const sessions = ${JSON.stringify(sessions)}`;
      fs.writeFile('./src/sessions.js', newContent, (errorWrite) => {
        if (errorWrite) {
          console.log(errorWrite);
          return;
        }
      });
      return res.sendStatus(200);
    }
  }
  return res.status(401).json('Неверный email или пароль');
}

function signOut(req, res) {
  const sidFromUserCookie = req.cookies.sid;
  delete sessions[sidFromUserCookie];
  const newContent = `export const sessions = ${JSON.stringify(sessions)}`;
  fs.writeFile('./src/sessions.js', newContent, (errorWrite) => {
    if (errorWrite) {
      console.log(errorWrite);
      return;
    }
  });
  res.clearCookie('sid');
  res.sendStatus(200);
}

export const usersController = {
  getAllUsers,
  getUserByID,
  addNewUser,
  signIn,
  signOut,
};
