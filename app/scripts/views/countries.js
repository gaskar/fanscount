'use strict';

import $ from '../../libs/jquery-2.1.4.min.js';
import bsCore from '../helpers/bscore.js';
import Template from '../../libs/mustache.min.js';
import countryService from '../services/countries';
import leagues from './leagues'


const props = {
  template: `
            {{#rows}}
              <tr>
                {{#countries}}
                  <td data-country-id="{{_id}}">
                      <span>{{name}}</span>
                      <img src="{{flag}}" width="100" />
                  </td>
                {{/countries}}
              </tr>
            {{/rows}}`,
  container: '#countries',
  events: {
    'click': [{
      'tr > td': 'onCountrySelect'
    }]
  },
  itemsPerRow: 5
};

const events = {
  onCountrySelect(e) {
    //console.log(leagues)
    leagues.init($(this).data('country-id'));
    //console.log(self);
    //console.log($(this).data('country-id'));
    // console.log($(e.target));
  }
};

/*
  output example {rows: [countries: [], countries[]]}
*/
const createCountriesList = function (countries) {
  const countriesArray = [];
  const itemsPerRow = props.itemsPerRow;

  for (let i = 0; i < countries.length; i++) {
    const position = parseInt(i / itemsPerRow, 10);

    if (i % itemsPerRow === 0) {
      countriesArray[position] = {
        countries: []
      };
    }

    countriesArray[position].countries.push(countries[i]);
  }

  return countriesArray;
};

//const createLeaguesList = function (leagues) {
//  const leaguesArray = [];
//  const itemsPerRow = props.itemsPerRow;
//
//  for (let i = 0; i < leagues.length; i++) {
//    const position = parseInt(i / itemsPerRow, 10);
//
//    if (i % itemsPerRow === 0) {
//      leaguesArray[position] = {
//        countries: []
//      };
//    }
//
//    leaguesArray[position].countries.push(leagues[i]);
//  }
//
//  return leaguesArray;
//};


exports.init = function () {
  const el = $(props.container);

  return countryService.getAll()
    .then(function (countries) {
      const countriesArray = createCountriesList(countries);

      const templ = Template.render(props.template, { rows: countriesArray });

      bsCore.bindEvents.apply(props, [events]);
      el.html(templ);
    });
};
