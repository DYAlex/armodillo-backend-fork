import { Router } from 'express';
import { usersController } from '../controllers/usersController.js';

export const usersRouter = Router();

usersRouter.get('/', usersController.getAllUsers);

usersRouter.get('/:userID', usersController.getUserByID);

usersRouter.post('/', usersController.addNewUser);

usersRouter.post('/signin', usersController.signIn);

usersRouter.delete('/', usersController.signOut);
