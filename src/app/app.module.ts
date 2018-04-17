import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatSelectModule, MatToolbarModule, MatCardModule, MatInputModule, MatTableModule, MatSortModule } from '@angular/material';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { GameComponent } from './components/game/game.component';
import { PlayerService } from './services/player.service';
import { StatsComponent } from './components/stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    GameComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
