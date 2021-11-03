const db = require('./connection');

module.exports = {
  list() {
    return db('users');
  },
  getUserByEmail(email) {
    return db('users').where('email', email).first();
  },
  create(user) {
    return db('users').insert(user).returning('*');
  },
  update(id, users) {
    return db('users').where('id', id).update(users);
  },
  delete(id) {
    return db('users').where('id', id).del();
  },
};
