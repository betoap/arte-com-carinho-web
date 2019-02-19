import { NotifyComponent } from './../../shared/notify/notify.component';
import { DynamicComponentLoader } from './../../core/dynamic-component-loader/dynamic-component-loader.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Store } from '@ngrx/store';
import { ResourceGet, ResourceDelete } from './../../core/resource/store/actions/resource.actions';
import { IRequest } from './../../core/resource/interfaces/request.interface';
import { isActionType } from './../../shared/utils/storeActionType';
import { ResourceAction } from '../../core/resource';
import { INotify, Notify } from './../../shared/notify/notify.model';

@Component({
  selector: 'acc-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
})
export class FornecedorComponent implements OnInit {

  private _unsub$ = new Subject();
  public tableHeader: Array<string>;
  public tableData: Array<any>;

  constructor(
    private readonly _store: Store<any>,
    private _router: Router,
    private _dynamicComponentLoader: DynamicComponentLoader
  ) {
  }

  ngOnInit() {
    this._store
      .select('resources')
      .pipe(takeUntil(this._unsub$))
      .subscribe(resource => {
        if (isActionType(this._store, ResourceAction.SUCCESS)) {
          switch (resource.identity) {
            case 'fornecedores':
              const item = resource.data.map( ( itens ) => {
                return {
                  id: itens._id,
                  nome: itens.nome,
                  email: itens.emails[0],
                  telefone: itens.telefones[0],
                  site: itens.site,
                };
              } );
              this.tableHeader = ['Nome', 'E-mail', 'Telefone', 'Site', 'Ações'];
              this.tableData = item;
              break;
            case 'deleteFornecedores':
              const _nt: INotify = new Notify( {
                theme: 'success',
                icon: 'fa-check',
                title: 'Remoção de dados',
                content: 'Dados removidos com sucesso!',
                timeout: 4,
                canClose: true
              });
              const _el = document.body;
              this._dynamicComponentLoader.appendComponentTo( NotifyComponent, _el, { notifies: [_nt] });
              this._getFornecedores();
            break;
          }
        }
      });
    this._getFornecedores();
  }

  updateItem( item ) {
    return this._router.navigate([`/admin/fornecedor/editar/${item.id}`]);
  }

  deleteItem( item ) {
    const request: IRequest = {
      endPoint: `fornecedor/${item.id}`,
      identity: 'deleteFornecedores',
    };
    this._store.dispatch(new ResourceDelete(request));
  }

  /**
   * @description
   * Realiza uma requisição que recebe uma lista de usuários.
   */
  private _getFornecedores() {
    const request: IRequest = {
      endPoint: 'fornecedor',
      identity: 'fornecedores',
      // queryString: { sleepApi: 300 }
    };
    this._store.dispatch(new ResourceGet(request));
  }

}
