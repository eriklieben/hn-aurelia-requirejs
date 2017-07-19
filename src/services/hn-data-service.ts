import {autoinject} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

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
      this[data.type] = data.items;
      this[`${data.type}Pages`] = data.pages;
    });
  }

  public getData(type, page) {
    this.ea.publish('hackernews:data:get', { type, page });
  }

  public getUser(name) {
    return null;
  }
}
