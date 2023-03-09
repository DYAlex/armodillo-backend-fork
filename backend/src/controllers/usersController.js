import crypto from 'crypto';
import { usersValidationSchema } from '../validators/usersValidator.js';
import { DB } from '../DB/db.js';
import * as fs from 'fs';

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

const addNewUser = async (req, res) => {
  try {
    const { body } = req;
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
    const newUser = {
      ...userData,
      id: crypto.randomUUID(),
    };
    DB.users.push(newUser);
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
};

export const usersController = {
  getAllUsers,
  getUserByID,
  addNewUser,
};
