window.stats_ui = {};

const initialState = {
    currentSeason: null,
    currentTeam: null,
    currentOpponent: null,
    currentUser: null
};

function resetState() {
    window.stats_ui.state = { ...initialState };
}

function attach(action, selector, content) {
    let t;
    if (content.trim) {
        t = document.createElement('template');
        t.innerHTML = content.trim();
    } else {
        t = content
    }
    if (action === 'add-before') {
        document.querySelector(selector).before(...t.content.childNodes);
    } else if (action === 'replace') {
        document.querySelector(selector).replaceChildren(...t.content.childNodes);
    } else if (action === 'add-after') {
        document.querySelector(selector).after(...t.content.childNodes);
    }
} 

function renderIntoTable(data) {
    let newHTML;
    let selector;
    switch (data.view) {
        case 'player':
            selector = `#${data.view}.v-table .edit-interface`;
            newHTML = data.future.players.reduce((prev, curr) => `${prev}${`
                <div class="v-row" data-record="${encodeURIComponent(JSON.stringify(curr))}">
                    <div class="v-item" data-prop="name">${curr.name}</div>
                    <div class="v-item hidden" data-prop="player_id">${curr.player_id}</div>
                    <div class="v-item hidden" data-prop="user_id">${curr.user_id}</div>
                    <div class="v-item" data-prop="created">${curr.createdAt}</div>
                    <div class="v-item" data-prop="team">${curr.team_id}</div>
                </div>
            `}`, '');
            break;
        case 'team':
            selector = `#${data.view}.v-table .edit-interface`;
            newHTML = data.future.teams.reduce((prev, curr) => `${prev}${`
                <div class="v-row" data-record="${encodeURIComponent(JSON.stringify(curr))}">
                    <div class="v-item" data-prop="name">${curr.name}</div>
                    <div class="v-item" data-prop="captain">${curr.captain}</div>
                    <div class="v-item" data-prop="season_id">${curr.season_id}</div>
                    <div class="v-item hidden" data-prop="createdAt">${curr.createdAt}</div>
                    <div class="v-item" data-prop="players">${curr.players}</div>
                    <div class="v-item hidden" data-prop="team_id">${curr.team_id}</div>
                </div>
            `}`, '');
            break;
        case 'report':
            selector = `#${data.view}.v-table .edit-interface`;
            newHTML = data.future.reports.reduce((prev, curr) => `${prev}${`
                <div class="v-row" data-record="${encodeURIComponent(JSON.stringify(curr))}">
                    <div class="v-item" data-prop="report_id">${curr.report_id}</div>
                    <div class="v-item" data-prop="user_id">${curr.user_id}</div>
                    <div class="v-item" data-prop="created">${curr.created}</div>
                    <div class="v-item" data-prop="stats">${curr.stats}</div>
                </div>
            `}`, '');
            break;
        case 'stat':
            selector = `#${data.view}.v-table .edit-interface`;
            newHTML = data.future.stats.reduce((prev, curr) => `${prev}${`
                <div class="v-row" data-record="${encodeURIComponent(JSON.stringify(curr))}">
                    <div class="v-item" data-prop="stat_name">${curr.name}</div>
                    <div class="v-item" data-prop="stat_value">${curr.value}</div>
                    <div class="v-item" data-prop="player">${curr.player_id}</div>
                    <div class="v-item hidden" data-prop="report">${curr.report_id}</div>
                    <div class="v-item" data-prop="created">${curr.createdAt}</div>
                    <div class="v-item hidden" data-prop="stat_id">${curr.id}</div>
                </div>
            `}`, '');
            break;
        case 'user':
            selector = `#${data.view}.v-table .edit-interface`;
            newHTML = data.future.users.reduce((prev, curr) => `${prev}${`
                <div class="v-row" data-record="${encodeURIComponent(JSON.stringify(curr))}">
                    <div class="v-item hidden" data-prop="user_id">${curr.user_id}</div>
                    <div class="v-item" data-prop="name">${curr.name}</div>
                    <div class="v-item" data-prop="email">${curr.email}</div>
                    <div class="v-item" data-prop="phone">${curr.phone}</div>
                    <div class="v-item hidden" data-prop="createdAt">${curr.createdAt}</div>
                </div>
            `}`, '');
            break;
        case 'season':
            selector = `#${data.view}.v-table .edit-interface`;
            newHTML = data.future.seasons.reduce((prev, curr) => `${prev}${`
                <div class="v-row" data-record="${encodeURIComponent(JSON.stringify(curr))}">
                    <div class="v-item" data-prop="season_name">${curr.name}</div>
                    <div class="v-item" data-prop="season_teams">${curr.teams}</div>
                    <div class="v-item" data-prop="created">${curr.createdAt}</div>
                    <div class="v-item" data-prop="season_id">${curr.season_id}</div>
                </div>
            `}`, '');
            break;
        case 'admin_controller':
            selector = `#admin_controller`;
            newHTML = `
                <h3>Admin Controls</h3>
                <div class="v-row">
                    <input type="button" class="v-item" data-action="edit_team" value="Edit Team"/>
                    <input type="button" class="v-item" data-action="edit_report" value="Edit Stat Report"/>
                    <input type="button" class="v-item" data-action="create_season" value="Create Season"/>
                </div>
            `;
            
            break;
        case 'captain_controller':
            selector = `#captain_controller`;
            newHTML = `
                <h3>Captain Controls</h3>
                <div class="v-row">
                    <input type="button" class="v-item" data-action="edit_report" value="Edit Stat Report"/>
                    <input type="button" class="v-item" data-action="create_report" value="Create Report"/>
                </div>
            `;
            
            break;
        case 'controls':
            selector = '#controls';
            newHTML = `
                <section id="admin_controller"></section>
                <section id="captain_controller"></section>
                <section id="player_controller"></section>
            `;
            
            break;
        case 'login':
            selector = `#${data.view}`;
            if (localStorage.getItem('logged_in') === 'true') {
                newHTML = `
                    <input class="v-item" type="button" value="Home" id="home_button">
                    <div class="v-item" id="username">${JSON.parse(localStorage.current_user).name}</div>
                    <input class="v-item" type="button" value="Logout" id="logout_button">
                `;
            } else {
                newHTML = `
                    <input class="v-item" type="email" name="email" id="login_email">
                    <input class="v-item" type="button" value="Login" id="login_button">
                `;
            }   
            
            break;
    }

    if (data.action === 'recurse') {
        return newHTML;
    } else {
        attach(data.action, selector, newHTML);
    }
}

