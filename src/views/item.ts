import { autoinject } from 'aurelia-framework';
import DataService from './../services/hn-data-service';

@autoinject()
export class ItemView {

  public item: any;

  constructor(private service: DataService) {
  }

  public activate(params, navigationInstruction) {
    return this.service.getItem(params.id).then(item => {
      this.item = item;
    });
  }
}
