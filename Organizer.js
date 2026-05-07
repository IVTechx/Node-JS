import { mkdir, readdir, rename} from 'fs/promises'; 
import path from 'path'

async function moveFile(oldPath, newPath) {
  try{
    await rename(oldPath, newPath);
    console.log(`Moved ${oldPath} to ${newPath} successfully. `);
  } catch (err) {
    console.error('Error moving file:', err);
  }
}

const allFiles = await readdir('./Files');
const folders = new Set();
for (const file of allFiles) {
const ext = path.extname(file).substring(1);
if(!ext)continue;

if(!folders.has(ext)){
  await mkdir(`./Files/${ext}`);
  folders.add(ext);
}
await moveFile(`./Files/${file}`, `./Files/${ext}/${file}`);
console.log(folders);
}
