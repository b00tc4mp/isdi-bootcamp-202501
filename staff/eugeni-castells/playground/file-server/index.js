const express = require("express");
const busboyExpress = require("express-busboy");

const logic = require("./logic/index.js");

const server = express();

busboyExpress.extend(server, {
  upload: true,
  path: "./files",
  allowedPath: /./,
});

server.post("/files", (req, res) => {
  try {
    const {
      file: { uuid, filename, file },
    } = req.files;

    logic.saveFile(uuid, filename, file);

    res.send("File uploaded");
  } catch (error) {
    console.error(error);

    res.status(500).send("Error uploading files");
  }
});

server.get("/files", (req, res) => {
  try {
    const files = logic.getFiles();

    const list = files.reduce((accum, file) => {
      return `${accum} ${file.filename} (${file.uuid})\n`;
    }, "");

    res.send(list);
  } catch (error) {
    console.error(error);

    res.status(500).send("Error retrieving the files");
  }
});

server.get("/files/:uuid", (req, res) => {
  try {
    const { uuid } = req.params;

    const file = logic.getFile(uuid);

    const content = `${file.filename}\n\n${file.content}`;

    res.send(content);
  } catch (error) {
    console.error(error);

    res.status(500).send("Error retrieving file");
  }
});

server.listen(2121, () => console.log("Server running on port 2121"));
