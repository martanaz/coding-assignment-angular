import { Component, OnInit } from '@angular/core';
import { EntityService, LocationStats } from "@angular-monorepo/entities/data-repository";
import * as Highcharts from 'highcharts';

@Component({
  selector: 'angular-monorepo-entities-feature-location-dashboard',
  templateUrl: './entities-feature-location-dashboard.component.html',
  styleUrls: ['./entities-feature-location-dashboard.component.scss'],
})
export class EntitiesFeatureLocationDashboardComponent implements OnInit {
  locationStats: LocationStats = {
    lastWeekLocationOccupancy: [],
    lastWeekEmployeesVisits: []
  };

  isHighcharts = typeof Highcharts === 'object';
  Highcharts: typeof Highcharts = Highcharts;
  occupancyChartOptions: Highcharts.Options = {};
  employeesVisitsChartOptions: Highcharts.Options = {};

  constructor(private entityService: EntityService) {}

  ngOnInit() {
    this.entityService.getLocationStats().subscribe((locationStats) => {
      this.locationStats = locationStats;

      this.occupancyChartOptions = {
        title: {
          text: 'Last week location occupancy'
        },
        xAxis: {
          categories: ['Seven days ago', 'Six days ago', 'Five days ago', 'Four days ago', 'Three days ago', 'Two days ago', 'One day ago']
        },
        yAxis: {
          title: {
            text: 'Number of visitors',
          }
        },
        series: [
          {
            data: this.locationStats.lastWeekLocationOccupancy,
            type: 'line',
            name: 'Number of visitors'
          }
        ]
      };
    });
  }
}
