import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityDetails, EntityService } from "@angular-monorepo/entities/data-repository";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import { ValidationError } from "@nx/angular/src/generators/ng-add/utilities";
import { Observable } from "rxjs";
import { MessageService } from "primeng/api";

@Component({
  selector: 'angular-monorepo-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.scss'],
})
export class EntityDetailsComponent implements OnInit {

  @Input() entityId!: string;
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  loading = false;
  nameValidationLoading = false;

  form: FormGroup = new FormGroup<any>({});
  initialValues: EntityDetails | null = null;

  isBeingEdited = false;

  constructor(private entityService: EntityService, private formBuilder: FormBuilder, private messageService: MessageService) {}

  ngOnInit() {
    this.initializeData();
  }

  onEdit() {
    this.form.get('trackingId')?.enable();
    this.form.get('name')?.enable();
    this.form.get('entityType')?.enable();
    this.isBeingEdited = true;
  }

  onClose() {
    this.closeDialog.next(false);
  }

  onSubmit() {
    this.loading = true;
    this.entityService.updateEntity({
      trackingId: this.form.get('trackingId')?.value,
      name: this.form.get('name')?.value,
      entityType: this.form.get('entityType')?.value,
      }, this.entityId).subscribe({next: () => {
        this.messageService.add({severity: 'success', summary: 'Entity Details have been updated'});
        this.closeDialog.next(true);
      }, error: () => {
        this.messageService.add({severity: 'error', summary: 'An error has occurred'});
      }})
  }

  onCancel() {
    this.isBeingEdited = true;

    this.form.get('entityId')?.setValue(this.initialValues?.entityId);
    this.form.get('trackingId')?.setValue(this.initialValues?.trackingId);
    this.form.get('name')?.setValue(this.initialValues?.name);
    this.form.get('entityType')?.setValue(this.initialValues?.entityType);
    this.form.get('entityStatus')?.setValue(this.initialValues?.entityStatus);
    this.form.get('isActive')?.setValue(this.initialValues?.isActive);
    this.form.get('attributes')?.setValue(this.initialValues?.attributes);

    this.form.disable();

    this.isBeingEdited = false;
  }

  private initializeData() {
    this.loading = true;
    this.entityService.getEntityDetails(this.entityId).subscribe((entity) => {
      this.form = this.formBuilder.group({
        entityId: [ entity.entityId, Validators.required],
        trackingId: [entity.trackingId],
        name: [entity.name, Validators.required],
        entityType: [entity.entityType],
        entityStatus: [entity.entityStatus],
        isActive: [entity.isActive, Validators.required],
        attributes: [entity.attributes]
      }, {validators: [this.nameDifferentFromTrackingIdValidator]});
      this.form.get('name')?.setAsyncValidators(this.checkForNameUnique());

      this.initialValues = entity;

      this.form.disable();
      this.loading = false;
    });
  }

  private nameDifferentFromTrackingIdValidator(form: AbstractControl): ValidationError | null {
    const nameValue = form.get('name')?.value;
    const trackingIdValue = form.get('trackingId')?.value;

    if (nameValue === trackingIdValue) {
      return {message: 'Name and Tracking Id have the same value. Please change one of those fields'};
    }

    return null;
  }

  private checkForNameUnique(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      this.nameValidationLoading = true;
      return new Promise((resolve) => {
        this.entityService.getEntityList({name: control.value}).subscribe((returnValue => {
          this.nameValidationLoading = false;
          if (returnValue.length === 0 || (returnValue.length === 1 && returnValue[0].entityId === this.form.get('entityId')?.value)) {
            resolve(null);
          } else {
            resolve({nameNotUnique: true});
          }
        }))
      })
    };
  }
}