// local data cache
window.stats_cache = {};

function clearCache() {
    window.stats_cache = {};
}

async function setupCache() {
    window.stats_cache = await get('data');
    window.stats_ui.state.currentUser = JSON.parse(localStorage.getItem('current_user')) || null;
}

function addToCache(data) {
    if (Array.isArray(data)) {

    } else {

    }
}

function renderLogin() {
    if (localStorage.getItem('logged_in') === 'true') {
        renderIntoTable({
            action: 'replace',
            view: 'login',
            future: JSON.parse(localStorage.getItem('current_user'))
        });
    
        document.querySelector('#login input[type="button"]').addEventListener('click', async e => {
            if (e.target.id === 'home_button') {
                main();
            } else {
                delete localStorage.current_user;
                delete localStorage.logged_in;
                resetState();
                renderLogin();
            }
        });    
    } else {
        renderIntoTable({
            action: 'replace',
            view: 'login'
        });
        
        document.querySelector('#login input[type="button"]').addEventListener('click', async e => {
            // try to grab valid user
            try {
                const data = await post(`/login`, { email: login_email.value });
                console.log(data);
                if (data.length > 0) {
                    localStorage.setItem('current_user', JSON.stringify(data[0]));
                    localStorage.setItem('logged_in', 'true');
                    window.stats_ui.state.currentUser = data[0];
                    renderLogin();
                }
            } catch (error) {
                console.error(error);
            }
        });
        document.querySelector('#login input[type="email"]').addEventListener('change', e => {
            console.log(login_email.value);
            if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(login_email.value)) {
                login_button.disabled = false;
            }
        });
    }

    renderMain();
};


