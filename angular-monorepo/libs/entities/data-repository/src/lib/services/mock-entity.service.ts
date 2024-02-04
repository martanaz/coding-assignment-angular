import { Injectable } from '@angular/core';
import {
  Employee,
  EmployeeVisits,
  EntityDetails,
  EntityListItem,
  EntityType,
  EntityUpdateDto,
  GetEntityListParams,
  LocationStats
} from "../model/model";
import { delay, Observable, of } from 'rxjs';

@Injectable()
export class MockEntityService {

    entities: EntityDetails[] = [
        {
            entityId: '1',
            trackingId: 'ab:cd:ef:5d:7a',
            name: 'Entity 1',
            entityType: 'n1t',
            entityStatus: 'On Duty',
            isActive: true,
            attributes: ['Department1', 'Fast Responder', 'xyakf83kfdasf930-fksdf0239-12303-46340129394', 'Morning Shift'],
        },
        {
            entityId: '2',
            trackingId: 'ac:cd:ef:4d:7a',
            name: 'Entity 2',
            entityType: 'n1t',
            entityStatus: 'Break',
            isActive: true,
            attributes: ['Department1', 'Fast Responder', 'xyakf83kfdasf930-fksdf0239-12303-46340129394', 'Morning Shift'],
        },
        {
            entityId: '3',
            trackingId: 'af:cd:ef:5d:8a',
            name: 'Entity 3',
            entityType: 'n2t',
            entityStatus: 'On Duty',
            isActive: true,
            attributes: ['Department1', 'Fast Responder', 'xyakf83kfdasf930-fksdf0239-12303-46340129394', 'Morning Shift'],
        },
        {
            entityId: '4',
            trackingId: 'af:cf:ef:5d:9a',
            name: 'Entity 4',
            entityType: 'n2t',
            entityStatus: 'Break',
            isActive: false,
            attributes: ['Department1', 'Fast Responder', 'xyakf83kfdasf930-fksdf0239-12303-46340129394', 'Morning Shift'],
        }
    ];

    entityTypes: EntityType[] = [
        {id: 'n1t', name: 'Nurse'},
        {id: 'n2t', name: 'Security'}
    ];

    lastWeekLocationOccupancy: number[] = [40, 245, 235, 182, 143, 120, 20];

    lastWeekVisitsLog: Employee[] = [
        {id: 'id1', name: 'Jacob Holland'},
        {id: 'id1', name: 'Jacob Holland'},
        {id: 'id2', name: 'Charles Bradley'},
        {id: 'id3', name: 'Mason Moore'},
        {id: 'id4', name: 'Alice Kelly'},
        {id: 'id3', name: 'Mason Moore'},
        {id: 'id1', name: 'Jacob Holland'},
        {id: 'id2', name: 'Charles Bradley'},
        {id: 'id3', name: 'Mason Moore'},
        {id: 'id4', name: 'Alice Kelly'},
        {id: 'id3', name: 'Mason Moore'},
        {id: 'id1', name: 'Jacob Holland'},
        {id: 'id2', name: 'Charles Bradley'},
        {id: 'id3', name: 'Mason Moore'},
        {id: 'id4', name: 'Alice Kelly'},
        {id: 'id3', name: 'Mason Moore'},
        {id: 'id1', name: 'Jacob Holland'},
        {id: 'id2', name: 'Charles Bradley'},
        {id: 'id3', name: 'Mason Moore'},
        {id: 'id4', name: 'Alice Kelly'},
        {id: 'id3', name: 'Mason Moore'},
        {id: 'id1', name: 'Jacob Holland'},
        {id: 'id2', name: 'Charles Bradley'},
        {id: 'id1', name: 'Jacob Holland'},
        {id: 'id2', name: 'Charles Bradley'},
        {id: 'id1', name: 'Jacob Holland'},
        {id: 'id2', name: 'Charles Bradley'},
        {id: 'id1', name: 'Jacob Holland'},
        {id: 'id2', name: 'Charles Bradley'},
        {id: 'id1', name: 'Jacob Holland'},
        {id: 'id2', name: 'Charles Bradley'},
        {id: 'id3', name: 'Mason Moore'},
        {id: 'id4', name: 'Alice Kelly'},
        {id: 'id3', name: 'Mason Moore'},
        {id: 'id4', name: 'Alice Kelly'},
        {id: 'id3', name: 'Mason Moore'},
        {id: 'id4', name: 'Alice Kelly'},
        {id: 'id3', name: 'Mason Moore'},
        {id: 'id4', name: 'Alice Kelly'},
        {id: 'id5', name: 'Rachel Gray'},
        {id: 'id6', name: 'Alexis Morales'},
        {id: 'id1', name: 'Jacob Holland'},
        {id: 'id1', name: 'Jacob Holland'},
    ];

  getEntityList(getEntityListParams: GetEntityListParams): Observable<EntityListItem[]> {
    return of(
      this.entities.filter(entity => this.searchEntityMatchConditions(getEntityListParams, entity))
        .map(entity => {
          return {
            entityId: entity.entityId,
            trackingId: entity.trackingId,
            name: entity.name,
            entityType: entity.entityType,
            entityStatus: entity.entityStatus,
            isActive: entity.isActive
          }
        })
    ).pipe(delay(1000));
  }

  private searchEntityMatchConditions(getEntityListParams: GetEntityListParams, entity: EntityDetails): boolean | undefined{
    if (getEntityListParams.search) {
      return (entity.name.includes(getEntityListParams.search) || entity.trackingId?.includes(getEntityListParams.search));
    }
    return true;
  }

  getEntityDetails(entityId: string): Observable<EntityDetails> {
    const result = this.entities.find(entity => entity.entityId === entityId);
    if (!result) {
      throw new Error('Entity not found');
    } else {
      return of(result).pipe(delay(1000));
    }
  }

  updateEntity(entityUpdateDto: EntityUpdateDto, entityId: string): Observable<EntityDetails> {
    const result = this.entities.find(entity => entity.entityId === entityId);
    if (!result) {
      throw new Error('Entity not found');
    } else {
      result.trackingId = entityUpdateDto.trackingId;
      result.entityType = entityUpdateDto.entityType;
      result.name = entityUpdateDto.name;
      return of(result).pipe(delay(1000));
    }
  }

  getEntityTypes(): Observable<EntityType[]> {
    return of(this.entityTypes).pipe(delay(1000));
  }

  getLocationStats(): Observable<LocationStats> {

    // Get number of visits per employee
    const countMap: Map<string, number> = new Map;
    this.lastWeekVisitsLog.forEach(employee => {
      const currentCount = countMap.get(employee.name);
      if (currentCount) {
        countMap.set(employee.name, currentCount + 1);
      } else {
        countMap.set(employee.name, 1);
      }
    });

    // Store the values in array
    let employeesVisits: EmployeeVisits[] = [];
    for (const entry of countMap.entries()) {
      employeesVisits.push({name: entry[0], visits: entry[1]});
    }

    // Take only top 5 results
    employeesVisits = employeesVisits
      .sort((visit, nextVisit) => nextVisit.visits - visit.visits)
      .slice(0, 5);

    return of({
      lastWeekLocationOccupancy: this.lastWeekLocationOccupancy,
      lastWeekEmployeesVisits: employeesVisits,
    }).pipe(delay(1000));
  }
}
