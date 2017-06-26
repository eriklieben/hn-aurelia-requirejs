import {Router, RouterConfiguration} from 'aurelia-router';
import routes from './routes';

export class App {

  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia HN';
    config.options.pushState = true;
    config.map(routes);

    this.router = router;
  }
}