function renderMain() {
    if (localStorage.getItem('logged_in') === 'true') {
        const user = JSON.parse(localStorage.getItem('current_user'));

        if (user.permissions.includes('admin')) {
            renderIntoTable({
                action: 'replace',
                view: 'admin_controller'
            });
        }

        if (user.permissions.includes('captain')) {
            renderIntoTable({
                action: 'replace',
                view: 'captain_controller'
            });
        }
    } else {
        renderIntoTable({
            action: 'replace',
            view: 'controls'
        });
    }
}

function handleRouting(event) {
    console.log(event.target);
    switch (event.target.dataset.action) {
        case 'edit_team':
            // choose season
            const seasonPicker = setupSeasonPicker();
            seasonPicker.content.querySelector('select').addEventListener('change', event => {
                event.target.disabled = true;
                // choose team
                const teamPicker = setupTeamPicker(event.target.value);
                teamPicker.content.querySelector('select').addEventListener('change', async event => {
                    // render chosen team
                    const teamView = await setupTeamView(event.target.value, true);
                    attach('replace', '#interactive', teamView);
                });
                attach('add-after', '#interactive .v-row', teamPicker);
            });
            attach('replace', '#interactive', seasonPicker);
            break;
        case 'edit_report':
            const reportPicker = setupReportPicker(JSON.parse(localStorage.getItem('current_user')));
            // choose report from list (by user for captain, by season for admin)
            reportPicker.content.querySelector('select').addEventListener('change', async event => {
                event.target.disabled = true;
                // render chosen report
                const reportEditor = await setupReportEditor(event.target.value, window.stats_ui.state.currentTeam, window.stats_ui.state.currentOpponent);
                reportEditor.content.querySelectorAll('input[type="button"]').forEach(el => {
                    el.addEventListener('click', async event => {
                        if (event.target.dataset.prop == 'add') {
                            let stat;
                            // save stat
                            if (parseInt(event.target.dataset.stat_id) > 0) {
                                // update
                                stat = await post(`/stats/${stat_id}`, {
                                    type: 'update',
                                    data: {
                                        name: event.target.dataset.type,
                                        value: event.target.dataset.value,
                                        player_id: event.target.dataset.player_id,
                                        report_id: event.target.dataset.report_id
                                    }
                                });
                            } else {
                                // create
                                stat = await post('/stats', {
                                    type: 'add',
                                    data: {
                                        name: event.target.dataset.type,
                                        value: event.target.dataset.value,
                                        player_id: event.target.dataset.player_id,
                                        report_id: event.target.dataset.report_id
                                    }
                                });
                            }
                            // render stat
                            const newStatView = setupStatView({
                                stat_id: event.target.dataset.stat_id,
                                type: event.target.dataset.type,
                                value: event.target.dataset.value,
                                player_id: event.target.dataset.player_id,
                                report_id: event.target.dataset.report_id
                            });

                            attach('replace', `div[data-stat_id="${event.target.dataset.stat_id}"]`, newStatView);
                        } else if (event.target.dataset.prop == 'edit') {
                            // make stat editable
                            const newStatEditor = setupStatView({
                                stat_id: event.target.dataset.stat_id,
                                type: event.target.dataset.type,
                                value: event.target.dataset.value,
                                player_id: event.target.dataset.player_id,
                                report_id: event.target.dataset.report_id
                            }, true);

                            attach('replace', `div[data-stat_id="${event.target.dataset.stat_id}"]`, newStatEditor);
                        } else if (event.target.dataset.prop == 'submit') {
                            // submit full report 
                            const report = await post(`/reports/${report_id}`, {
                                type: 'publish',
                                data: {
                                    published: true
                                }
                            });
                        }
                    });
                });

                attach('replace', '#interactive', reportEditor);
            });
            attach('replace', '#interactive', reportPicker);
            // allow adding new stats

            // include button with save/view action for confirmation

            break;
        case 'create_report':
            // choose season
            const currentSeasonPicker = setupSeasonPicker();
            currentSeasonPicker.content.querySelector('select').addEventListener('change', async event => {
                window.stats_ui.state.currentSeason = event.target.value;
                window.stats_ui.state.currentTeam = (await get(`players/u${window.stats_ui.state.currentUser.user_id}/${window.stats_ui.state.currentSeason}`))[0].team_id;
                event.target.disabled = true;
                // choose team
                const opponentPicker = setupTeamPicker(event.target.value);
                opponentPicker.content.querySelector('select').addEventListener('change', async event => {
                    window.stats_ui.state.currentOpponent = event.target.value;
                    // render chosen team
                    console.log(window.stats_ui.state);
                    const newReportEditor = await setupReportEditor('new', window.stats_ui.state.currentTeam.team_id, window.stats_ui.state.currentOpponent);
                    attach('replace', '#interactive', newReportEditor);
                });
                attach('add-after', '#interactive .v-row', opponentPicker);
            });
            attach('replace', '#interactive', currentSeasonPicker);
            // choose week/opponent

            // allow adding new stats

            // include button with save/view action for confirmation

            break;
        case 'create_season':
            const newSeasonEditor = setupSeasonEditor();

            attach('replace', '#interactive', newSeasonEditor);
            // choose season name

            // allow paste from excel format into textarea, for processing into database

            // include button with save/view action for confirmation

            break;
        case 'team_summary':
            // summary view of team, for base captain view and team edit confirmation

            break;
        case 'season_summary':
            // summary view of season, with each team and players for each listed (for confirmation of successful processing)

            break;
        case 'team_summary_stats':
            // collect stats for a given team and show leaderboard

            break;
        case 'season_summary_stats':
            // collect stats for a given season, across teams, and show leaderboard

            break;
        case 'week_summary_stats':
            // collect stats for a given week, across teams, and show leaderboard

            break;
    }
}

