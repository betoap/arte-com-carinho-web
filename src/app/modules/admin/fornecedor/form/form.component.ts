import { DynamicComponentLoader } from './../../../core/dynamic-component-loader/dynamic-component-loader.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// ngrx
import { Store } from '@ngrx/store';
import { ResourceState } from './../../../core/resource/store/states/resource.state';
import { ResourceAction } from 'src/app/modules/core/resource';
import { ResourcePost, ResourcePut, ResourceGet } from './../../../core/resource/store/actions/resource.actions';

import { isActionType } from './../../../shared/utils/storeActionType';
import { BaseFormComponent } from 'src/app/modules/shared/utils';
import { NotifyComponent } from './../../../shared/notify/notify.component';
import { INotify, Notify } from './../../../shared/notify/notify.model';
import { IRequest } from './../../../core/resource/interfaces/request.interface';

@Component({
  selector: 'acc-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends BaseFormComponent implements OnInit {

  private _unsub$ = new Subject();
  private id: string;
  private data: any;

  constructor(
    private _formBuilder: FormBuilder,
    private readonly _store: Store<ResourceState>,
    private _router: ActivatedRoute,
    private _route: Router,
    private _dynamicComponentLoader: DynamicComponentLoader
  ) {
    super();
  }

  ngOnInit() {
    this.setData();
    this.listenStore();
    this.loadRouter();
    if ( !this.id ) {
      this.setFormBuilder();
    }
  }

  private setData() {
    this.data = {};
    this.data.nome = null;
    this.data.emails = [];
    this.data.telefones = [];
    this.data.site = null;
  }

  loadRouter() {
    this
      ._router
      .params
      .pipe( takeUntil( this._unsub$ ) )
      .subscribe( ( params: any ) => {
        this.id = params['id'];
        if ( this.id ) {
          this.loadData();
        }
      });
  }

  loadData() {
    const request: IRequest = {
      endPoint: `fornecedor/${this.id}`,
      identity: 'fornecedor',
      queryString: { sleepApi: 3 }
    };
    this._store.dispatch(new ResourceGet(request));
  }

  listenStore() {
    this._store
      .select('resources')
      .pipe(takeUntil(this._unsub$))
      .subscribe(data => {
        if (isActionType(this._store, ResourceAction.SUCCESS)) {
          switch (data.identity) {
            case 'fornecedorForm':
              const nt: INotify = new Notify( {
                theme: 'success',
                icon: 'fa-check',
                title: 'Dados do fornecedor',
                content: 'Dados enviados com sucesso!',
                timeout: 4,
                canClose: true
              });
              const el = document.body;
              this._dynamicComponentLoader.appendComponentTo( NotifyComponent, el, { notifies: [nt] });
              this.clearForm();
              return this._route.navigate([`/admin/fornecedor`]);
            break;
            case 'fornecedor':
              this.data = data.data[0];
              this.setFormBuilder( );
            break;
          }
        }
      });
  }

  setFormBuilder() {
    this.form = this._formBuilder.group({
      nome: [ this.data.nome , Validators.compose([
        Validators.required,
        Validators.minLength( 2 ),
        Validators.maxLength( 50 )
      ]) ],
      email: [ this.data.emails[0] ],
      telefone: [ this.data.telefones[0] ],
      site: [ this.data.site ],
    });
  }

  submit() {
    const request = {
      endPoint: 'fornecedor',
      identity: 'fornecedorForm',
      body: {
        nome: this.form.controls.nome.value,
        emails: [this.form.controls.email.value] || [],
        telefones: [this.form.controls.telefone.value] || [],
        site: this.form.controls.site.value || null
      },
    };

    if ( this.id ) {
      request.endPoint += `/${this.id}`;
      request.body['_id'] = this.id;
      this._store.dispatch( new ResourcePut( request ) );
      return;
    }

    this._store.dispatch( new ResourcePost( request ) );
  }

}
