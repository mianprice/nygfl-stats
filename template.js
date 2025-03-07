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

    const node = typeof selector !== 'string' ? selector : document.querySelector(selector);
    
    if (action === 'add-before') {
        node.before(...t.content.childNodes);
    } else if (action === 'replace') {
        node.replaceChildren(...t.content.childNodes);
    } else if (action === 'add-after') {
        node.after(...t.content.childNodes);
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
        case 'controls':
            selector = '#controllers';
            newHTML = `
                <input type="button" class="tab" id="admin_controller" value="Admin">
                <input type="button" class="tab" id="captain_controller" value="Captain">
                <input type="button" class="tab" id="player_controller" value="Admin">
            `;
            
            break;
        case 'login':
            selector = `#${data.view}`;
            if (localStorage.getItem('logged_in') === 'true') {
                newHTML = `
                    <div id="login_set">
                        <input class="v-item" type="button" value="Home" id="home_button">
                        <input class="v-item" type="button" value="Logout" id="logout_button">
                    </div>
                `;
            } else {
                newHTML = `
                    <div id="login_set">
                        <input class="v-item" type="email" name="email" id="login_email">
                        <input class="v-item" type="button" value="Login" id="login_button">
                    </div>
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
                const data = await post(`login`, { email: login_email.value });
                if (data.length > 0) {
                    window.currentUser = data[0];
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
            if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(login_email.value)) {
                login_button.disabled = false;
            }
        });
    }

    renderMain();

    document.querySelector('#home_button').addEventListener('click', renderMain);
};


function renderMain() {
    if (localStorage.getItem('logged_in') === 'true') {
        const controls = setupControls();

        attach('replace', '#controllers', controls);
    }
    
}

function setupControls() {
    document.querySelector('#controls').innerHTML = '';
    const permissions = (JSON.parse(localStorage.getItem('current_user'))).permissions;

    const newControllers = window.templates['permission_controllers'].cloneNode(true);

    permissions.forEach(permission => {
        console.log(permission);
        const controller = newControllers.content.querySelector(`#${permission.toLowerCase()}_controller`);
        controller.hidden = false;
        controller.addEventListener('click', event => {
            const list = event.target.parentElement.childNodes;
            for (var i = list.length - 1; i--; i > -1) {
                if ((list[i].id ? list[i].id : 0) !== event.target.id) {
                    event.target.parentElement.removeChild(list[i]);
                } else {
                    event.target.disabled = true;
                }
            }
    
            const permission = event.target.value.toLowerCase();
            const newControls = window.templates[`${permission}_control`].cloneNode(true);
    
            attach('replace', '#controls', newControls);
        });
    });
        
    return newControllers;
}