function handleInteraction(event) {

}

function setupSeasonPicker() {
    const seasons = window.stats_cache.seasons;
    const newSeasonPicker = window.templates['season_picker'].cloneNode(true);
    const newSelect = newSeasonPicker.content.querySelector('select');

    seasons.forEach(element => {
        const newOption = window.templates['blank_option'].cloneNode(true).content.querySelector('option');
        newOption.value = element.season_id;
        newOption.label = element.name;
        newSelect.appendChild(newOption)
    });
    
    return newSeasonPicker;
}

function setupTeamPicker(season_id) {
    window.stats_ui.state.currentSeason = season_id;
    const teams = window.stats_cache.teams.filter(el => el.season_id == season_id);
    const newTeamPicker = window.templates['team_picker'].cloneNode(true);
    const newSelect = newTeamPicker.content.querySelector('select');

    teams.forEach(element => {
        const newOption = window.templates['blank_option'].cloneNode(true).content.querySelector('option');
        newOption.value = element.team_id;
        newOption.label = element.team_name;
        newSelect.appendChild(newOption)
    });
    
    return newTeamPicker;
}

function setupReportPicker(user, team_id) {
    let reports;
    if (user.permissions.includes('admin')) {
        reports = window.stats_cache.reports.filter(el => true);

    } else if (user.permissions.includes('captain')) {
        reports = window.stats_cache.reports.filter(el => el.user_id == user.user_id);

    }
    const newReportPicker = window.templates['report_picker'].cloneNode(true);
    const newSelect = newReportPicker.content.querySelector('select');

    reports.forEach(element => {
        const newOption = window.templates['blank_option'].cloneNode(true).content.querySelector('option');
        newOption.value = element.report_id;
        newOption.label = `${element.opponent_name} - ${element.created_at}`;
        newSelect.appendChild(newOption)
    });

    if (team_id !== undefined) {
        newReportPicker.dataset.team_id = team_id;
    }    
    return newReportPicker;
}

