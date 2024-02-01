import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesFeatureListComponent } from './entities-feature-list/entities-feature-list.component';
import { RouterModule, Routes } from "@angular/router";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";

const routes: Routes = [{ path: '', component: EntitiesFeatureListComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MultiSelectModule, FormsModule, TableModule],
  declarations: [EntitiesFeatureListComponent],
})
export class EntitiesFeatureListModule {}
