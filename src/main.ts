import {Aurelia} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import environment from './environment';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('css-modules')
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  const ea = <EventAggregator> aurelia.container.get(EventAggregator);
  if ((<any> window).Worker) {
    const worker = new Worker('worker.js');
    worker.onmessage = event => {
      ea.publish(event.data.message, event.data);
    };
    ea.subscribe('hackernews:data:get', data => {
      worker.postMessage({ message: 'hackernews:data:get', type: data.type, page: data.page });
    });
  }

  aurelia.start().then(() => aurelia.setRoot());
}
