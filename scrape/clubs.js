'use strict';

let osmosis = require('osmosis');
let Q = require('q');
let uri = 'http://www.whoscored.com/Teams/';

let teamNumber = process.argv[2];
let proxy = process.argv[3];

if (proxy) {
    osmosis.config({
        proxy: 'http://' + proxy
    });
}


osmosis.get(uri + teamNumber)
    .set({
        'name': '//*[@id="layout-content-wrapper"]/div[1]/div[1]/h1/span',
        'logo': '//*[@id="layout-content-wrapper"]/div[1]/div[1]/h1/img/@src',
        'country': '//*[@id="breadcrumb-nav"]/span[1]/text()',
        'league': '//*[@id="breadcrumb-nav"]/a'
    })
    .data(function (clubInfo) {
        clubInfo.teamNumber = teamNumber;
        console.log(JSON.stringify(clubInfo));
    });


process.on('uncaughtException', function () {
    console.log(JSON.stringify({errCode: 404, teamNumber: teamNumber}));
    process.exit(0);
    //console.log("Node NOT Exiting...");
});