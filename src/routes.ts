export default [
  {
    route: ['', 'top/:page?'],
    href: 'top',
    name: 'top',
    moduleId: 'views/items',
    nav: true,
    title: 'Top',
    activationStrategy: 'invoke-lifecycle'
  },
  {
    route: 'new/:page?',
    href: 'new',
    name: 'new',
    moduleId: 'views/items',
    nav: true,
    title: 'New',
    activationStrategy: 'invoke-lifecycle'
  },
  {
    route: 'show/:page?',
    href: 'show',
    name: 'show',
    moduleId: 'views/items',
    nav: true,
    title: 'Show',
    activationStrategy: 'invoke-lifecycle'
  },
  {
    route: 'ask/:page?',
    href: 'ask',
    name: 'ask',
    moduleId: 'views/items',
    nav: true,
    title: 'Ask',
    activationStrategy: 'invoke-lifecycle'
  },
  {
    route: 'jobs/:page?',
    href: 'jobs',
    name: 'job',
    moduleId: 'views/items',
    nav: true,
    title: 'Jobs',
    activationStrategy: 'invoke-lifecycle'
  },
  {
    route: 'item/:id',
    name: 'item',
    moduleId: 'views/item',
    nav: false,
    title: 'Item'
  },
  {
    route: 'user/:id',
    name: 'user',
    moduleId: 'views/user',
    nav: false,
    title: 'User'
}];
