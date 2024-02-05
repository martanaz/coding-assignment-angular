import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesFeatureListComponent } from './entities-feature-list/entities-feature-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { EntityDetailsComponent } from './entity-details/entity-details.component';
import { OverlayPanelModule } from "primeng/overlaypanel";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { ChipsModule } from "primeng/chips";
import { ButtonModule } from "primeng/button";
import { AutoFocusModule } from "primeng/autofocus";
import { CheckboxModule } from "primeng/checkbox";
import { ProgressSpinnerModule } from "primeng/progressspinner";

const routes: Routes = [{ path: '', component: EntitiesFeatureListComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MultiSelectModule,
    FormsModule,
    TableModule,
    OverlayPanelModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    ChipsModule,
    ButtonModule,
    AutoFocusModule,
    CheckboxModule,
    ProgressSpinnerModule,
  ],
  declarations: [EntitiesFeatureListComponent, EntityDetailsComponent],
})
export class EntitiesFeatureListModule {}
