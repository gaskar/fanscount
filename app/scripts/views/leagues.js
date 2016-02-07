import $ from '../../libs/jquery-2.1.4.min.js'
import leaguesService from '../services/leagues'
import bsCore from '../helpers/bscore'
import Template from '../../libs/mustache.min.js'


const props = {
    template: `
            {{#rows}}
              <tr>
                {{#leagues}}
                  <td data-leagues-id="{{_id}}">
                      <span>{{name}}</span>
                  </td>
                {{/leagues}}
              </tr>
            {{/rows}}`,
    container: '#leagues',
    events: {
        'click': [{
            'tr > td': 'onCountrySelect'
        }]
    },
    itemsPerRow: 5
};

const createLeaguesList = function (leagues) {
    const leaguesArray = [];
    const itemsPerRow = props.itemsPerRow;

    for (let i = 0; i < leagues.length; i++) {
        const position = parseInt(i / itemsPerRow, 10);

        if (i % itemsPerRow === 0) {
            leaguesArray[position] = {
                leagues: []
            };
        }

        leaguesArray[position].leagues.push(leagues[i]);
    }

    return leaguesArray;
};

exports.init = function (countryId) {
    const el = $(props.container);

    return leaguesService.getByCountry(countryId)
        .then(function (leagues) {
            const leaguesArray = createLeaguesList(leagues);
            const templ = Template.render(props.template, { rows: leaguesArray });
            bsCore.bindEvents.apply(props, [events]);
            el.html(templ);
        });
};