function handleRouting(event) {
    console.log(event);
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
                const reportEditor = await setupReportEditor(...event.target.value.split(','));
                reportEditor.content.querySelectorAll('input[type="button"]').forEach(el => {
                    el.addEventListener('click', handleStatClick);
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
                const opponentPicker = setupTeamPicker(event.target.value, true);
                opponentPicker.content.querySelector('select').addEventListener('change', async event => {
                    window.stats_ui.state.currentOpponent = event.target.value;
                    // render chosen team
                    const newReportEditor = await setupReportEditor('new', window.stats_ui.state.currentTeam, window.stats_ui.state.currentOpponent);
                    newReportEditor.content.querySelectorAll('input[type="button"]').forEach(el => {
                        el.addEventListener('click', handleStatClick);
                    });
                    attach('replace', '#interactive', newReportEditor);
                });
                attach('add-after', '#interactive .v-row', opponentPicker);
            });
            attach('replace', '#interactive', currentSeasonPicker);

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

async function handleStatClick(event) {
    // enableStatSubmission(event.target);
    enableSubmit();

    const currentStat = (Array.from(document.querySelectorAll(`div.v-row`))).filter(el => el.dataset.stat_id == event.target.dataset.stat_id)[0];

    if (event.target.dataset.prop == 'update') {
        let stat;
        // update
        stat = await post(`stats/${event.target.dataset.stat_id}`, {
            type: 'update',
            data: {
                name: event.target.dataset.type,
                value: parseInt(event.target.dataset.value),
                player_id: parseInt(event.target.dataset.player_id),
                report_id: parseInt(event.target.dataset.report_id)
            }
        });
        // render stat
        console.log('false false')

        const newStatView = await setupStatView({
            stat_id: parseInt(event.target.dataset.stat_id),
            type: event.target.dataset.type,
            value: parseInt(event.target.dataset.value),
            player_id: parseInt(event.target.dataset.player_id),
            report_id: parseInt(event.target.dataset.report_id)
        }, false, false);

        // const newBlankStat = await generateNewStat(event.target.dataset.report_id);
        // document.querySelector('#interactive .v-table').insertBefore(newBlankStat.content, document.querySelector('#interactive input.v-row[type="button"]'));

        
        attach('replace', currentStat, newStatView);

        unsentButtons = document.querySelectorAll(`input[type="button"][data-unsent="true"]`);

        console.log('unsentButtons.length')
        console.log(unsentButtons.length)
        console.log(typeof unsentButtons.length)
        console.log(unsentButtons.length < 1)
        // console.log(document.querySelectorAll(`input[type="button"]`))
        if (unsentButtons.length < 3) {
            const newBlankStat = await generateNewStat(event.target.dataset.report_id);
            document.querySelector('#interactive .v-table').insertBefore(newBlankStat.content, document.querySelector('#interactive .v-table input.v-row[type="button"]'));
        }

    } else if (event.target.dataset.prop == 'edit') {
        // make stat editable
        const newStatEditor = await setupStatView({
            stat_id: parseInt(event.target.dataset.stat_id),
            type: event.target.dataset.type,
            value: parseInt(event.target.dataset.value),
            player_id: parseInt(event.target.dataset.player_id),
            report_id: parseInt(event.target.dataset.report_id)
        }, true, false);

        enableStatSubmission(currentStat.querySelector('input[type="button"]'));

        attach('replace', currentStat, newStatEditor);
    } else if (event.target.dataset.prop == 'submit') {
        const current_stats = Set.from(Array.from(document.querySelectorAll('.v-row[data-stat_id]')).map(el => parseInt(el.dataset.stat_id))); 
        // submit full report 
        console.log('current_stats');
        console.log(current_stats);
        const report = await post(`reports/${event.target.dataset.report_id}`, {
            type: 'publish',
            data: {
                published: true,
                current_stats
            }
        });
    }
    enableSubmit();
}

function enableSubmit() {
    const reporter = document.querySelector('input[data-prop="submit"]');
    console.log(reporter)
    if (reporter.dataset.report_id !== 0 && reporter.dataset.team_id !== 0 && reporter.dataset.opponent_id !== 0) {
        reporter.disabled = false;
    } else {
        reporter.disabled = true;
    }
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

function setupTeamPicker(season_id, is_opponent = false) {
    window.stats_ui.state.currentSeason = season_id;
    const teams = window.stats_cache.teams.filter(el => el.season_id == season_id);
    const newTeamPicker = window.templates['team_picker'].cloneNode(true);
    const newSelect = newTeamPicker.content.querySelector('select');
    const newLabel = newTeamPicker.content.querySelector('label');

    newLabel.innerText = is_opponent ? 'Pick an opponent: ' : 'Pick a team: ';

    teams.forEach(element => {
        const newOption = window.templates['blank_option'].cloneNode(true).content.querySelector('option');
        newOption.value = element.team_id;
        newOption.label = element.team_name;
        newSelect.appendChild(newOption)
    });
    
    return newTeamPicker;
}

function addPlayerOptions(statView) {
    console.log(window.stats_ui.state.currentTeam)
    const newStatPlayerSelect = statView.content.querySelector('select[data-prop="player"]');
    const players = window.stats_cache.players.filter(el => el.team_id == window.stats_ui.state.currentTeam);

    players.forEach(player => {
        const newPlayerSelection = setupPlayerOption(player);
        newStatPlayerSelect.appendChild(newPlayerSelection);
    });
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
        newOption.value = `${element.report_id},${element.team_id},${element.opponent_id}`;
        newOption.label = `${element.opponent_name} - ${element.created_at}`;
        newSelect.appendChild(newOption)
    });

    if (team_id !== undefined) {
        newReportPicker.dataset.team_id = team_id;
    }    
    return newReportPicker;
}

function setupPlayerOption(player) {
    const newPlayerOption = window.templates['blank_option'].cloneNode(true).content.querySelector('option');
    newPlayerOption.value = player.player_id;
    newPlayerOption.label = player.name;
    return newPlayerOption;
}

