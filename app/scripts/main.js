'use strict';

import $ from '../libs/jquery-2.1.4.min.js';
import country from './controllers/countries';


$(document).ready(function () {
  country.init();
});
