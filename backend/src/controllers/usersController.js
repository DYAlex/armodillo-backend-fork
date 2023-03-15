import crypto from 'crypto';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { usersValidationSchema } from '../validators/usersValidator.js';
import { DB } from '../DB/db.js';
import { updateDB } from '../helper.js';

dotenv.config();

function getAllUsers(req, res) {
  try {
    return res.json(
      DB.users.map((user) => {
        const { password, ...noPasswordUser } = user;
        return noPasswordUser;
      })
    );
  } catch (error) {
    return res.sendStatus(500);
  }
}

function getUserByID(req, res) {
  try {
    const userID = req.params.userID;
    const currentUser = DB.users.find((user) => user.id === userID);
    if (currentUser) {
      const { password, ...noPasswordUser } = currentUser;
      return res.json(noPasswordUser);
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
    const hashPassword = await bcrypt.hash(
      body.password,
      +process.env.BCRYPT_SALT_ROUND
    );
    const newUser = {
      name: userData.name,
      email: userData.email,
      id: crypto.randomUUID(),
      password: hashPassword,
    };
    DB.users.push(newUser);
    const { password, ...noPasswordUser } = newUser;
    const newContent = `export const DB = ${JSON.stringify(DB)}`;
    updateDB(newContent);
    return res.status(201).json(noPasswordUser);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export const usersController = {
  getAllUsers,
  getUserByID,
  addNewUser,
};
