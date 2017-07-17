import { autoinject } from 'aurelia-framework';
import DataService from './../services/hn-data-service';

@autoinject()
export class ItemView {

  public item: any;
  public comments: any = [];

  constructor(public data: DataService) {
  }

  public async activate(params, navigationInstruction) {
    // this.service.fetchItem(params.id).then(item => {
    //   this.item = item;
    //   console.log(this.item);
    //   this.service.fetchItems(this.item.kids).then(result => {
    //     console.log(result);
    //     this.comments = result;
    //   })
    // })
    // this.item = (await this.service.getItem(params.id))[0];
    // this.service.getKids(params.id).then(comments => {
    //   for (let comment in comments) {
    //     if (comments[comment]) {

    //       if (!comments[comment].level) {
    //         comments[comment].level = 0;
    //       } else {
    //         comments[comment].level += 1;
    //       }

    //       for (let kid of comments[comment].kids || []) {
    //         if (!comments[kid].level) {
    //           comments[kid].level = 0;
    //         }
    //         comments[kid].level += 1;
    //       }
    //       this.comments.push(comments[comment]);
    //     }
    //   }
    // });
  }
}
