'use strict';

import $ from '../../libs/jquery-2.1.4.min.js';
import bsCore from '../helpers/bscore.js';
import Template from '../../libs/mustache.min.js';
import countryService from '../services/countries';

const props = {
  template: `
            {{#rows}}
              <tr>
                {{#countries}}
                  <td>
                      <span>{{name}}</span>
                      <img src="{{flag}}" width="100" />
                  </td>
                {{/countries}}
              </tr>
            {{/rows}}`,
  containerId: '#countries',
  events: {
    'click': [{
      '#countries > tr > td > img': 'onCountrySelect'
    }]
  },
  itemsPerRow: 5
};

const events = {
  onCountrySelect(e) {
    console.log(e.target);
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


exports.init = function () {
  const el = $(props.containerId);

  return countryService.getAll()
    .then(function (countries) {
      const countriesArray = createCountriesList(countries);

      const templ = Template.render(props.template, { rows: countriesArray });

      bsCore.bindEvents(props.events, events);
      el.html(templ);
    });
};
