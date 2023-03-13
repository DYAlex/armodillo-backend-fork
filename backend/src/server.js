import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cors from 'cors';
import { checkAuth } from './checkAuth.js';
import { usersRouter } from './routers/usersRouter.js';
import cookieParser from 'cookie-parser';
import { authRouter } from './routers/authRouter.js';
import { surveysRouter } from './routers/surveysRouter.js';
import { surveysFilterRouter } from './routers/surveysFilterRouter.js';
import fileUpload from 'express-fileupload'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { getMd5ImageName } from './helpers/utils.js';

const PORT = 3005;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(fileUpload({
  limits: {
      fileSize: 10000000, // Ограничение на загрузку примерно 10MB
  },
  abortOnLimit: true,
}))
// Это роут для раздачи статического файла из папки public, в котором лежит форма для проверки загрузки файла. Раскомментировать для тестирования.
// app.use(express.static('public'));
app.use('/api/v1/users', usersRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1/surveys', surveysRouter);
app.use('/api/v1/surveysfilters', surveysFilterRouter);
//для перехода на защищенную страницу
app.get('/api/v1/secret', checkAuth, (req, res) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

app.get('/upload/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    res.sendFile(__dirname + '/uploads/' + filename);
  } catch (error) {
    return res.status(404).json('Файл с таким именем не найден')
  }
})

// Это роут для загрузки файлов картинок в папку uploads
app.post('/upload', async (req, res) => {
try {
  // Получаем файл, который был отправлен в наше поле "image"
  const { image } = req.files;
  // Если mimetype файла не соответствует image, то прерываем загрузку
  if (!/^image/.test(image.mimetype)) {
    console.log('Mimetype problem');
    return res.sendStatus(400);
  }
  const md5ImageName = getMd5ImageName(image)
  try {
    // Перемещаем загруженный файл в нашу папку upload под новым именем, соответствующим его md5 подписи, но с прежним расширением
    image.mv(__dirname + '/uploads/' + md5ImageName);
    // Все прошло успешно высылаем новое имя файла
  res.status(201).send(JSON.stringify(md5ImageName));
  } catch (error) {
    // Если картинки не предоставлено, то выходим
    console.log('Could not upload image', error);
    res.sendStatus(500);
  }
} catch (error) {
  console.log('No image found in upload data');
    return res.status(400).json('Не выбран файл для загрузки');
}
})

app.listen(PORT, () => {
  console.log('server is running');
});
