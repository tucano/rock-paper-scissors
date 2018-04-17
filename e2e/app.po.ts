import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getAppTitle() {
    return element(by.css('app-toolbar h1')).getText();
  }

  getHandButtons() {
    return element.all(by.css('.mat-icon-button'));
  }

  getGameBoard() {
    return element(by.css('.rps-gameboard'));
  }

  getGameBoardText() {
   return element(by.css('.rps-gameboard')).getText();
  }

  clickRock() {
    element(by.css('button[name="Rock"]')).click();
  }
}