function setupPlayerOption(player) {
    const newPlayerOption = window.templates['blank_option'].cloneNode(true);
    const newOption = newPlayerOption.content.querySelector('option');
    newOption.value = player.player_id;
    newOption.label = player.name;
}

async function setupReportEditor(report_id, team_id, opponent_id) {
    const newReportEditor = window.templates['report_editor'].cloneNode(true);
    if (report_id !== 'new') {
        // populate report
        const stats = window.stats_cache.stats.filter(el => el.report_id == report_id);

        stats.forEach(stat => {
            const statView = setupStatView(stat);
            newReportEditor.content.querySelector('.v-table').insertBefore(statView, newReportEditor.content.querySelector('input.v-row[type="button"]'));
        });
    } else {
        const { report_id } = await post(`reports`, {
            type: 'add',
            data: {
                user_id: window.stats_ui.state.currentUser.user_id,
                team_id: window.stats_ui.state.currentTeam,
                opponent_id: window.stats_ui.state.currentOpponent
            }
        });
        const statView = setupStatView({
            type: 0,
            value: 0,
            player_id: 0,
            report_id,
            stat_id: 0
        }, true);
        const newStatPlayerSelect = statView.content.querySelector('select[data-prop="player"]');
        const players = window.stats_cache.players.filter(el => el.team_id == team_id);

        players.forEach(player => {
            const newPlayerSelection = setupPlayerOption(player);
            newStatPlayerSelect.appendChild(newPlayerSelection);
        });

        newReportEditor.content.querySelector('.v-table').insertBefore(statView, newReportEditor.content.querySelector('input.v-row[type="button"]'));
    }

    return newReportEditor;
}

function enableStatSubmission(submittor) {
    if (submittor.dataset.value != 0 && submittor.dataset.player_id != 0 && submittor.dataset.type != 0) {
        submittor.disabled = false;
    } else {
        submittor.disabled = true;
    }
}

function setupStatView(data, editable = false) {
    const { stat_id, type, value, player_id, report_id } = data;
    let newStat;
    if (editable) {
        newStat = window.templates['stat_edit'].cloneNode(true);
        const newStatSubmittor = newStat.content.querySelector('input[type="button"]');
        
        newStatSubmittor.dataset.stat_id = stat_id;
        newStatSubmittor.dataset.report_id = report_id;

        // add change handlers
        newStat.content.querySelector('input[type="number"]').addEventListener('change', event => {
            newStatSubmittor.dataset.value = event.target.value;
            enableStatSubmission(newStatSubmittor);
        });
        newStat.content.querySelector('select[data-prop="player"]').addEventListener('change', event => {
            newStatSubmittor.dataset.player_id = event.target.value;
            enableStatSubmission(newStatSubmittor);
        });
        newStat.content.querySelector('select[data-prop="type"]').addEventListener('change', event => {
            newStatSubmittor.dataset.type = event.target.value;
            enableStatSubmission(newStatSubmittor);
        });
    } else {
        newStat = window.templates['stat_view'].cloneNode(true);
        const newStatSubmittor = newStat.content.querySelector('input[type="button"]');
        newStatSubmittor.dataset = {
            type,
            value,
            player_id,
            report_id,
            stat_id
        };

        newStat.content.querySelector('div[data-prop="type"]').innerText = type;
        newStat.content.querySelector('div[data-prop="value"]').innerText = value;
        newStat.content.querySelector('div[data-prop="player"]').innerText = player_id;
    }

    console.log(newStat);

    return newStat;
}

