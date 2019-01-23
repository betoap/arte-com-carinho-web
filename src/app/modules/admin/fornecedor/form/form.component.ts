import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/modules/shared/utils';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'acc-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends BaseFormComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
  ) {
    super();
  }

  ngOnInit() {
    this.setFormBuilder();
  }

  setFormBuilder() {
    this.form = this._formBuilder.group({
      nome: [ '' , [ Validators.required ] ],
      email: [ '' ],
      telefone: [ '' ],
      site: [ '' ],
    });
  }

  submit() {
    console.log('ENVIAR');
  }

}
