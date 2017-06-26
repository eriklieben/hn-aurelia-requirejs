import { bindable, computedFrom } from 'aurelia-framework';

export class ItemNavCustomElement {

  @bindable()
  public type: string;

  @bindable()
  public page: number;

  @bindable()
  public lastPage: boolean;

  @computedFrom('type', 'page', 'lastPage')
  public get next() {
    if (this.lastPage) {
      return '';
    }
    return `/${this.type}/${this.page + 1}`;
  }

  @computedFrom('type', 'page')
  public get prev() {
    if (this.page === 1) {
      return '';
    }
    return `/${this.type}/${this.page - 1}`;
  }

}
