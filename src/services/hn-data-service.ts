import {autoinject} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
// import {HttpClient} from 'aurelia-fetch-client';

@autoinject()
export default class HackerNewsDataService {

  public top = [];
  public topPages = 1;
  public 'new' = [];
  public newPages = 1;
  public show = [];
  public showPages = 1;
  public ask = [];
  public askPages = 1;
  public jobs = [];
  public jobsPages = 1;

  constructor(private ea: EventAggregator) {
    ea.subscribe('hackernews:data:update', data => {
      this[data.type].push(data.item);
      this[`${data.type}Pages`] = Math.ceil(this[data.type].length / 30);
    });
  }

  public getData(type) {
    if (this[type].length === 0) {
      this.ea.publish('hackernews:data:get', type);
    } else {
      this.ea.publish('hackernews:data:done');
    }
  }

  public getUser(name) {
    return null;
  }
}
