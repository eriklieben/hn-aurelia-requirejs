import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    './elements/item-list.html',
    './elements/item-nav',
    './elements/comments.html',
    './elements/comment.html'
  ]);
}
