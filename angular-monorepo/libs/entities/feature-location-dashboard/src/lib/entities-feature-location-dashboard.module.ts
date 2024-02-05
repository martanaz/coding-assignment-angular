import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesFeatureLocationDashboardComponent } from './entities-feature-location-dashboard/entities-feature-location-dashboard.component';
import { RouterModule, Routes } from "@angular/router";
import { HighchartsChartModule } from "highcharts-angular";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { TableModule } from "primeng/table";

const routes: Routes = [
  { path: '', component: EntitiesFeatureLocationDashboardComponent }
]
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), HighchartsChartModule, ProgressSpinnerModule, TableModule],
  declarations: [EntitiesFeatureLocationDashboardComponent],
})
export class EntitiesFeatureLocationDashboardModule {}
