'use strict';

import $ from '../../libs/jquery-2.1.4.min.js';

exports.bindEvents = function (eventsObj, eventsFunc) {
  const eventNames = Object.keys(eventsObj);

  for (let i = 0; i < eventNames.length; i++) {
    const elements = eventsObj[eventNames[i]];
    for (let j = 0; j < elements.length; j++) {
      const element = Object.keys(elements[j]);
      $('body').on(eventNames[i], element, eventsFunc[eventsObj[eventNames[i]][j][element]]);
    }
  }
};
