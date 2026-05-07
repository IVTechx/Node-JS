import fs from "fs/promises";

function transform(text) {
  let result = text.toUpperCase();
  result += ".";
  return result;
}

(async () => {
  try {
    const text = await fs.readFile("lorem.txt", "utf-8");
    let chunk = text.split(".");
    console.log(chunk);
    for(const sentence of chunk){
        let newChunk = transform(sentence);
            await fs.appendFile("result.txt", newChunk);
            console.log(newChunk);
    }
  } catch (err) {
    console.log(err);
  }
})();
