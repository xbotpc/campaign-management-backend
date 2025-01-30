
async function up(knex) {
    await knex.raw(`
        ALTER TABLE campaigns
        ADD COLUMN fulltext_document TSVECTOR
        GENERATED ALWAYS AS (
            SETWEIGHT(TO_TSVECTOR('english',title), 'A') ||
            SETWEIGHT(TO_TSVECTOR('english',replace(replace(url, '.',' '), '/', ' ')), 'B')
        )
        STORED`);
    return knex.schema.table("campaigns", (table) => {
        table.index("fulltext_document", "fulltext_document_idx", "gin");
    });
}

async function down(knex) {
    return knex.schema.table("campaigns", (table) => {
        table.dropIndex("fulltext_document", "fulltext_document_idx");
        table.dropColumn("fulltext_document");
    });
}

module.exports = {
    up,
    down,
};
