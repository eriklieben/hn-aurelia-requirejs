import {FrameworkConfiguration} from 'aurelia-framework';
import {Container} from 'aurelia-dependency-injection';
import { metadata } from 'aurelia-metadata';
import { configure } from './index';

describe('configure', () => {

  it(`must register a resource plugin for '.css#module'`, () => {

    // arrange
    let config = FrameworkConfiguration.prototype;
    config.container = Container.prototype;
    const viewEngine = { addResourcePlugin : jest.fn() };
    config.container.get = jest.fn().mockReturnValue(viewEngine);

    // act
    configure(config);

    // assert
    expect(viewEngine.addResourcePlugin).toBeCalledWith('.css#module', expect.anything());

  });

  it(`must remove #module prefix from the css file resource`, async () => {

    // arrange
    let config = FrameworkConfiguration.prototype;
    config.container = Container.prototype;
    let fetchObj = undefined;
    const viewEngine = { addResourcePlugin : (name, obj) => fetchObj = obj};
    config.container.get = jest.fn().mockReturnValue(viewEngine);

    // act
    configure(config);
    let x = await fetchObj.fetch('file.css#module');

    // assert
    const cssModuleResource = <any> metadata.get(metadata.resource, x.Dynamic);
    expect(cssModuleResource.cssFile).toBe('file.css');

  });

  it(`must remove #module prefix and add .json for the the css object mapping file resource`, async () => {

    // arrange
    let config = FrameworkConfiguration.prototype;
    config.container = Container.prototype;
    let fetchObj = undefined;
    const viewEngine = { addResourcePlugin : (name, obj) => fetchObj = obj};
    config.container.get = jest.fn().mockReturnValue(viewEngine);

    // act
    configure(config);
    let x = await fetchObj.fetch('file.css#module');

    // assert
    const cssModuleResource = <any> metadata.get(metadata.resource, x.Dynamic);
    expect(cssModuleResource.styleModule).toBe('file.css.json');

  });

});
