import { autoinject } from 'aurelia-framework';
import DataService from './../services/hn-data-service';

@autoinject()
export class User {

  private user;

  constructor(private service: DataService) {
  }

  public activate(params, navigationInstruction) {
    const username = params.id;

    return this.service.getUser(username).then(result => {
      this.user = result;
    });
  }
}
