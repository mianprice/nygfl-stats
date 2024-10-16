let lib = require('csv-transpose');
let fs = require('node:fs');
let separator = ',';

const results = {
    "QB TDs": [],
    "Non-QB TDs": [],
    "Interceptions": [],
    "XP Conversions": [],
    "Sacks": []
};

const resultsMap = {
    "Number of QB touchdowns (throwing or rushing) ": "QB TDs",
    "Number of touchdowns per player (non-QB): ": "Non-QB TDs",
    "Successful Point After Conversions (1 or 2): ": "Interceptions",
    "Number of interceptions per player: ": "XP Conversions",
    "Number of sacks per player: ": "Sacks"
};

const playerNameRegex = /\[(.*?)\]/;
const categoryRegex = /^(.*)?\[/;

fs.readFile('./week3.csv', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const transposedData = lib.transpose(data, separator);

    // for debugging iteration
    // fs.writeFileSync('week3_transposed.csv', data);

    // break data into lines
    const rows = transposedData.split('\n\n')[0].split('\n');

    // go through transposed rows, skipping irrelevant form data on lines 1-3
    for (var i = 3; i < rows.length - 1; i++) {
        let row = rows[i].split(',');

        // console.log(row[0]);

        let category = row[0].match(categoryRegex)[1];

        let values = row.slice(1);

        let value = values.reduce((a, b) => a + (isNaN(parseInt(b)) ? 0 : parseInt(b)), 0);

        if (value > 0) {
            let record = {
                name: row[0].match(playerNameRegex)[1],
                value
            };

            results[resultsMap[category]].push(record);
        }
    };

    const prettyResults = {};

    Object.keys(results).forEach(key => {
        results[key] = results[key].sort((a, b) => b.value - a.value);

        prettyResults[key] = {};

        results[key].forEach(el => {
            if (Array.isArray(prettyResults[key][el.value])) {
                prettyResults[key][el.value].push(el.name);
            } else {
                prettyResults[key][el.value] = [el.name];
            }
        });

        console.log(`\n\n${key}\n`);
        Object.keys(prettyResults[key]).reverse().forEach(number => {
            console.log(`${number}: ${prettyResults[key][number].join(', ')}`);
        })
    });
});



