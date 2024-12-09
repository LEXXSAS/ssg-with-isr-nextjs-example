// @ts-nocheck
import { db } from "../db.js";
import path from 'path';
import { fileURLToPath } from 'url';
import txtJson from "../functions/txt-json/index.js";
import fs from 'fs';
import iconvlite from 'iconv-lite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getWord(word, a1) {
  return a1.includes(word)
}

const comparisonFilesName = (pathToDir, fileName) => {
  const allFiles = fs.readdirSync(pathToDir);
  const ourWord =  getWord(fileName, allFiles);
  return ourWord
}

const fileUploadFunc = async(file, fileTxt) => {
  const pathToDir = path.join(__dirname, '../static/files/')
  const fileCompareResult = comparisonFilesName(pathToDir, fileTxt)
  if (fileCompareResult) {
    return ({message: 'Файл с таким же именем уже существует!'});
  } else {
    return new Promise((resolve, reject) => {
      file.mv(pathToDir + fileTxt, {overwrite: true})
        .then(() => {
          const fileJsonData = txtJson.readFiles(pathToDir + fileTxt);
          fileJsonData
          .then(data => {

            const obj = {...data}
            const q = "INSERT INTO notes(`title`, `author`, `body`, `priority`) VALUES (?)"

            const values = [
              obj[0].title,
              obj[0].author,
              obj[0].body,
              obj[0].priority
            ]

            db.query(q, [values], (err, data) => {
              if (err) throw err
            })

            return resolve({message: `Файл был успешно загружен!`, data: data});
          })
          .catch(err => {
            reject({message: 'Ошибка конвертации файла'});
          })
        })
        .catch(err => {
          return reject({message: 'Ошибка загрузки файла'});
        })
    })
  }

}

class FileController {
  async uploadFile(req, res) {
    try {
      const win = iconvlite.encode(req.files?.file.name, 'ISO-8859-1');
      const str = iconvlite.decode(win, 'utf-8');
      let decodeFileName = str.toString();
        const file = req.files?.file
        const fileSizeLimit = 10485760;
        const fileSizeInBytes = file.size;
        if (!file) {
          return res.status(400).json({message: 'Файл не выбран!'})
        }
        else if (file === null || file === undefined || file === '') {
          return res.status(400).json({message: 'Файл не выбран!'})
        }
        else if (file.mimetype !== 'text/plain') {
          return res.status(400).json({message: 'Файл должен быть в формате txt!'})
        }
        else if (fileSizeInBytes > fileSizeLimit) {
          return res.status(400).json({message: 'Файл превышает лимит в 10 МБ!'})
        }
        let newFileName;
        newFileName = decodeFileName
        // newFileName = file.name
        // newFileName = Date.now() + '_' + file.name
        // newFileName = newFileName.replaceAll(' ', '')
        const fileUploadMessage = await fileUploadFunc(file, newFileName)
        return res.status(200).json({filename: newFileName, message: fileUploadMessage.message, data: fileUploadMessage.data})
    } catch (error) {
      return res.status(400).json(error.message)
    }
  }
}

export default new FileController()
