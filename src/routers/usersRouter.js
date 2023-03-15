import { Router } from 'express';
import { checkAuth } from '../checkAuth.js';
import { usersController } from '../controllers/usersController.js';

export const usersRouter = Router();

usersRouter.get('/', usersController.getAllUsers);

usersRouter.get('/:userID', usersController.getUserByID);

usersRouter.post('/', usersController.addNewUser);
