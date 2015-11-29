'use strict';

let osmosis = require('osmosis');
let uri = 'http://www.whoscored.com/Teams/';

let teamNumber = process.argv[2];
let proxy = process.argv[3];

osmosis.config({
    proxy: 'http://' + proxy
});

osmosis.get(uri + teamNumber)
    .set({
        'name': '//*[@id="layout-content-wrapper"]/div[1]/div[1]/h1/span',
        'logo': '//*[@id="layout-content-wrapper"]/div[1]/div[1]/h1/img/@src',
        'country': '//*[@id="breadcrumb-nav"]/span[1]/text()',
        'league': '//*[@id="breadcrumb-nav"]/a'
    })
    .data(function(clubInfo) {
        clubInfo.teamNumber = teamNumber;
        console.log(JSON.stringify(clubInfo));
    });