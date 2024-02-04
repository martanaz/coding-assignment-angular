import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityService } from "@angular-monorepo/entities/data-repository";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'angular-monorepo-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.scss'],
})
export class EntityDetailsComponent implements OnInit {

  @Input() entityId!: string;
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  loading = false;

  form: FormGroup = new FormGroup<any>({});

  isBeingEdited = false;
  hasBeenEdited = false;

  constructor(private entityService: EntityService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initializeData();
  }

  onEdit() {
    this.isBeingEdited = true;
  }

  onClose() {
    if (this.hasBeenEdited) {
      this.closeDialog.next(true);
    } else {
      this.closeDialog.next(false);
    }
  }

  onSubmit() {

  }

  onCancel() {
    this.initializeData();
    this.isBeingEdited = false;
  }

  toggleBeingEdited() {
    this.isBeingEdited = !this.isBeingEdited;
  }

  private initializeData() {
    this.loading = true;
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
      this.loading = false;
      console.log(this.form);
    })
  }
}
