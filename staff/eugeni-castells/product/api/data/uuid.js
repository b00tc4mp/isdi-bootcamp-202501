export const uuid = function () {
  return (Math.random() * 10 ** 15).toString(36);
};
