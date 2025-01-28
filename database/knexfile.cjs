// Problems with knex.
// Doesn't work with TS
const config = {
  development: {
    client: "pg",
    connection: {
      database: "postgres",
      user: "postgres",
      password: "password",
      server: "campaigns",
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
    },
  }
};

module.exports = config;
