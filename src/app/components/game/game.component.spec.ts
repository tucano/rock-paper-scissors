import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerService } from '../../services/player.service';
import { MatCardModule } from '@angular/material';
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
      imports: [ MatCardModule ],
      providers: [PlayerService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a last game result empty at start', () => {
    expect(component.lastGameResult).toEqual('');
  });

  it('should have a list of players', async(() => {
    expect(component.players.length).toBeGreaterThan(0);
  }));

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

  it('should have a method gameReady()', () => {
    expect(component.gameReady()).toBeFalsy();
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

  it('should have a runGame() method', () => {
    spyOn(component, 'runGame');
    component.runGame();
    expect(component.runGame).toHaveBeenCalled();
  });

  it('should call runGame() after clickHand', () => {
    spyOn(component, 'runGame');
    component.clickHand(1);
    expect(component.runGame).toHaveBeenCalled();
  });

  it('should detect changes of players', () => {
    component.playerOne = new Player(0, 'test0', false, new GameStyle(0, 'random', 0));
    component.playerTwo = new Player(1, 'test1', false, new GameStyle(0, 'random', 0));
    spyOn(component, 'playersChange');
    component.playersChange();
    expect(component.playersChange).toHaveBeenCalled();
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
});
