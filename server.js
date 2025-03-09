const pg = require('pg');
const express = require('express');
const path = require('node:path');
const bodyParser = require('body-parser');
const { Console } = require('node:console');


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
    const res = await pool.query(`SELECT level FROM permissions ${user_id ? `WHERE permissions.user_id = '${user_id}'` : ''}`);
    console.log(`SELECT level FROM permissions ${user_id ? `WHERE permissions.user_id = '${user_id}'` : ''}`);
    return res.rows;
}

async function getSeasons(id) {
    const res = await pool.query(`SELECT * FROM seasons ${id ? `WHERE season_id = '${id}'` : ''}`);
    // console.log(res.rows);
    return res.rows;
}

async function getTeams(id) {
    const res = await pool.query(`SELECT *, t.name as team_name, u.name as captain_name, s.name as season_name FROM teams t ${id ? `WHERE t.id = '${id}'` : ''} JOIN users u ON t.captain = u.user_id JOIN seasons s ON t.season_id = s.season_id`);
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

async function getTeamIDByUserID(user_id, season_id) {
    console.log(`SELECT * FROM players p JOIN teams t ON p.team_id = t.team_id JOIN users u ON p.user_id = u.user_id WHERE (p.user_id = ${user_id} AND t.season_id = ${season_id})`);
    const res = await pool.query(`SELECT * FROM players p JOIN teams t ON p.team_id = t.team_id JOIN users u ON p.user_id = u.user_id WHERE (p.user_id = ${user_id} AND t.season_id = ${season_id})`);
    // console.log(res.rows);
    return res.rows;
}

async function getUncommittedPlayers(season_id) {
    const res = await pool.query(`SELECT * FROM users WHERE user_id NOT IN (SELECT user_id FROM players WHERE team_id IN (SELECT team_id FROM teams WHERE season_id = '${season_id}'))`);
    // console.log(res.rows);
    return res.rows;
}

async function getReports(id) {
    const res = await pool.query(`SELECT *, t.name as opponent_name, t.team_id as opponent_id, r.team_id as team_id  FROM reports r ${id ? `WHERE report_id = '${id}'` : ''} JOIN teams t on r.opponent_id = t.team_id`);
    // console.log(res.rows);
    return res.rows;
}

async function getStats(id) {
    let res;
    console.log(id);
    if (id !== undefined && id.includes('r')) {
        res = await pool.query(`SELECT * FROM stats ${id ? `WHERE report_id = ${id.replace('r','')};` : ''}`);
    } else {
        res = await pool.query(`SELECT * FROM stats ${id ? `WHERE stat_id = ${id}` : ''}`);
    }
    
    // console.log(res.rows);
    return res.rows;
}

async function addUser(name, email, phone) {
    const res = await pool.query(`INSERT INTO users (name, email, phone) VALUES ('${name}', '${email}', '${phone}') RETURNING user_id;`);
    // console.log(res.rows);
    return res.rows;
}

async function addSeason(name) {
    const res = await pool.query(`INSERT INTO seasons (name) VALUES ('${name}') RETURNING season_id, name;`);
    // console.log(res.rows);
    return res.rows;
}

async function addTeam(name, captain, season) {
    const res = await pool.query(`INSERT INTO teams (name, captain, season_id) VALUES ('${name}', '${captain}', '${season});`);
    // console.log(res.rows);
    return res.rows;
}

async function addPlayer(user_id, team_id) {
    const res = await pool.query(`INSERT INTO players (user_id, team_id) VALUES ('${user_id}', '${team_id}');`);
    // console.log(res.rows);
    return res.rows;
}

async function addReport(user_id, team_id, opponent_id) {
    console.log(` blah ${user_id} : ${team_id} : ${opponent_id}`)
    const res = await pool.query(`INSERT INTO reports (user_id, team_id, opponent_id) VALUES (${user_id}, ${team_id}, ${opponent_id}) RETURNING report_id;`);
    // console.log(res.rows);
    return res.rows;
}

async function addPublish(report_id, current_stats) {
    const res = await pool.query(`INSERT INTO publishes (report_id, stats) VALUES (${report_id}, '{${current_stats.toString()}}') RETURNING report_id;`);
    // console.log(res.rows);
    return res.rows;
}

async function addStats(report_id, stat_id, name, value, player_id) {
    let res;
    if (stat_id !== undefined) {
        res = await pool.query(`UPDATE stats SET (name, value, report_id, player_id) = ('${name}', ${value}, ${report_id}, ${player_id}) WHERE id = ${stat_id} RETURNING *;`);
    } else {
        res = await pool.query(`INSERT INTO stats (report_id) VALUES (${report_id}) RETURNING id;`);
    }
    // console.log(res.rows);
    return res.rows;
}

async function addTeamsBulk(data) {
    let rows = data.text.split('\n').map(row => row.split('\t'));
    console.log(data);
    rows.forEach(async row => {
        console.log(row);
        const count = await pool.query(`SELECT user_id FROM users WHERE email = '${row[2]}';`);
        const captain_user_id = count.rowCount === 0 ? (await pool.query(`INSERT INTO users (name, email) VALUES ('${row[1]}', '${row[2]}') RETURNING user_id;`)).rows[0].user_id : count.rows[0].user_id;
        console.log(count.rows);
        await pool.query(`INSERT INTO teams (name, captain, season_id) VALUES ('${row[0]}', ${captain_user_id}, ${data.season_id});`);
    });
    // console.log(data);
    return 'successful bulk upload';
}

async function addPlayersBulk(data) {
    let rows = data.text.split('\n').split('\t');
    let res;
    rows.forEach(async row => {
        const team_id = await pool.query(`SELECT team_id FROM teams WHERE name = '${row[0]}';`);
        const count = await pool.query(`SELECT user_id FROM users WHERE email = '${row[2]}';`);
        const user_id = count.length == 0 ? await pool.query(`INSERT INTO users (name, email) VALUES ('${row[1]}', '${row[2]}') RETURNING user_id;`) : count[0];
        const res = await pool.query(`INSERT INTO players (user_id, team_id) VALUES ('${user_id}',${data.team_id});`);
    });
    // console.log(res.rows);
    return 'successful bulk upload';
}

async function generateCache() {
    return await {
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
    team: addTeam,
    publish: addPublish
};

const bulkMutator = {
    player: addPlayersBulk,
    team: addTeamsBulk
};

const server = express();
const port = 3001;
server.use(bodyParser.json())

server.use((req, res, next) => {
    console.log('%s %s %s', req.method, req.url, req.path)
    next()
  })


server.get('/data', async (req, res) => {
    const currentData = await generateCache();

    res.json(currentData);
});

server.post('/login', async (req, res) => {
    console.log(req.body);
    if (req.body?.email) {
        const users = await getUsers({ email: req.body.email });
        const permissions = await (await getPermissions({ user_id: users[0].user_id })).map(el => el.level);
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
            res.json(await mutator.team(req.body.data.name, req.body.data.captain, req.body.data.season));
        } else if (req.body.type == 'bulk') {
            res.json(await bulkMutator.team(req.body.data));
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
            res.json(await mutator.season(req.body.data.name))
        }
    });

server.route('/players/:id?/:season_id?')
    .get(async (req, res, next) => {
        console.log(parseInt(req.params.id.replace('u', '')));
        if (!req.params.id.includes('u')) {
            res.json(await getPlayers(req.params.id));
        } else if (req.params.id == undefined) {
            res.json(await getPlayers());
        } else {
            res.json(await getTeamIDByUserID(parseInt(req.params.id.replace('u', '')), req.params.season_id));
        }
    })
    .post(async (req, res, next) => {
        if (req.body.type == 'add') {
            res.json(await mutator.player(req.body.data.user_id, req.body.data.team_id));
        } else if (req.body.type == 'bulk') {
            res.json(await bulkMutator.player(req.body.data));
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
            res.json(await mutator.user(req.body.data.name, req.body.data.email, req.body.data.phone));
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
            res.json(await mutator.report(req.body.data.user_id, req.body.data.team_id, req.body.data.opponent_id));
        } else if (req.body.type == 'publish') {
            res.json(await mutator.publish(req.params.id, req.body.data.current_stats));
        }
    });

server.route('/stats/:id?')
    .get(async (req, res, next) => {
        if (req.params.id) {
            res.json(await getStats(req.params.id));
        } else {
            res.json(await getStats());
        }
    })
    .post(async (req, res, next) => {
        console.log(req.body);
        if (req.body.type == 'create') {
            res.json(await mutator.stat(req.body.data.report_id));
        } else if (req.body.type == 'update') {
            res.json(await mutator.stat(req.body.data.report_id, req.params.id, req.body.data.name, req.body.data.value, req.body.data.player_id));
        }
    });

server.get('/:file', async (req, res) => {
    const filename = !req.params.file ? 'index.html' : req.params.file;
    console.log(filename);
    res.sendFile(path.join(__dirname, req.params.file));
});

server.get('/uncommitted_players/:season_id', async (req, res) => {
    if (req.params.season_id) {
        res.json(await getUncommittedPlayers(req.params.season_id));
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

