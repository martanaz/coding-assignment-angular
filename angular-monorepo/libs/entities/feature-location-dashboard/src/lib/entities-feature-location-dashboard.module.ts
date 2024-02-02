import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesFeatureLocationDashboardComponent } from './entities-feature-location-dashboard/entities-feature-location-dashboard.component';
import { RouterModule, Routes } from "@angular/router";
import { HighchartsChartModule } from "highcharts-angular";

const routes: Routes = [
  { path: '', component: EntitiesFeatureLocationDashboardComponent }
]
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), HighchartsChartModule],
  declarations: [EntitiesFeatureLocationDashboardComponent],
})
export class EntitiesFeatureLocationDashboardModule {}
