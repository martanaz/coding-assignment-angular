import { Component, OnInit } from '@angular/core';
import {EmployeeVisits, EntityService, LocationStats} from "@angular-monorepo/entities/data-repository";
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

      this.employeesVisitsChartOptions = {
        title: {
          text: 'Top five visits by employee last week'
        },
        xAxis: {
          labels: {
            enabled: false
          }
        },
        yAxis: {
          title: {
            text: 'Number of visits by employee'
          }
        },
        series: [
          {
            data: this.getDataForEmployeesChart(this.locationStats.lastWeekEmployeesVisits),
            type: 'column',
            name: 'Number of visits by employee',
          }
        ],
      };
    });
  }

  private getDataForEmployeesChart(data: EmployeeVisits[]) {
    const result: (string | number)[][] = [];

    data.forEach((employeeVisit) => {
      result.push([employeeVisit.name, employeeVisit.visits]);
    });

    return result;
  }
}
