import { uuid } from "./uuid.js";

import { readFileSync, writeFileSync } from "fs";

export class Collection {
  constructor(name) {
    this.name = name;
  }
  getAll() {
    const json = readFileSync(`data/${this.name}.json`, "utf8");

    const collection = JSON.parse(json);

    return collection;
  }

  setAll(collection) {
    const json = JSON.stringify(collection);

    writeFileSync(`data/${this.name}.json`, json);
  }

  getById(id) {
    const json = readFileSync(`data/${this.name}.json`, "utf8");

    const collection = JSON.parse(json);

    const match = collection.find((item) => item.id === id) || null;

    return match;
  }

  insertOne(document) {
    let json = readFileSync(`data/${this.name}.json`, "utf8");

    const collection = JSON.parse(json);

    document.id = uuid();

    collection.push(document);

    json = JSON.stringify(collection);

    writeFileSync(`data/${this.name}.json`, json);
  }

  findOne(callback) {
    const json = readFileSync(`data/${this.name}.json`, "utf8");

    const collection = JSON.parse(json);

    for (let i = 0; i < collection.length; i++) {
      const document = collection[i];

      const match = callback(document);

      if (match) return document;
    }

    return null;
  }

  updateOne(condition, document) {
    let json = readFileSync(`data/${this.name}.json`, "utf8");

    const collection = JSON.parse(json);

    const index = collection.findIndex(condition);

    if (index >= 0) collection[index] = document;

    json = JSON.stringify(collection);

    writeFileSync(`data/${this.name}.json`, json);
  }

  deleteOne(condition) {
    let json = readFileSync(`data/${this.name}.json`, "utf8");

    const collection = JSON.parse(json);

    const index = collection.findIndex(condition);

    if (index > -1) collection.splice(index, 1);

    json = JSON.stringify(collection);

    writeFileSync(`data/${this.name}.json`, json);
  }
}
