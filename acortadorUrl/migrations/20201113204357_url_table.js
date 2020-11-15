
exports.up = function(knex) {
    return knex.schema
    .createTable('urls', (table) => {
      table.increments('id');
      table.string('longURL');
      table.string('shortURL', 255);
      table.integer('timesRedirected').defaultTo(0);
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('urls');
};
