'use strict';

let childProcess = require('child_process'),
    fs = require('fs');

let scraper = childProcess.spawn('casperjs', ['leagues.js']),
    leagues = '';

scraper.stdout.on('data', function(stdout) {
    leagues += stdout;
});

scraper.on('exit', function() {
    fs.writeFile('leagues.json', leagues, function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
});

