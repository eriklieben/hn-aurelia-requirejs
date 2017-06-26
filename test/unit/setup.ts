import 'aurelia-polyfills';
import {initialize} from 'aurelia-pal-nodejs';
initialize();

import 'whatwg-fetch';

import {Container} from 'aurelia-dependency-injection';
Container.instance = new Container();
