import { bindable, computedFrom, customElement } from 'aurelia-framework';

@customElement('item-nav')
export class ItemNavCustomElement {

  @bindable()
  public type: string;

  @bindable()
  public page: number;

  @bindable()
  public pages: number;

  @computedFrom('type', 'page', 'pages')
  public get next() {
    return `/${this.type}/${ this.canGoNext ? this.page + 1 : this.page}`;
  }

  @computedFrom('page', 'pages')
  public get canGoNext() {
    return this.page < this.pages;
  }

  @computedFrom('type', 'page')
  public get prev() {
    return `/${this.type}/${ this.canGoPrev ? this.page - 1 : this.page}`;
  }

  @computedFrom('page')
  public get canGoPrev() {
    return this.page > 1;
  }
}
