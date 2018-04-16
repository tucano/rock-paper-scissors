import { TestBed, inject, async } from '@angular/core/testing';

import { PlayerService } from './player.service';
import { PLAYERS } from '../mocks/mock-players';

describe('PlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerService]
    });
  });

  it('should be created', inject([PlayerService], (service: PlayerService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a list of Players', async(inject( [PlayerService], (service: PlayerService) => {
    service.getPlayers().subscribe(result => expect(result).toEqual(PLAYERS));
  })));

  it('should update the score of a player', async(inject( [PlayerService], (service: PlayerService) => {
    const score = PLAYERS[0].score;
    service.updateScore(PLAYERS[0], 1);
    service.getPlayers().subscribe(result => expect(result[0].score).toEqual(score + 1));
  })));
});
