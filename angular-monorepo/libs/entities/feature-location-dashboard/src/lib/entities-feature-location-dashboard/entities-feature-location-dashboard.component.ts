import {Component, OnInit} from '@angular/core';
import {EmployeeVisits, EntityService, LocationStats} from "@angular-monorepo/entities/data-repository";

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

  constructor(private entityService: EntityService) {}

  ngOnInit() {
    this.entityService.getLocationStats().subscribe((locationStats) => {
      this.locationStats = locationStats;
      console.log(this.locationStats);
    });
  }
}
