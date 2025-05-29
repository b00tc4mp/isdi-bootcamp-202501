import { writeFileSync, readFileSync } from 'fs';

export function readData(name) {
  const json = readFileSync(`data/${name}.json`, 'utf8');
  const collection=  JSON.parse(json);
  return collection;
}

export function writeData(name, data) {
  const json = JSON.stringify(data, null, 4);
  writeFileSync(`data/${name}.json`, json);
}