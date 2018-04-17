import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PlayerService } from '../../services/player.service';
import { MatCardModule, MatSelectModule, MatButtonModule, MatInputModule } from '@angular/material';
import { GameComponent } from './game.component';
import { Player } from '../../models/player';
import { Rock, Paper, Scissors, ValidHands } from '../../models/hand';
import { GameStyle } from '../../models/game-style';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
        MatInputModule
      ],
      providers: [PlayerService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a last game result', () => {
    expect(component.lastGameResult).toEqual('Ready to play?');
  });

  it('should have a list of players', () => {
    expect(component.players.length).toBeGreaterThan(0);
  });

  it('should have a getPlayers method', () => {
    spyOn(component, 'getPlayers');
    component.getPlayers();
    expect(component.getPlayers).toHaveBeenCalled();
  });

  it('should have a player one', () => {
    expect(component.playerOne).toBeDefined();
  });

  it('should have a player two', () => {
    expect(component.playerTwo).toBeDefined();
  });

  it('should have a method gameReady', () => {
    expect(component.gameReady).toBeFalsy();
  });

  it('should have a clickHand() method', () => {
    spyOn(component, 'clickHand');
    component.clickHand(1);
    expect(component.clickHand).toHaveBeenCalled();
  });

  it('playerOne should have a currentHand after clickHand', () => {
    component.clickHand(1);
    expect(component.playerOne.currentHand).toBe(Rock);
  });

  it('playerTwo should have a currentHand after clickHand', () => {
    component.clickHand(1);
    expect(ValidHands).toContain(component.playerTwo.currentHand);
  });

  it('playerTwo when Human should have a currentHand after clickHand', () => {
    component.playerOne = new Player(99, 'c', false, new GameStyle(0, 'random', 0));
    component.playerTwo = new Player(0, 'h', true);
    component.clickHand(1);
    expect(component.playerTwo.currentHand).toBe(Rock);
  });

  it('should have a runGame() method', () => {
    spyOn(component, 'runGame');
    component.runGame();
    expect(component.runGame).toHaveBeenCalled();
  });

  it('should run a simulation', () => {
    spyOn(component, 'runGame');
    component.playerOne = new Player(99, 'c', false, new GameStyle(0, 'random', 0));
    component.playerTwo = new Player(10, 'c', false, new GameStyle(0, 'random', 0));
    component.runSimulations();
    jasmine.clock().tick(201);
    expect(component.runGame).toHaveBeenCalled();
  });

  it('should run more simulations', () => {
    spyOn(component, 'runGame');
    component.playerOne = new Player(99, 'c', false, new GameStyle(0, 'random', 0));
    component.playerTwo = new Player(10, 'c', false, new GameStyle(0, 'random', 0));
    component.numberOfSimulations = 100;
    component.runSimulations();
    jasmine.clock().tick(20001);
    expect(component.runGame).toHaveBeenCalledTimes(100);
  });

  it('should have gameMessage 3 after clickHand', () => {
    component.clickHand(1);
    expect(component.gameMessage).toBe('3');
  });

  it('should have run a game after clickHand', () => {
    spyOn(component, 'runGame');
    component.clickHand(1);
    jasmine.clock().tick(1501);
    expect(component.runGame).toHaveBeenCalled();
  });

  it('should detect changes of players', () => {
    component.playerOne = new Player(0, 'test0', false, new GameStyle(0, 'random', 0));
    component.playerTwo = new Player(1, 'test1', false, new GameStyle(0, 'random', 0));
    spyOn(component, 'playersChange');
    component.playersChange();
    expect(component.playersChange).toHaveBeenCalled();
  });

  it('should change player one msg', () => {
    component.playerOne = new Player(0, 'test0', true);
    component.playerTwo = new Player(1, 'test1', false, new GameStyle(0, 'random', 0));
    component.playersChange();
    expect(component.handsMsg).toEqual('PLAYER ONE CHOOSE YOUR WEAPON!');
  });

  it('should change player two msg', () => {
    component.playerOne = new Player(1, 'test1', false, new GameStyle(0, 'random', 0));
    component.playerTwo = new Player(0, 'test0', true);
    component.playersChange();
    expect(component.handsMsg).toEqual('PLAYER TWO CHOOSE YOUR WEAPON!');
  });

  it('should detect computer vs computer', () => {
    component.playerOne = new Player(0, 'test0', false, new GameStyle(0, 'random', 0));
    component.playerTwo = new Player(1, 'test1', false, new GameStyle(0, 'random', 0));
    component.playersChange();
    expect(component.computerVsComputer).toBeTruthy();
  });

  it('should lastGameResult not be empty after runGame', () => {
    component.playerOne.currentHand = Rock;
    component.playerTwo.currentHand = Scissors;
    component.runGame();
    expect(component.lastGameResult).not.toEqual('');
  });

  it('should lastGameResult be "Player One WINS: Rock crushes Scissors" after a game', () => {
    component.playerOne.currentHand = Rock;
    component.playerTwo.currentHand = Scissors;
    component.runGame();
    expect(component.lastGameResult).toEqual('Player One WINS: Rock crushes Scissors');
  });

  it('should lastGameResult be "DRAW" after a draw', () => {
    component.playerOne.currentHand = Rock;
    component.playerTwo.currentHand = Rock;
    component.runGame();
    expect(component.lastGameResult).toEqual('DRAW');
  });

  it('should lastGameResult be "Player Two WINS: Rock crushes Scissors" after a game', () => {
    component.playerOne.currentHand = Scissors;
    component.playerTwo.currentHand = Rock;
    component.runGame();
    expect(component.lastGameResult).toEqual('Player Two WINS: Rock crushes Scissors');
  });

  it('should update score of playerOne', () => {
    const score = component.playerOne.score;
    component.playerOne.currentHand = Rock;
    component.playerTwo.currentHand = Scissors;
    component.runGame();
    expect(component.playerOne.score).toEqual(score + 1);
  });

  it('should update score of playerTwo', () => {
    const score = component.playerTwo.score;
    component.playerOne.currentHand = Scissors;
    component.playerTwo.currentHand = Rock;
    component.runGame();
    expect(component.playerTwo.score).toEqual(score + 1);
  });

  it('should disable a player if used', () => {
    const player = new Player(0, 'test0', false, new GameStyle(0, 'random', 0));
    component.playerOne = player;
    expect(component.isInUse(player)).toBeTruthy();
  });

  it('should run simulations', () => {
    spyOn(component, 'runSimulations');
    component.runSimulations();
    expect(component.runSimulations).toHaveBeenCalled();
  });
});
