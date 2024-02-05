import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntitiesFeatureListComponent } from './entities-feature-list.component';
import { EntityService } from "@angular-monorepo/entities/data-repository";
import { DialogModule } from "primeng/dialog";
import { TableModule } from "primeng/table";
import { MultiSelectModule } from "primeng/multiselect";
import { FormsModule } from "@angular/forms";

describe('EntitiesFeatureListComponent', () => {
  let component: EntitiesFeatureListComponent;
  let fixture: ComponentFixture<EntitiesFeatureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntitiesFeatureListComponent],
      providers: [EntityService],
      imports: [DialogModule, TableModule, MultiSelectModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(EntitiesFeatureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
