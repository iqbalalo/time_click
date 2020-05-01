const { Pool } = require('pg');

const db = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Admin123',
    database: 'time_click',
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});


module.exports = db;
