import fs from 'fs';
import readline from 'node:readline';

function getFileExtension(filePath) {
  const parts = filePath.split('.').filter(Boolean);
  return parts.length > 1 ? parts.splice(1).join('.') : 'Расширение отстуствует';
}

class TxtToJson {
  async readFiles(filesDir) {
    if ((getFileExtension(filesDir) !== 'txt')) {
      throw new Error('формат не соответствует txt');
    }
    else {
      return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filesDir);
  
        stream.on('error', reject);
  
        const lineReader = readline.createInterface({
          input: stream,
          crlfDelay: Infinity
        });
  
        const aF = [];
  
        lineReader.on('line', line => {
          aF.push(line);
        });
  
        lineReader.on('close', () => {
          fs.writeFileSync('./static/files/simpledata.json', JSON.stringify(aF, null, 2), {encoding: 'utf8', flag: 'w'});
  
          let newObj = [{
            title: '',
            author: '',
            body: '',
            priority: 'low'
          }];
  
          newObj[0].title = aF[0];
          newObj[0].author = aF[1];
          newObj[0].body = aF[2];
  
          fs.writeFileSync('./static/files/data.json', JSON.stringify(newObj, null, 2), {encoding: 'utf8', flag: 'w'});
          return resolve(newObj)
        });
    });
    }
  }
}

export default new TxtToJson()
