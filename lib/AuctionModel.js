const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV||'development']);

console.log({knexConfig:require('../knexfile.js')[process.env.NODE_ENV||'development']});

const bookshelf = require('bookshelf')(knex);

const Model = bookshelf.Model.extend({
  tableName: 'auctions'
}, {
    // TODO some functions
});

module.exports = {
  knex:      knex,
  bookshelf: bookshelf,
  Model:     Model,
};
