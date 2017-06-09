import { DrawAndGuessGamePage } from './app.po';

describe('draw-and-guess-game App', function() {
  let page: DrawAndGuessGamePage;

  beforeEach(() => {
    page = new DrawAndGuessGamePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
