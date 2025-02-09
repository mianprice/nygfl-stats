console.log('hello')

// load it up
// const teamNames = Object.keys(teams);

// const teamsOptions = teamNames.reduce((prev, team) => {
//     return `${prev}<option value="${team}">${team}</option>`
// // }, '<option value="team" selected disabled>Team</option>');

// team.innerHTML = teamsOptions;
// team.addEventListener('change', (e) => {
//     window.report.team = e.target.value;
//     player.innerHTML = resetPlayers(window.teams, e.target.value);
//     checkAddable();
// });

// player.addEventListener('change', checkAddable);
// type.addEventListener('change', checkAddable);
// number.addEventListener('change', checkAddable);

// function checkAddable() {
//     if (window.team.value && window.player.value && window.number.value && window.type.value) {
//         window.add.disabled = false;
//     } else {
//         window.add.disabled = true;
//     }
//     console.log('checker')
// }

// function resetPlayers(teams, team) {
//     return teams[team].players.reduce((prev, player) => {
//         return `${prev}<option value="${player.name}">${player.name}</option>`
//     }, '<option value="player" selected disabled>--</option>');
// }

// const blankReport = {
//     email: '',
//     team: '',
//     stat_records: []
// };

// window.report = { ...blankReport };

// clearButton.addEventListener('click', e => {
//     window.report = {
//         email: window.email.value,
//         team: window.team.value,
//         stat_records: []
//     };
//     renderRows(window.report.stat_records);
// });

// submitButton.addEventListener('click', e => {
//     console.log('submitted');
//     console.log(window.report);
// });

// email.addEventListener('change', e => {
//     window.report.email = e.target.value;
// });

// add.addEventListener('click', e => {
//     window.report.stat_records.push({
//         type: window.type.value,
//         count: parseInt(window.number.value),
//         name: window.player.value
//     });
//     renderRows(window.report.stat_records);
//     resetEntry();
//     checkAddable();
// });

// function renderRows(collection) {
//     window.summary.innerHTML = collection.reduce((prev, item) => {
//         return `${prev}<div class="row"><div>${item.type}</div><div>${item.count}</div><div>${item.name}</div></div>`;
//     }, '<div class="row"><div>Type</div><div>Count</div><div>Player</div></div>');
// }

// function resetEntry() {
//     resetPlayers(window.teams, window.report.team);
//     window.number.value = undefined;
//     window.type.value = type;
// }

// // display
// function render(params) {
//     // generate html
//     const testarea = ```
        
//     ```;
//     // inject into dom
// }


window.req_send.addEventListener('click', async e => {
    console.log(`
        req_type: ${window.req_type.value}
        req_body: ${window.req_body.value}
        req_path: ${window.req_path.value}
    `)
    const options = {
        method: window.req_type.value
    };
    if (window.req_type.value !== 'get') {
        options.body = JSON.parse(window.req_body.value)
    }
    const response = await fetch(req_path.value, options).then(response => response.json());

    console.log('response: ', response);
});











