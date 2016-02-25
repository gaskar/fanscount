'use strict';

var uri = 'http://www.whoscored.com/';
var casper = require('casper').create();

casper.on("remote.message", function (msg) {
    console.log(msg);
});


casper.start(uri, function () {
    this.evaluate(function () {
        try {
            var obj = {};
            jQuery('[href=#domestic]').click();
            jQuery('#domestic a[data-value=All]').click();

            jQuery('#domestic #domestic-regions .regions > li > a').each(function () {
                var key = $(this).text();
                obj[key] = [];

                var parent = $(this).parent();
                $(parent).find('>.tournaments > li > a').each(function () {
                    obj[key].push({
                        leagueName: $(this).text(),
                        leagueUrl: $(this).attr('href')
                    });
                });
            });

            console.log(JSON.stringify(obj));

        } catch (err) {
            console.log(err);
        }
    });


});

casper.run();