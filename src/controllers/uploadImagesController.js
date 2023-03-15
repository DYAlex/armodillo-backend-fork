import { getMd5ImageName } from '../helpers/utils.js';
import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function uploadFile(req, res) {
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
          image.mv(__dirname + '../../uploads/' + md5ImageName);
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
}

async function getUploadedFile(req, res) {
    try {
        const filename = req.params.filename;
        res.sendFile(path.resolve(__dirname, '../uploads', filename));
      } catch (error) {
        return res.status(404).json('Файл с таким именем не найден')
      }
}

export const uploadImagesController = {
  uploadFile,
  getUploadedFile,
};
