import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesFeatureListComponent } from './entities-feature-list/entities-feature-list.component';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{ path: '', component: EntitiesFeatureListComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [EntitiesFeatureListComponent],
})
export class EntitiesFeatureListModule {}
