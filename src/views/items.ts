import { autoinject } from 'aurelia-framework';
import DataService from './../services/hn-data-service';

@autoinject()
export class TopView {
  public items: Array<any> = [];
  public page: number = 1;
  public pages: number = 1;
  public href: string;
  public type: string = '';

  constructor(private service: DataService) {
  }

  public activate(params, navigationInstruction) {
    this.type = navigationInstruction.name;
    this.href = navigationInstruction.href;
    this.page = (params.page) ? Number.parseInt(params.page, 10) : 1;

    return this.service.getItems(this.type, this.page).then(result => {
      this.items = result.items;
      this.pages = result.totalPages;
    });
  }
}
