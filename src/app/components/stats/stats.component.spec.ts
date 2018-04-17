import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatTableModule } from '@angular/material';
import { StatsComponent } from './stats.component';
import { PlayerService } from '../../services/player.service';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsComponent ],
      imports: [ MatCardModule, MatTableModule ],
      providers: [PlayerService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
