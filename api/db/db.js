const { Pool } = require('pg');

const db = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Admin123',
    database: 'time_click',
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 3000
});

db.connect();

module.exports = db;
