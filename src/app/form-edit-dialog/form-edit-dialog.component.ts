import { Component, OnInit, Inject } from '@angular/core';

import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tarea} from '../models/tarea.model';

@Component({
  selector: 'app-form-edit-dialog',
  templateUrl: './form-edit-dialog.component.html',
  styleUrls: ['./form-edit-dialog.component.scss']
})
export class FormEditDialogComponent implements OnInit {

  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public tarea: any) {
    this.form = new FormGroup({
      title: new FormControl('',[
        Validators.required,
        Validators.maxLength(15)
      ]),
      description: new FormControl(),
      priority: new FormControl(),
      status: new FormControl(),
      date: new FormControl(),
      id: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  formValidate(){
    this.form.value.status = this.tarea.status;
    this.form.value.date = Date.now();
    this.form.value.id = this.tarea.id;
    return this.form.value;
  }

}
