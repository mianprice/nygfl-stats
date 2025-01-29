import pg from 'pg';

const pool = new pg.Pool({
    user: 'your_db_user',
    host: 'your_db_host',
    database: 'your_db_name',
    password: 'your_db_password',
    port: 5432, // Default PostgreSQL port
});

async function getUsers() {
    const res = await pool.query('SELECT * FROM users');
    console.log(res.rows);
}

async function getSeasons() {
    const res = await pool.query('SELECT * FROM seasons');
    console.log(res.rows);
}

async function getTeams() {
    const res = await pool.query('SELECT * FROM teams');
    console.log(res.rows);
}

async function getPlayers() {
    const res = await pool.query('SELECT * FROM players');
    console.log(res.rows);
}

async function getReports() {
    const res = await pool.query('SELECT * FROM reports');
    console.log(res.rows);
}

async function getStats() {
    const res = await pool.query('SELECT * FROM stats');
    console.log(res.rows);
}

// test logs
getUsers();
getSeasons();
getTeams();
getPlayers();
getReports();
getStats();