async function setupReportEditor(report_id, team_id, opponent_id) {
    const newReportEditor = window.templates['report_editor'].cloneNode(true);

    if (report_id !== 'new') {
        // populate report
        const stats = await get(`stats/r${report_id}`);

        window.stats_ui.state.currentTeam = team_id;
        window.stats_ui.state.currentOpponent = opponent_id;
        window.stats_ui.state.stats = stats;

        stats.forEach(async stat => {
            console.log(stat);
            const statView = await setupStatView({
                ...stat,
                stat_id: stat.id,
                type: stat.name,
            }, false, false);
            newReportEditor.content.querySelector('.v-table').insertBefore(statView.content, newReportEditor.content.querySelector('input.v-row[type="button"]'));
        });
    } else {
        report_id = (await post(`reports`, {
            type: 'add',
            data: {
                user_id: window.stats_ui.state.currentUser.user_id,
                team_id,
                opponent_id
            }
        }))[0].report_id;
    }
    const statView = await generateNewStat(report_id);

    newReportEditor.content.querySelector('input.v-row[data-prop="submit"]').dataset.report_id = report_id;

    newReportEditor.content.querySelector('.v-table').insertBefore(statView.content, newReportEditor.content.querySelector('input.v-row[type="button"]'));

    return newReportEditor;
}

async function generateNewStat(report_id) {
    // make stat
    const stat_id = (await post('stats', {
        type: 'create',
        data: {
            report_id
        }
    }))[0].id;

    return await setupStatView({
        type: 0,
        value: 0,
        player_id: 0,
        report_id,
        stat_id,
    }, true, true);
}

function enableStatSubmission(submittor) {
    submittor.value = "Add";
    if (!(parseInt(submittor.dataset.value) !== 0 && parseInt(submittor.dataset.player_id) !== 0 && submittor.dataset.type?.length !== 0)) {
        submittor.disabled = true;
    } else {
        submittor.disabled = false;
        submittor.value = "Save";
    }
}

async function setupStatView(data, editable = false, unsent = true) {
    let { stat_id, type, value, player_id, report_id } = data;
    console.log(
        `
        unsent: ${unsent}
        editable: ${editable}
        stat_id: ${stat_id}
        type: ${type}
        value: ${value}
        player_id: ${player_id}
        report_id: ${report_id}
        `
    )
    if (stat_id == 0) {
        stat_id = (await post('stats', {
            type: 'create',
            data: {
                report_id
            }
        }))[0].id;
    }
    let newStat, newStatSubmittor;
    if (editable) {
        newStat = window.templates['stat_edit'].cloneNode(true);
        newStat.content.querySelector('.v-row').dataset.stat_id = stat_id;
        newStatSubmittor = newStat.content.querySelector('input[type="button"]');

        addPlayerOptions(newStat)
        
        const v = newStat.content.querySelector('input[type="number"]');
        const p = newStat.content.querySelector('select[data-prop="player"]');
        const t = newStat.content.querySelector('select[data-prop="type"]');
        v.value = value || 0;
        p.value = player_id || 0;
        t.value = type || 0;

        // add change handlers
        v.addEventListener('change', event => {
            newStatSubmittor.dataset.value = event.target.value;
            enableStatSubmission(newStatSubmittor);
        });
        p.addEventListener('change', event => {
            newStatSubmittor.dataset.player_id = event.target.value;
            enableStatSubmission(newStatSubmittor);
        });
        t.addEventListener('change', event => {
            newStatSubmittor.dataset.type = event.target.value;
            enableStatSubmission(newStatSubmittor);
        });

        enableStatSubmission(newStatSubmittor);

    } else {
        console.log(report_id);
        newStat = window.templates['stat_view'].cloneNode(true);
        newStat.content.querySelector('.v-row').dataset.stat_id = stat_id;
        newStatSubmittor = newStat.content.querySelector('input[type="button"]');

        newStat.content.querySelector('div[data-prop="type"]').innerText = type;
        newStat.content.querySelector('div[data-prop="value"]').innerText = value;
        newStat.content.querySelector('div[data-prop="player"]').innerText = player_id;
    }
    console.log((document.querySelectorAll(`input[type="button"][value="Add"]`).length < 1));

    
    
    newStatSubmittor.dataset.type = type || '';
    newStatSubmittor.dataset.value = value || '';
    newStatSubmittor.dataset.player_id = player_id || '';
    newStatSubmittor.dataset.report_id = report_id || '';
    newStatSubmittor.dataset.unsent = unsent;
    
    newStatSubmittor.dataset.stat_id = stat_id;

    newStatSubmittor.addEventListener('click', handleStatClick);

    return newStat;
}

async function setupTeamView(team_id, editable) {
    window.stats_ui.state.currentTeam = team_id;
    const players = window.stats_cache.players.filter(el => el.team_id == team_id);
    const newTeamView = window.templates['team_view'].cloneNode(true);
    const newTable = newTeamView.content.querySelector('.v-table');

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

            await setupCache();
            const teamView = await setupTeamView(team_id, true);
            attach('replace', '#interactive', teamView);
        });

        newTable.appendChild(newPlayerPicker);
    }

    return newTeamView;
}

async function post(path, body_data) {
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