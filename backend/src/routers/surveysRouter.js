import { Router } from 'express';
import { checkAuth } from '../checkAuth.js';
import { surveysController } from '../controllers/surveysController.js';

export const surveysRouter = Router();

surveysRouter.post('/', checkAuth, surveysController.addNewSurvey);
