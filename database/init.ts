import knex, { Knex } from "knex";

export let db: Knex;

export async function dbConnect() {
    try {
        db = knex({
            client: 'pg',
            connection: {
                host: process.env.DB_HOST,
                port: 5432,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DATABASE,
            },
        });
        await db.raw('SELECT 1+1 as result')
        console.log('DB connection succesful');
    } catch (error) {
        console.error('Error connecting to database', error);
        throw error;
    }
}
