import { Component, Input, OnInit } from '@angular/core';
import { EntityService } from "@angular-monorepo/entities/data-repository";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'angular-monorepo-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.scss'],
})
export class EntityDetailsComponent implements OnInit {

  @Input() entityId!: string;

  form: FormGroup = new FormGroup<any>({});

  editing = false;

  constructor(private entityService: EntityService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.entityService.getEntityDetails(this.entityId).subscribe((entity) => {
      this.form = this.formBuilder.group({
        entityId: [entity.entityId, Validators.required],
        trackingId: [entity.trackingId],
        name: [entity.name, Validators.required],
        entityType: [entity.entityType],
        entityStatus: [entity.entityStatus],
        isActive: [entity.isActive, Validators.required],
        attributes: [entity.attributes]
      });
      console.log(this.form);
    })
  }
}
