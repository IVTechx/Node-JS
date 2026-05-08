import { mkdir, readdir, rename, stat } from "fs/promises";
import path from "path";

async function organizeFiles(dir) {
  try {
    const names = await readdir(dir);
    console.log(names);

    for (const name of names) {
      const oldPath = path.join(dir, name);
      const nameStat = await stat(oldPath);

      if (!nameStat.isFile()) continue;

      // const ext = path.extname(name).substring(1).toLowerCase();
      const ext = path.extname(name).substring(1).toLowerCase() || "others";

      const subFolder = path.join(dir, ext);
      await mkdir(subFolder, { recursive: true });

      const newPath = path.join(subFolder, name);
      await rename(oldPath, newPath);

      console.log(`Sorted ${name} -> ${ext}`);
    }
    console.log("!Succesfully organized!");
  } catch (err) {
    console.error("Organizing failed: ", err);
  }
}

organizeFiles("./Files");
