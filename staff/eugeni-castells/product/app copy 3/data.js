class Collection {
  constructor(name) {
    this.name = name;
  }
  getAll() {
    const collection = JSON.parse(localStorage[this.name] || "[]");

    return collection;
  }

  setAll(collection) {
    const json = JSON.stringify(collection);

    localStorage[this.name] = json;
  }

  getById(id) {
    const collection = JSON.parse(localStorage[this.name] || "[]");

    const match = collection.find((item) => item.id === id) || null;

    return match;
  }

  insertOne(document) {
    const collection = JSON.parse(localStorage[this.name] || "[]");

    document.id = data.uuid();

    collection.push(document);

    const json = JSON.stringify(collection);

    localStorage[this.name] = json;
  }

  findOne(callback) {
    const collection = JSON.parse(localStorage[this.name]);

    for (let i = 0; i < collection.length; i++) {
      const document = collection[i];

      const match = callback(document);

      if (match) return document;
    }

    return null;
  }

  updateOne(document) {
    const collection = JSON.parse(localStorage[this.name]);

    const index = collection.findIndex((doc) => doc.id === document.id);

    if (index >= 0) collection[index] = document;

    const json = JSON.stringify(collection);

    localStorage[this.name] = json;
  }

  deleteOne(condition) {
    const collection = JSON.parse(localStorage[this.name] || "[]");

    const index = collection.findIndex(condition);

    if (index > -1) collection.splice(index, 1);

    const json = JSON.stringify(collection);

    localStorage[this.name] = json;
  }
}

const data = {
  uuid: function () {
    return (Math.random() * 10 ** 15).toString(36);
  },

  users: new Collection("users"),
  posts: new Collection("posts"),

  get userId() {
    const userId = JSON.parse(sessionStorage.userId || "null");

    return userId;
  },
  set userId(userId) {
    const json = JSON.stringify(userId);

    sessionStorage.userId = json;
  },
};

export default data;
