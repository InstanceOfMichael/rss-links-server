
exports.up = function(knex, Promise) {
    return knex.schema.createTable('auctions', function(table) {
      table.increments('id').primary();
      table.string('slug').unique();
      table.string('name');
      table.text('description');
      table.string('source_href',255);
      table.timestamps();
      table.jsonb('meta');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('auctions');
};
