import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@autoinject()
export default class HackerNewsDataService {

  private itemsPerPage = 30;

  constructor(private http: HttpClient) {
    http.configure(config => {
      config
        .useStandardConfiguration();
    });
  }

  public async getItems(type: string, page: number) {
    const response = await this.http.fetch(`/hackernews/${type}/all`);
    const items = await response.json();
    const count = Math.ceil(items.length / this.itemsPerPage);
    const begin = page > 0 ? (page - 1) * count : 0;
    const end = page > 0 ? begin + count : items.length;
    return {
      totalPages: count,
      items: items.slice(begin, end)
    };
  }

  public async getUser(username: string) {
    let response = await this.http.fetch(`/hackernews/user/${username}`);
    return await response.json();
  }

  public async getItem(id: number) {
    let response = await this.http.fetch(`/hackernews/item/${id}`);
    return await response.json();
  }

  public async getKids(id: number) {
    let response = await this.http.fetch(`/hackernews/kids/${id}`);
    return response.json();
  }
}
