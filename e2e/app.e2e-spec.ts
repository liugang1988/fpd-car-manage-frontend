import { NgTestdemoPage } from './app.po';

describe('ng-testdemo App', () => {
  let page: NgTestdemoPage;

  beforeEach(() => {
    page = new NgTestdemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
