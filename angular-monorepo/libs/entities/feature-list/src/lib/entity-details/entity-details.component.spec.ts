import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntityDetailsComponent } from './entity-details.component';
import { EntityService } from "@angular-monorepo/entities/data-repository";
import { MessageService } from "primeng/api";
import { CheckboxModule } from "primeng/checkbox";
import { ChipsModule } from "primeng/chips";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";

describe('EntityDetailsComponent', () => {
  let component: EntityDetailsComponent;
  let fixture: ComponentFixture<EntityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityDetailsComponent],
      providers: [EntityService, MessageService],
      imports: [CheckboxModule, ChipsModule, ReactiveFormsModule, ButtonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(EntityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
