import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Player } from '../../models/player';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  dataSource = new MatTableDataSource<Player>();

  columnsToDisplay = ['id', 'name', 'human', 'score', 'rock', 'paper', 'scissors'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.getPlayers()
      .subscribe( players => {
        this.dataSource.data = players;
      });

    this.dataSource.sortingDataAccessor = (data: Player, property: string) => {
      switch (property) {
        case 'id': return +data.id;
        case 'name': return data.name;
        case 'score': return +data.score;
        case 'rock': return +data.handsUsage['Rock'];
        case 'paper': return +data.handsUsage['Paper'];
        case 'scissors': return +data.handsUsage['Scissors'];
        default: return '';
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
