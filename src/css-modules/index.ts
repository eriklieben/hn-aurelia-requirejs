import {FrameworkConfiguration} from 'aurelia-framework';
import {ViewEngine, ViewResources, resource, View} from 'aurelia-templating';
import {SyntaxInterpreter} from 'aurelia-templating-binding';
import {Container} from 'aurelia-dependency-injection';
import {DOM} from 'aurelia-pal';
import {Loader} from 'aurelia-loader';

export function configure(config: FrameworkConfiguration) {
  let viewEngine = config.container.get(ViewEngine);

  viewEngine.addResourcePlugin('.css#module', {
    fetch(address: string) {
      let cssFile = address.replace('.css#module', '.css');
      let styleModule = address.replace('.css#module', '.css.json');
      return Promise.resolve(createCSSModuleResource(cssFile, styleModule));
    }
  });

  let proto = SyntaxInterpreter.prototype;
  let original = proto.handleUnknownCommand;

  proto.handleUnknownCommand = function(r: ViewResources, e: Element, i: any, ei?: any, c?: any) {
    if (i.attrName === 'styles') {
      i.attrName = 'class';
      i.attrValue = '$styles[\'' + i.command + '\']';
      return this['one-time'](r, e, i, ei, c);
    } else {
      return original.call(this, r, e, i, ei, c);
    }
  };
}

function createCSSModuleResource(cssFile, styleModule) {
  @resource(new CSSModuleResource(cssFile, styleModule))
  class DynamicResource { }

  return {
    'Dynamic': DynamicResource
  };
}

export class CSSModuleResource {
  public css: string;
  public resources: ViewResources;
  public container: Container;
  private hooks: CSSModuleViewEngineHooks;

  constructor(private cssFile: string, private styleModule: string) {}

  public initialize(container: Container): void {
    this.container = container;
    this.hooks = new CSSModuleViewEngineHooks();
  }

  public register(registry: ViewResources): void {
    registry.registerViewEngineHooks(this.hooks);
  }

  public load(container: Container): Promise<CSSModuleResource> {
    let loader = <Loader> container.get(Loader);

    return loader.loadText(this.cssFile).then(cssContent => {
      this.hooks.css = cssContent;
    }).then(() => {
      return loader.loadText(this.styleModule).then(styleModuleJSON => {
        this.hooks.styleObject = JSON.parse(styleModuleJSON);
        return this;
      });
    });
  }
}

class CSSModuleViewEngineHooks {
  public css: string;
  public styleObject: any;

  private styleElementParent: Node;
  private styleElement: HTMLStyleElement;
  private count = 0;

  public beforeBind(view: View) {
    const stylesVariable = '$styles';
    let overrideContext: any = view.overrideContext;
    let $styles = overrideContext[stylesVariable] || {};

    overrideContext[stylesVariable] = Object.assign(
      $styles, this.styleObject
    );

    if (this.count === 0) {
      this.ensureStyleElementIsAddedToDocument();
      this.count = 1;
    } else {
      this.count++;
    }
  }

  public beforeUnbind(view: View) {
    this.count--;

    if (this.count === 0) {
      this.removeStyleElement();
    }
  }

  private ensureStyleElementIsAddedToDocument() {
    if (this.styleElement === undefined) {
      this.styleElement = <HTMLStyleElement> DOM.injectStyles(this.css);
    } else if (!this.styleElement.parentNode) {
      this.styleElementParent.appendChild(this.styleElement);
    }
  }

  private removeStyleElement() {
    this.styleElementParent = this.styleElement.parentNode;
    DOM.removeNode(this.styleElement);
  }
}