async function setupTeamView(team_id, editable) {
    window.stats_ui.state.currentTeam = team_id;
    const players = window.stats_cache.players.filter(el => el.team_id == team_id);
    const newTeamView = window.templates['team_view'].cloneNode(true);
    const newTable = newTeamView.content.querySelector('.v-table');

    console.log(players);

    players.forEach(element => {
        const newPlayerRow = window.templates['player_row'].cloneNode(true).content.querySelector('.v-row');
        newPlayerRow.dataset.player_id = element.player_id;
        newPlayerRow.dataset.user_id = element.user_id;
        newPlayerRow.querySelector('div[data-prop="name"]').innerText = element.name;
        newPlayerRow.querySelector('div[data-prop="phone"]').innerText = element.phone;
        newPlayerRow.querySelector('div[data-prop="email"]').innerText = element.email;
        newTable.appendChild(newPlayerRow);
    });

    if (editable) {
        const availablePlayers = await get(`uncommitted_players/${window.stats_ui.state.currentSeason}`);

        const newPlayerPicker = window.templates['player_picker'].cloneNode(true).content.querySelector('.v-table');
        const newSelect = newPlayerPicker.querySelector('.picker select');

        availablePlayers.forEach(element => {
            const newOption = window.templates['blank_option'].cloneNode(true).content.querySelector('option');
            newOption.value = element.user_id;
            newOption.label = element.name;
            newSelect.appendChild(newOption);
        });

        newPlayerPicker.querySelector('input[type="button"]').addEventListener('click', async event => {
            let player_id, user_id;
            if (event.target.parentElement.parentElement.querySelector('.picker select').value !== 'default') {
                // create player record with existing user_id
                user_id = event.target.parentElement.parentElement.querySelector('.picker select').value;

                player_id = await post('/players', {
                    type: 'add',
                    data: {
                        user_id,
                        team_id
                    }
                });

            } else if (
                event.target.parentElement.parentElement.querySelector('.adder input[type="text"]').value !== '' &&
                event.target.parentElement.parentElement.querySelector('.adder input[type="email"]').value !== '' &&
                event.target.parentElement.parentElement.querySelector('.adder input[type="phone"]').value !== ''
            ) {
                // create user record with input values
                const name = event.target.parentElement.parentElement.querySelector('.adder input[type="text"]').value;
                const email = event.target.parentElement.parentElement.querySelector('.adder input[type="email"]').value;
                const phone = event.target.parentElement.parentElement.querySelector('.adder input[type="phone"]').value;

                user_id = (await post('/users', {
                    type: 'add',
                    data: {
                        name,
                        email,
                        phone
                    }
                }))[0].user_id;

                player_id = await post('/players', {
                    type: 'add',
                    data: {
                        user_id,
                        team_id
                    }
                });
            }

            console.log(`User ${user_id} has been added to the database on team ${team_id} as player ${player_id}`);

            await setupCache();
            const teamView = await setupTeamView(team_id, true);
            attach('replace', '#interactive', teamView);
        });

        newTable.appendChild(newPlayerPicker);
    }

    return newTeamView;
}

async function post(path, body_data) {
    console.log(body_data);
    // build relevant query URL
    const url = `http://localhost:3001/${path}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body_data)
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }
}

async function get(path) {
    // build relevant query URL
    const url = `http://localhost:3001/${path}`;
    console.log(url);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }
}

document.querySelector('#controls').addEventListener('click', handleRouting);
// document.querySelector('#interactive').addEventListener('click', handleInteraction);

function grabTemplates() {
    const templates = {};
    [...document.querySelectorAll('template')].forEach(element => {
        templates[element.dataset.name] = element.cloneNode(true);
    });

    window.templates = templates;
}

function resetInteractive() {
    window.interactive.innerHTML = '';
}

function main() {
    resetInteractive();
    resetState();

    grabTemplates();

    setupCache();

    renderLogin();

    renderMain();
}


//main
main()