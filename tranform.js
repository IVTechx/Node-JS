import fs from "fs";
import { Transform, pipeline } from "stream";

function copyAndTransform(source, destination) {
  const stats = fs.statSync(source);
  const totalSize = stats.size;
  let bytesRead = 0;

  const readStream = fs.createReadStream(source, { encoding: "utf8", highWaterMark: 1024 });
  const writeStream = fs.createWriteStream(destination);

  const uppercaseTransform = new Transform({
    transform(chunk, encoding, callback) {
      bytesRead += chunk.length;
      const percentage = ((bytesRead / totalSize) * 100).toFixed(2);
      console.log(`    Progress: ${percentage}%`);
      const result = chunk.toString().toUpperCase();
      callback(null, result);
    },
  });

  pipeline(readStream, uppercaseTransform, writeStream, (err) => {
    if (err) {
      console.error("\n❌ Transformation failed:", err.message);
    } else {
      console.log(`\n✅ Transformation Complete!
   Saved into ${destination}`);
    }
  });
}

copyAndTransform("./lorem.txt", "./result.txt");
