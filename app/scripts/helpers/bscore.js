'use strict';

import $ from '../../libs/jquery-2.1.4.min.js';

exports.bindEvents = function (eventsFunc) {
  const eventNames = Object.keys(this.events);

  for (let i = 0; i < eventNames.length; i++) {
    const elements = this.events[eventNames[i]];
    for (let j = 0; j < elements.length; j++) {
      const element = Object.keys(elements[j]);

      const self = this;

      $(this.container).on(eventNames[i], element[0], eventsFunc[self.events[eventNames[i]][j][element]]);
    }
  }
};
