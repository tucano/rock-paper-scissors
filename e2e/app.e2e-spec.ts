import { AppPage } from './app.po';

describe('rock-paper-scissors App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Rock, Paper, Scissors!');
  });
});
