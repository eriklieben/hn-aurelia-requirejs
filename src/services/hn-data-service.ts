import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@autoinject()
export default class HackerNewsDataService {

  constructor(private http: HttpClient) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://node-hnapi.herokuapp.com/');
    });
  }

  public getItems(type: string, page: number) {
    let request = type;
    if (page && page > 0) {
      request += `?page=${page}`;
    }
    return this.http.fetch(request).then(response => response.json());
  }

  public getItem(id: number) {
    return this.http.fetch(`item/${id}`).then(response => response.json());
  }
}
