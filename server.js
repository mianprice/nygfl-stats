const pg = require('pg');
const express = require('express');
const path = require('node:path');
const bodyParser = require('body-parser')


const pool = new pg.Pool({
    user: 'iprice',
    host: 'localhost',
    database: 'league_stats',
    password: '',
    port: 5432, // Default PostgreSQL port
});

async function getUsers(args = {}) {
    let q = 'SELECT * FROM users';
    if (args.id) {
        q += ` WHERE user_id = '${args.id}'`;
    } else if (args.email) {
        q += ` WHERE email = '${args.email}'`
    }
    const res = await pool.query(q);
    // console.log(res.rows);
    return res.rows;
}

async function getPermissions({ user_id }) {
    const res = await pool.query(`SELECT * FROM permissions ${user_id ? `WHERE permissions.user_id = '${user_id}'` : ''}`);
    console.log(`SELECT * FROM permissions ${user_id ? `WHERE permissions.user_id = '${user_id}'` : ''}`);
    return res.rows;
}

async function getSeasons(id) {
    const res = await pool.query(`SELECT * FROM seasons ${id ? `WHERE season_id = '${id}'` : ''}`);
    // console.log(res.rows);
    return res.rows;
}

async function getTeams(id) {
    const res = await pool.query(`SELECT *, u.name as captain_name, s.name as season_name FROM teams t ${id ? `WHERE t.id = '${id}'` : ''} JOIN users u ON t.captain = u.user_id JOIN seasons s ON t.season_id = s.season_id`);
    // console.log(res.rows);
    return res.rows/*.map(async team => {
        const res2 = await pool.query(`SELECT *, t.name as team_name FROM players p WHERE team_id = '${team.team_id}' JOIN users u ON p.user_id = u.user_id`);
        team.players = res2.rows;
        return team;
    })*/;
}

async function getPlayers(id) {
    const res = await pool.query(`SELECT *, t.name as team_name FROM players p ${id ? `WHERE player_id = '${id}' ` : ''}JOIN teams t ON p.team_id = t.team_id JOIN users u ON p.user_id = u.user_id`);
    // console.log(res.rows);
    return res.rows;
}

async function getReports(id) {
    const res = await pool.query(`SELECT * FROM reports ${id ? `WHERE report_id = '${id}'` : ''}`);
    // console.log(res.rows);
    return res.rows;
}

async function getStats(id) {
    const res = await pool.query(`SELECT * FROM stats ${id ? `WHERE stat_id = '${id}'` : ''}`);
    // console.log(res.rows);
    return res.rows;
}

async function addUser(name, email, phone) {
    const res = await pool.query(`INSERT INTO users (name, email, phone) VALUES ('${name}', '${email}', '${phone});`);
    // console.log(res.rows);
    return res.rows;
}

async function addSeason(name) {
    const res = await pool.query(`INSERT INTO seasons (name) VALUES ('${name}');`);
    // console.log(res.rows);
    return res.rows;
}

async function addTeam(name, captain, season) {
    const res = await pool.query(`INSERT INTO teams (name, captain, season_id) VALUES ('${name}', '${captain}', '${season});`);
    // console.log(res.rows);
    return res.rows;
}

async function addPlayer(name, team) {
    const res = await pool.query(`INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='${name}'), (SELECT team_id FROM teams WHERE name='${team}'));`);
    // console.log(res.rows);
    return res.rows;
}

async function addReport(user) {
    const res = await pool.query(`INSERT INTO reports (user_id) VALUES (${user});`);
    // console.log(res.rows);
    return res.rows;
}

async function addStats(name, email, phone) {
    const res = await pool.query(`INSERT INTO stats (name, value, report_id, player_id) VALUES ('${name}', ${value}, ${report_id}, ${player_id});`);
    // console.log(res.rows);
    return res.rows;
}

async function generateCache() {
    return {
        teams: await getTeams(),
        users: await getUsers(),
        seasons: await getSeasons(),
        reports: await getReports(),
        stats: await getStats(),
        players: await getPlayers()
    };
}

const mutator = {
    user: addUser,
    player: addPlayer,
    report: addReport,
    stat: addStats,
    season: addSeason,
    team: addTeam
};

const server = express();
const port = 3001;
server.use(bodyParser.json())


server.get('/data', async (req, res) => {
    const currentData = generateCache();

    res.json(currentData);
});

server.post('/login', async (req, res) => {
    console.log(req.body);
    if (req.body?.email) {
        const users = await getUsers({ email: req.body.email });
        const permissions = await getPermissions({ user_id: users[0].user_id });
        res.json([{
            ...users[0],
            permissions
        }]);
    }
});

server.route('/teams/:id?')
    .get(async (req, res, next) => {
        console.log(req);
        if (req.params.id) {
            res.json(await getTeams(req.params.id));
        }
        res.json(await getTeams());
    })
    .post(async (req, res, next) => {
        if (req.body.type == 'add') {
            mutator.team(req.body.data.name, req.body.data.captain, req.body.data.season)
        }
    });

server.route('/seasons/:id?')
    .get(async (req, res, next) => {
        if (req.params.id) {
            res.json(await getSeasons(req.params.id));
        }
        res.json(await getSeasons());
    })
    .post(async (req, res, next) => {
        if (req.body.type == 'add') {
            mutator.season(req.body.data.name)
        }
    });

server.route('/players/:id?')
    .get(async (req, res, next) => {
        if (req.params.id) {
            res.json(await getPlayers(req.params.id));
        }
        res.json(await getPlayers());
    })
    .post(async (req, res, next) => {
        if (req.body.type == 'add') {
            mutator.player(req.body.data.name, req.body.data.captain, req.body.data.season)
        }
    });

server.route('/users/:id?')
    .get(async (req, res, next) => {
        if (req.params.id) {
            res.json(await getUsers(req.params.id));
        }
        res.json(await getUsers());
    })
    .post(async (req, res, next) => {
        if (req.body.type == 'add') {
            mutator.user(req.body.data.name, req.body.data.email, req.body.data.phone)
        }
    });
    
server.route('/reports/:id?')
    .get(async (req, res, next) => {
        if (req.body.report_id) {
            res.json(await getReports(req.body.report_id));
        }
        res.json(await getReports());
    })
    .post(async (req, res, next) => {
        if (req.body.type == 'add') {
            mutator.report(req.body.data.user_id);
        }
    });

server.route('/stats/:id?')
    .get(async (req, res, next) => {
        if (req.body.stat_id) {
            res.json(await getStats(req.body.stat_id));
        }
        res.json(await getStats());
    })
    .post(async (req, res, next) => {
        if (req.body.type == 'add') {
            mutator.stat(req.body.data.name, req.body.data.value, req.body.data.report_id, req.body.data.player_id);
        }
    });

server.get('/:file', async (req, res) => {
    const filename = !req.params.file ? 'index.html' : req.params.file;
    console.log(filename);
    res.sendFile(path.join(__dirname, req.params.file));
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

