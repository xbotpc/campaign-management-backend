async function up(knex) {
    return knex.schema.alterTable("campaigns", (table) => {
        table.timestamps(true, true);
    }).alterTable("payouts", (table) => {
        table.timestamps(true, true);
    });
}

async function down(knex) {
    return knex.schema.alterTable(
        "campaigns",
        (table) => table.dropTimestamps(),
    ).alterTable(
        "payouts",
        (table) => table.dropTimestamps(),
    );
}

module.exports = {
    up,
    down
}