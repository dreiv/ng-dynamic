import { NgDynamicPage } from './app.po';

describe('ng-dynamic App', function() {
  let page: NgDynamicPage;

  beforeEach(() => {
    page = new NgDynamicPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
