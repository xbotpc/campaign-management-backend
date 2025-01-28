// Problems with knex.
// Cannot run TS files as migrations
async function up(knex){
    return knex.schema.createTable('campaigns', (table) => {
        table.uuid('id', {
            primaryKey: true
        });
        table.string('title', 200).notNullable();
        table.string('url').notNullable();
        table.boolean('is_active').defaultTo('false');
        table.uuid('payout_id').notNullable();
    }).createTable('payouts', (table) => {
        table.uuid('id', {
            primaryKey: true
        })
        table.string('country', 60).notNullable();
        table.decimal('amount', 50, 4).unsigned().notNullable();
        table.string('currency', 3).notNullable();
    }).table('campaigns', (table) => {
        table.foreign('payout_id').references('payouts.id');
    });
}

async function down(knex) {
    return knex.schema
        .dropTable('campaigns')
        .dropTable('payouts');
}

module.exports = {
    up,
    down
}
