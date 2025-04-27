const fs = require("fs");

const getFiles = () => {
  const json = fs.readFileSync("data/files.json", "utf-8");

  const files = JSON.parse(json);

  return files;
};

module.exports = getFiles;
