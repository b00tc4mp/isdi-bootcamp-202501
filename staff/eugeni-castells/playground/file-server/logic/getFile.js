const fs = require("fs");

getFile = (uuid) => {
  //TODO validate input

  const json = fs.readFileSync("data/files.json", "utf8");

  const files = JSON.parse(json);

  const file = files.find((file) => file.uuid === uuid);

  if (!file) throw new Error("File not found");

  const { filename, path } = file;

  const content = fs.readFileSync(path, "utf-8");

  return {
    filename,
    path,
    content,
  };
};

module.exports = getFile;
