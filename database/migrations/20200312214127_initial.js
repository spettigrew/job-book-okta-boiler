exports.up = async knex => {
  await knex.schema.createTable("users", users => {
    users.increments();
    users
      .string("email", 128)
      .notNullable()
      .unique();
    users.string("firstName", 128).notNullable();
    users.string("lastName", 128).notNullable();
  });

  await knex.schema.createTable("posts", table => {
    table.increments("id");
    table.string("title").notNullable();
    table.string("body").notNullable();
    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("posts").dropTableIfExists("users");
};
