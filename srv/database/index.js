import SoftDelete from 'bookshelf-soft-delete';
import bookshelf from 'bookshelf';
import knex from './knex';

const Bookshelf = bookshelf(knex);
Bookshelf.plugin(SoftDelete);

const User = Bookshelf.Model.extend({
  role() {
    return this.belongsTo(Role);
  },
  tableName: `users`,
});

const Role = Bookshelf.Model.extend({
  tableName: `roles`,
  users() {
    return this.hasMany(User);
  },
});

const jsonify = ele => ele.toJSON();

export {
  Bookshelf,
  User,
  Role,
  jsonify,
};
