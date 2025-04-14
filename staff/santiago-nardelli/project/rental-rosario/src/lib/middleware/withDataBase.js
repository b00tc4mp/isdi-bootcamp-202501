import db from '@/lib/db';

export const withDatabase = (handler) => (req, res) => {
  return db.connect()
    .then(() => handler(req, res))
    .finally(() => db.disconnect());
};
