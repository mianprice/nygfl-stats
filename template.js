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

function attach(selector, content) {
    const t = document.createElement('template');
    t.innerHTML = content.trim();
    console.log(t.content.childNodes);
    console.log(t);
    document.querySelector(selector).before(...t.content.childNodes);
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
    // if (data.awaitData) {
    //     data.future = await getData();
    // }
    switch (data.view) {
        case 'player':
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
            // prob admin tools like:
            // request debugger
            // batch upload tool
            
            break;
        case 'login':
            // prob email/phone + cookie
                    
    }

    // actually insert
    attach(`#${data.view}.v-table .edit-interface`, newHTML);
}



window.stats_ui = {
    'render': render,
    'state': { ...initialState },
    'reset': reset
};

render({
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
