import { DrawAndGuessGamePage } from './app.po';

describe('draw-and-guess-game App', () => {
  let page: DrawAndGuessGamePage;

  beforeEach(() => {
    page = new DrawAndGuessGamePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
