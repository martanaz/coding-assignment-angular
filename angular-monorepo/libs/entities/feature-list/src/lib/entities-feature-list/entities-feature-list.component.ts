import { Component, OnInit } from '@angular/core';
import { EntityListItem, EntityService } from "@angular-monorepo/entities/data-repository";

@Component({
  selector: 'angular-monorepo-entities-feature-list',
  templateUrl: './entities-feature-list.component.html',
  styleUrls: ['./entities-feature-list.component.scss'],
})
export class EntitiesFeatureListComponent  implements OnInit {
  entityList: EntityListItem[] = [];
  tableHeaderList: string[] = [
    'Tracking id',
    'Name',
    'Entity Type',
    'Entity Status',
    'Is Active',
  ];
  selectedTableHeaders: string[] = this.tableHeaderList;

  constructor(private entityService: EntityService) {}

  ngOnInit() {
    this.entityService.getEntityList({}).subscribe((entityList) => {
      this.entityList = entityList;
      console.log(this.entityList);
    });
  }

  hasHeaderSelected(header: string){
    return !!this.selectedTableHeaders.find(value => value === header);
  }
}
