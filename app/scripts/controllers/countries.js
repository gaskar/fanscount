'use strict';

import $ from '../../libs/jquery-2.1.4.min.js';
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
  itemsPerRow: 5
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
  // console.log()
  return countryService.getAll()
    .then(function (countries) {
      const countriesArray = createCountriesList(countries);

      el.html(Template.render(props.template, { rows: countriesArray }));
    });
};
