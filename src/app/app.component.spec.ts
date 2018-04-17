import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { GameComponent } from './components/game/game.component';
import { StatsComponent } from './components/stats/stats.component';
import { PlayerService } from './services/player.service';

import { MatToolbarModule, MatCardModule, MatSelectModule, MatButtonModule, MatInputModule, MatTableModule } from '@angular/material';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ToolbarComponent,
        GameComponent,
        StatsComponent
      ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
        MatInputModule,
        MatTableModule
      ],
      providers: [PlayerService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Rock, Paper, Scissors!');
  }));
});
