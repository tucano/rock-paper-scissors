import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Player } from '../models/player';
import { PLAYERS } from '../mocks/mock-players';

@Injectable()
export class PlayerService {

  constructor() { }

  getPlayers(): Observable<Player[]> {
    return of(PLAYERS);
  }

  updateScore(player: Player, value: number) {
    const p: Player = PLAYERS.filter(x => x.id === player.id)[0];
    p.score += value;
  }
}
