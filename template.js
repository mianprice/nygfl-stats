const initialState = {
    view: '',
    current: new Object(),
    past: new Object(),
    future: new Object(),
};

function reset() {
    window.stats_ui.state = { ...initialState };
}

function attach(action, selector, content) {
    const t = document.createElement('template');
    t.innerHTML = content.trim();
    if (action === 'add-before') {
        document.querySelector(selector).before(...t.content.childNodes);
    } else if (action === 'replace') {
        document.querySelector(selector).replaceChildren(...t.content.childNodes);
    }
}

async function getData() {
    // build relevant query URL
    const path = '';
    const url = `http://localhost:3001/${path}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(error.message);
    }
}
  

function render(data) {
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
        case 'admin_view':
            selector = `#admin_view`;
            newHTML = `
                <h3>Admin Controls</h3>
                <div class="v-row">
                    <input type="button" class="v-item" data-action="edit_team" value="Edit Team"/>
                    <input type="button" class="v-item" data-action="edit_report" value="Edit Stat Report"/>
                    <input type="button" class="v-item" data-action="create_season" value="Create Season"/>
                </div>
            `;
            
            break;
        case 'captain_view':
            selector = `#captain_view`;
            newHTML = `
                <h3>Captain Controls</h3>
                <div class="v-row">
                    <input type="button" class="v-item" data-action="edit_report" value="Edit Stat Report"/>
                    <input type="button" class="v-item" data-action="create_report" value="Create Season"/>
                </div>
            `;
            
            break;
        case 'controls':
            selector = '#controls';
            newHTML = `
                <section id="admin_view"></section>
                <section id="captain_view"></section>
                <section id="player_view"></section>
            `;
            
            break;
        case 'login':
            selector = `#${data.view}`;
            if (localStorage.getItem('logged_in') === 'true') {
                newHTML = `
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

function addToCache(data) {
    if (Array.isArray(data)) {

    } else {

    }
}

window.stats_ui = {
    'render': render,
    'state': { ...initialState },
    'reset': reset
};

function renderLogin() {
    if (localStorage.getItem('logged_in') === 'true') {
        render({
            action: 'replace',
            view: 'login',
            future: JSON.parse(localStorage.getItem('current_user'))
        });
    
        document.querySelector('#login input[type="button"]').addEventListener('click', async e => {
            delete localStorage.current_user;
            delete localStorage.logged_in;
            renderLogin();
        });
    
    } else {
        render({
            action: 'replace',
            view: 'login'
        });
        
        document.querySelector('#login input[type="button"]').addEventListener('click', async e => {
            // try to grab valid user
            try {
                const data = await postData(`/login`, { email: login_email.value });
                console.log(data);
                if (data.length > 0) {
                    localStorage.setItem('current_user', JSON.stringify(data[0]));
                    localStorage.setItem('logged_in', 'true');
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
            render({
                action: 'replace',
                view: 'admin_view'
            });
        }

        if (user.permissions.includes('captain')) {
            render({
                action: 'replace',
                view: 'captain_view'
            });
        }
    } else {
        render({
            action: 'replace',
            view: 'controls'
        });
    }
}

function handleRouting(event) {
    console.log(event.target);
    switch (event.target.dataset.action) {
        case 'edit_team':
            // choose team from list, by season

            // render chosen team

            // add new player by selecting from available or creating new

            // include button with save/view action for confirmation
            break;
        case 'edit_report':
            // choose report from list (by user for captain, by season for admin)

            // render chosen report

            // allow adding new stats

            // include button with save/view action for confirmation

            break;
        case 'create_report':
            // choose week/opponent

            // allow adding new stats

            // include button with save/view action for confirmation

            break;
        case 'create_season':
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




async function postData(path, body_data) {
    console.log(body_data);
    // build relevant query URL
    const url = `http://localhost:3001${path}`;
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
        console.log(json);
        return json;
    } catch (error) {
        console.error(error.message);
    }
}

document.querySelector('#controls').addEventListener('click', handleRouting);


//main
renderLogin();

renderMain();