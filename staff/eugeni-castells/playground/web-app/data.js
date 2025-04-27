const users = [];

function uuid() {
  return ((Math.floor(Math.random() * 10) + 1) ** 15).toString(36);
}
const data = {
  users,
  uuid,
};

module.exports = data;
