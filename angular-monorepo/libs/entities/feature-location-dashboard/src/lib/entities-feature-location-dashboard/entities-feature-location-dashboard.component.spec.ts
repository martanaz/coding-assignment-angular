import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntitiesFeatureLocationDashboardComponent } from './entities-feature-location-dashboard.component';

describe('EntitiesFeatureLocationDashboardComponent', () => {
  let component: EntitiesFeatureLocationDashboardComponent;
  let fixture: ComponentFixture<EntitiesFeatureLocationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntitiesFeatureLocationDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      EntitiesFeatureLocationDashboardComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
