import crypto from 'crypto';
import { surveysValidationSchema } from '../validators/surveysValidator.js';
import { DB } from '../DB/db.js';
import { getUserIdFromToken, updateDB } from '../helper.js';

async function addNewSurvey(req, res) {
  try {
    const { body } = req;
    const token = req.headers.authorization.split(' ')[1];
    const userId = getUserIdFromToken(token);
    let surveyData = {};
    try {
      surveyData = await surveysValidationSchema.validate(body, {
        abortEarly: false,
      });
    } catch (error) {
      const errorObject = error.inner.reduce((acc, el) => {
        typeof el.errors[0] !== 'object'
          ? acc.push(el.errors[0])
          : acc.push(el.type);
        return acc;
      }, []);
      return res.status(400).json(errorObject);
    }
    const newSurvey = {
      title: surveyData.surveyTitle,
      author: userId,
      surveyType: surveyData.surveyType,
      surveyId: `${surveyData.surveyType}${crypto.randomUUID()}`,
      done: [],
      options: surveyData.options.map((option) => ({
        ...option,
        optionId: crypto.randomUUID(),
        checked: surveyData.surveyType === 'UC' ? '' : [],
      })),
    };
    DB.surveys.push(newSurvey);
    const newContent = `export const DB = ${JSON.stringify(DB)}`;
    updateDB(newContent);
    return res.status(201).json(newSurvey);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export const surveysController = {
  addNewSurvey,
};
