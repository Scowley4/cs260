exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('colors', function(table) {
      table.increments('id').primary();
      table.string('colorText');
      table.integer('palette_id').unsigned().notNullable().references('id').inTable('palettes');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('colors'),
  ]);
};
