const path   = require('path');
const knex = require('knex');

let dbname = process.env.CRUD_DBNAME || 'data';

const connecKnex = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(`./data/${dbname}.db`),
    },
    useNullAsDefault: true
    }
);

module.exports = connecKnex;

