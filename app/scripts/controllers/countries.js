'use strict';

import $ from '../../libs/jquery-2.1.4.min.js';
import Template from '../../libs/mustache.min.js';
import countryService from '../services/countries';

const props = {
  template: `<tr>
                <td>
                    <span>{{name}}</span>
                    <img src="{{flag}}" width="100" />
                </td>
             </tr>`,
  className: '',
  containerId: '#countries'
};

exports.init = function() {
  var el = $(props.containerId);
  // console.log()
  return countryService.getAll()
    .then(function(countries) {
        countries.forEach(function(country) {
          let countryEl = Template.render(props.template, country);

          el.append(countryEl);
      });
    });
};
