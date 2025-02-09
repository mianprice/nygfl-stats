const initialState = {
    view: '',
    // awaitData: false,
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
  

async function render(data) {
    let newHTML;
    let selector;
    // if (data.awaitData) {
    //     data.future = await getData();
    // }
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
        case 'admin':
            selector = `#${data.view}.v-table .edit-interface`;
            // prob admin tools like:
            // request debugger
            // batch upload tool
            
            break;
        case 'login':
            selector = `#${data.view}`;
            console.log(JSON.parse(localStorage.getItem('current_user')));
            // prob email/phone + cookie
            if (localStorage.getItem('logged_in') === 'true') {
                newHTML = `
                    <div class="v-item" id="username">${JSON.parse(localStorage.current_user).name}</div>
                    <input class="v-item" type="button" value="Logout" id="logout_button">
                `;
            } else {
                newHTML = `
                    <input class="v-item" type="email" name="email" id="login_email">
                    <input class="v-item" type="button" value="Login" id="login_button" disabled>
                `;
            }

                    
    }

    // actually insert
    attach(data.action, selector, newHTML);

    return;
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

/*

render({
    action: 'replace',
    view: 'player',
    future: {
        players: [{
            name: 'test name',
            player_id: 1,
            user_id: 1,
            createdAt: 'sometime',
            team_id: 1
        }]
    }
});
render({
    action: 'replace',
    view: 'report',
    future: {
        reports: [{
            report_id: 1,
            user_id: 1,
            createdAt: 'sometime',
            stats: [{
                name: 'test name',
                id: 1,
                report_id: 1,
                createdAt: 'sometime',
                player_id: 1
            }]
        }]
    }
});
render({
    action: 'replace',
    view: 'stat',
    future: {
        stats: [{
            name: 'test name',
            value: 7,
            id: 1,
            report_id: 1,
            createdAt: 'sometime',
            player_id: 1
        }]
    }
});
render({
    action: 'replace',
    view: 'team',
    future: {
        teams: [{
            name: 'test name',
            team_id: 1,
            captain: 1,
            createdAt: 'sometime',
            season_id: 1,
            players: [{
                name: 'test name',
                player_id: 1,
                user_id: 1,
                createdAt: 'sometime',
                team_id: 1
            }]
        }]
    }
});
render({
    action: 'replace',
    view: 'season',
    future: {
        seasons: [{
            name: 'test name',
            season_id: 1,
            createdAt: 'sometime',
            teams: [{
                name: 'test name',
                team_id: 1,
                captain: 1,
                createdAt: 'sometime',
                season_id: 1,
                players: [{
                    name: 'test name',
                    player_id: 1,
                    user_id: 1,
                    createdAt: 'sometime',
                    team_id: 1
                }]
            }]
        }]
    }
});
render({
    action: 'replace',
    view: 'user',
    future: {
        users: [{
            name: 'test name',
            user_id: 1,
            email: 'test email',
            phone: '1235557890',
            createdAt: 'sometime'
        }]
    }
});

*/




if (localStorage.getItem('logged_in') === 'true') {
    render({
        action: 'replace',
        view: 'login',
        future: JSON.parse(localStorage.getItem('current_user'))
    }).then(() => {
        document.querySelector('#logout_button').addEventListener('click', async e => {
            delete localStorage.current_user;
            delete localStorage.logged_in;
            render({
                action: 'replace',
                view: 'login'
            });
        });
    });
    
} else {
    render({
        action: 'replace',
        view: 'login'
    }).then(() => {
        document.querySelector('#login_button').addEventListener('click', async e => {
            // try to grab valid user
            try {
                const data = await postData(`/login`, { email: login_email.value });
                console.log(data);
                if (data.length > 0) {
                    localStorage.setItem('current_user', JSON.stringify(data[0]));
                    localStorage.setItem('logged_in', 'true');
                    render({
                        action: 'replace',
                        view: 'login',
                        future: data[0]
                    });
                }
            } catch (error) {
                console.error(error);
            }
        });
        document.querySelector('#login_email').addEventListener('change', e => {
            console.log(login_email.value);
            if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(login_email.value)) {
                login_button.disabled = false;
            }
        });
    });
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