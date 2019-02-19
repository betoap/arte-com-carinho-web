import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { BaseFormComponent, isActionType } from 'src/app/modules/shared/utils';
import { ResourceState, ResourceAction, ResourcePost } from '../../core/resource';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'acc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormComponent implements OnInit {

  private _unsub$ = new Subject();
  private data: any;

  constructor(
    private _formBuilder: FormBuilder,
    private readonly _store: Store<ResourceState>,
    private _route: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.setData();
    this.setFormBuilder();
  }


  listenStore() {
    this._store
      .select('resources')
      .pipe(takeUntil(this._unsub$))
      .subscribe(data => {
        if (isActionType(this._store, ResourceAction.SUCCESS)) {
          switch (data.identity) {
            case 'login':
              this.clearForm();
              this._route.navigate([`/admin/fornecedor`]);
            break;
          }
        }
      });
  }

  private setData() {
    this.data = {};
    this.data.usuario = null;
    this.data.senha = null;
  }

  setFormBuilder() {
    this.form = this._formBuilder.group({
      usuario: [ this.data.usuario , Validators.compose([
        Validators.required,
        Validators.minLength( 2 ),
        Validators.maxLength( 50 )
      ]) ],
      senha: [ this.data.senha , Validators.compose([
        Validators.required,
        Validators.minLength( 2 ),
        Validators.maxLength( 50 )
      ]) ],
    });
  }

  submit() {
    const request = {
      endPoint: 'login',
      identity: 'login',
      body: {
        usuario: this.form.controls.usuario.value,
        senha: this.form.controls.senha.value
      },
    };

    this._store.dispatch( new ResourcePost( request ) );
  }

}
