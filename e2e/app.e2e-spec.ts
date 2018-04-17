import { AppPage } from './app.po';

describe('rock-paper-scissors App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the title', () => {
    page.navigateTo();
    expect(page.getAppTitle()).toEqual('Rock, Paper, Scissors!');
  });

  it('should have a gameboard', () => {
    expect(page.getGameBoard()).toBeDefined();
  });

  it('should gameboard be empty at start', () => {
    expect(page.getGameBoard().getText()).toBe('');
  });

  it('should contain 3 mat-icon-buttons', () => {
    page.navigateTo();
    expect(page.getHandButtons().count()).toEqual(3);
  });

  it('should have a button Rock', () => {
    page.navigateTo();
    expect(page.getHandButtons().get(0).getAttribute('name')).toEqual('Rock');
  });

  it('should have a button Paper', () => {
    page.navigateTo();
    expect(page.getHandButtons().get(1).getAttribute('name')).toEqual('Paper');
  });

  it('should have a button Scissors', () => {
    page.navigateTo();
    expect(page.getHandButtons().get(2).getAttribute('name')).toEqual('Scissors');
  });

  it('should run a game when I click an hand', () => {
    page.navigateTo();
    page.clickRock();
    expect(page.getGameBoardText()).toBe('VS');
  });
});
