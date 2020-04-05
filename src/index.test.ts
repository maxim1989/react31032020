import prepareContent from './index';

describe('index.ts:', () => {
  it('function prepareContent, innerHtml:', () => {
    const element: HTMLDivElement = prepareContent('test');
    const innerHTML: string = element.innerHTML;

    expect(innerHTML).toBe('test');
  });

  it('function prepareContent, outerHTML:', () => {
    const element: HTMLDivElement = prepareContent('test');
    const outerHTML: string = element.outerHTML;

    expect(outerHTML).toBe('<div>test</div>');
  });
});
