import * as fs from 'fs';

export function updateDB(content) {
  fs.writeFile('./src/DB/db.js', content, () => {
    return;
  });
}
