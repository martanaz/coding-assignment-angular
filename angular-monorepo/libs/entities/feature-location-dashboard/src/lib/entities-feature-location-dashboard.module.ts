import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesFeatureLocationDashboardComponent } from './entities-feature-location-dashboard/entities-feature-location-dashboard.component';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', component: EntitiesFeatureLocationDashboardComponent }
]
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [EntitiesFeatureLocationDashboardComponent],
})
export class EntitiesFeatureLocationDashboardModule {}
