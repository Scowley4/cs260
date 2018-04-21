exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('palettes', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('palettes'),
  ]);
};
