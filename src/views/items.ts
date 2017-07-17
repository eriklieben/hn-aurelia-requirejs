import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import DataService from './../services/hn-data-service';

@autoinject()
export class Items {
  public page: number = 1;
  public href: string;
  public type: string = '';
  public loading = false;

  constructor(private ea: EventAggregator, public data: DataService) {
  }

  public activate(params, navigationInstruction) {
    this.type = navigationInstruction.name;
    this.href = navigationInstruction.href;
    this.page = (params.page) ? Number.parseInt(params.page, 10) : 1;
    this.loading = true;
    this.data.getData(this.type);

    this.ea.subscribe('hackernews:data:done', () => {
      this.loading = false;
    });
  }
}
