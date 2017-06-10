import { DrawAndGuessPage } from './app.po';

describe('draw-and-guess App', () => {
  let page: DrawAndGuessPage;

  beforeEach(() => {
    page = new DrawAndGuessPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
