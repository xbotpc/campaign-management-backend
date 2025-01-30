// Problems with knex.
// Cannot run TS files as migrations
async function up(knex) {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.schema.createTable("campaigns", (table) => {
        table.uuid("id", {
            primaryKey: true,
        }).unique().defaultTo(knex.raw("uuid_generate_v4()"));
        table.timestamps(true, true);
        table.string("title", 200).notNullable();
        table.string("url").notNullable();
        table.boolean("is_active").defaultTo("false");
    }).createTable("payouts", (table) => {
        table.uuid("id", {
            primaryKey: true,
        }).unique().defaultTo(knex.raw("uuid_generate_v4()"));
        table.timestamps(true, true);
        table.uuid("campaign_id").notNullable().references("id").inTable('campaigns');
        table.string("country", 60).notNullable();
        table.decimal("amount", 50, 4).unsigned().notNullable();
        table.string("currency", 3).notNullable();
    });
}

async function down(knex) {
    await knex.schema.table('payouts', (table) => table.dropForeign(["campaignID"]));
    return knex.schema
        .dropTable("campaigns")
        .dropTable("payouts");
}

module.exports = {
    up,
    down,
};
