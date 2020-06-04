import SoftDelete from 'bookshelf-soft-delete';
import bookshelf from 'bookshelf';
import knex from './knex';

const Bookshelf = bookshelf(knex);
Bookshelf.plugin(SoftDelete);

const User = Bookshelf.Model.extend({
  soft: [ `deleted_on` ],
  tableName: `users`,
  files() { // eslint-disable-line sort-keys
    return this.hasMany(File);
  },
  organizations() {
    return this.belongsToMany(Organization).through(UserOrganizations);
  },
  role() {
    return this.belongsTo(Role);
  },
});

const Role = Bookshelf.Model.extend({
  tableName: `roles`,
  users() {
    return this.hasMany(User);
  },
});

const File = Bookshelf.Model.extend({
  soft: [ `deleted_on` ],
  tableName: `files`,
  deletor() { // eslint-disable-line sort-keys
    return this.belongsTo(User, `deleted_by`);
  },
  organization() {
    return this.belongsTo(Organization);
  },
  pages() {
    return this.hasMany(Page);
  },
  uploader() {
    return this.belongsTo(User, `uploaded_by`);
  },
});

const Organization = Bookshelf.Model.extend({
  tableName: `organizations`,
  users() {
    return this.belongsToMany(User).through(UserOrganizations);
  },
});

const UserOrganizations = Bookshelf.Model.extend({
  tableName: `users_organizations`,
});

const Page = Bookshelf.Model.extend({
  tableName: `pages`,
  file() { // eslint-disable-line sort-keys
    return this.belongsTo(File);
  },
});

const jsonify = ele => ele ? ele.toJSON() : null;

export {
  Bookshelf,
  User,
  Role,
  File,
  Organization,
  Page,
  jsonify,
};
