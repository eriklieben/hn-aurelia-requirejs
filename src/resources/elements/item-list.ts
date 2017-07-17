import { bindable, customElement } from 'aurelia-framework';

@customElement('item-list')
export default class ItemListCustomElement {

  @bindable()
  public items = [];

  @bindable()
  public page = 0;
}

export class PageValueConverter {
  public toView(value, page) {
    return value.slice((page - 1) * 30, page * 30);
  }
}
