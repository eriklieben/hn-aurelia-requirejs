import { autoinject } from 'aurelia-framework';
import DataService from './../services/hn-data-service';

@autoinject()
export class TopView {
  public items: Array<any> = [];
  public page: number = 1;
  public lastPage = false;
  public href: string;
  public type: string = '';

  constructor(private service: DataService) {
  }

  public activate(params, navigationInstruction) {
    this.type = navigationInstruction.name;
    this.href = navigationInstruction.href;
    if (params.page) {
      this.page = Number.parseInt(params.page, 10);
    } else {
      this.page = 1;
    }
    return this.service.getItems(this.type, this.page).then(items => {
      this.items = items;
      if (this.items.length < 30) {
        this.lastPage = true;
      }
    });
  }
}
