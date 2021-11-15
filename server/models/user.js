const db = require('../db/connection');
const tableName = 'users';

const create = (user) => db(tableName).insert(user).returning('*');

const del = (id) => db(tableName).where('id', id).del();

const findAll = () => db(tableName);

const find = (filters) => {
  console.log(filters);
  return db(tableName).where(filters);
};

const findOne = (filters) => db(tableName).where(filters).first();

const update = (id, users) => {
  delete users.id; // not allowed to set `id`
  return db(tableName).where('id', id).update(users);
};

module.exports = {
  create,
  del,
  find,
  findAll,
  findOne,
  update,
};
