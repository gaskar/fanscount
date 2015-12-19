'use strict';

const request = require('cogent');
const co = require('co');
const Q = require('q');
const uri = 'https://en.wikipedia.org/wiki/Gallery_of_sovereign_state_flags';
const fs = require('fs');

require('../schemas/country');


const mongoose = require('mongoose-q')(require('../node_modules/mongoose')),
    Country = mongoose.model('Country');


mongoose.connect('mongodb://localhost/fanscount');

const countryMap = {
  'England': 'United Kingdom',
  'USA': 'United States',
  'Congo, DR': 'Congo',
  'UAE': 'United Arab Emirates',
  'Viet Nam': 'Vietnam',
  'Macao': 'Macau',
  'Northern Ireland': 'St Patrick',
  'Ivory Coast': 'Ivoire',
  'Taiwan': 'Republic of China'
};

const additionalFlags = [
  'https://upload.wikimedia.org/wikipedia/commons/b/bb/Flag_of_Scotland_%28traditional%29.svg',
  'https://upload.wikimedia.org/wikipedia/commons/5/59/Flag_of_Wales_2.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/20/St_Patrick%27s_saltire.svg',
  'https://upload.wikimedia.org/wikipedia/commons/3/3c/Flag_of_the_Faroe_Islands.svg',
  'https://upload.wikimedia.org/wikipedia/commons/5/5b/Flag_of_Hong_Kong.svg',
  'https://upload.wikimedia.org/wikipedia/commons/5/52/Flag_of_Martinique.svg',
  'https://upload.wikimedia.org/wikipedia/commons/b/bf/Flag_of_Bermuda.svg',
  'https://upload.wikimedia.org/wikipedia/commons/6/63/Flag_of_Macau.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/28/Flag_of_Puerto_Rico.svg',
  'https://upload.wikimedia.org/wikipedia/commons/7/7d/Flag_of_Guadeloupe_%28local%29_variant.svg'
];

co(function*() {
  let result = yield *request(uri, {string: true});
  let countries = yield Country.find().select('name');

  let flagsRegExp = /src="(\/\/upload\S+)"/g;
  let flags = [];
  while(true) {
      let match = flagsRegExp.exec(result.text);

      if(!match) break;

      let flag = 'https:' + match[1].replace(/\/\d+px.*/, '').replace('thumb/', '');

      if(/flag/i.test(match[1])) {
        flags.push(flag);
      }

  }

  flags = flags.concat(additionalFlags);

  for(let i = 0; i < countries.length; i++) {
    for(let j = 0; j < flags.length; j++) {
      let countryRegexp = new RegExp(countries[i].name.replace(/\s/g, '_'), 'gi');
      if(countryMap[countries[i].name]) {
          countryRegexp = new RegExp(countryMap[countries[i].name].replace(/\s/g, '_'), 'gi');
      }
      if(countryRegexp.test(flags[j])) {
        countries[i].flag = flags[j];
        break;
      }
    }
    yield countries[i].save();

  }

  console.log('flags are added to db');
  process.exit(0);
});
