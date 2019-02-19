import { ModalComponent } from './../modal/modal.component';
import { DynamicComponentLoader } from './../../core/dynamic-component-loader/dynamic-component-loader.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';


declare var $: any;
declare var ResponsiveDatatablesHelper: any;

@Component({
  selector: 'acc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges, OnDestroy {

  @Output() dbClick = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onUpdate = new EventEmitter<any>();

  @Input() header: Array<string>;
  @Input() data: Array<string>;
  @Input() name: string;

  public id: string;
  public actions: string;

  private modal;
  private elementSelected;

  constructor(
    private _dynamicComponentLoader: DynamicComponentLoader
  ) {
    const _element = document.body;
    const modalData = { id: 'myModal', title: 'Excluir item', body: 'Você realmente deseja remover este item?' };
    this.modal = this._dynamicComponentLoader.appendComponentTo( ModalComponent, _element, modalData );
  }

  ngOnInit() { }

  ngOnChanges () {
    if ( this.header && this.data && this.name ) {
      this.objectToArray( this.data );
      setTimeout( () => this.startTable(), 99 );
      this.modal.querySelector('.btn-confirm').addEventListener( 'click', () => this.dispatchRemove() );
    }
  }

  ngOnDestroy() {
    this.modal.querySelector('.btn-confirm').removeEventListener( 'click', () => this.dispatchRemove() );
    this.modal.remove();
  }

  dbClicked( event ) {
    this.dbClick.emit( event );
  }

  onRemove( event ) {
    $('#myModal').modal({ show: true });
    this.elementSelected = event[0];
  }

  dispatchRemove() {
    $('#myModal').modal( 'hide' ).data( 'bs.modal', null );
    $('#myModal').data('bs.modal', null);
    this.modal.querySelector('.btn-confirm').removeEventListener( 'click', () => this.dispatchRemove() );
    this.onDelete.emit( this.elementSelected );
  }

  onAlter( event ) {
    this.onUpdate.emit( event[0] );
  }

  objectToArray( obj ) {
    const arr: Array<any> = [];
    obj.forEach( element => {
      const arrElement = [];
      for ( const _element in element) {
        if ( _element === '_id' ) { continue; }
        if ( _element === 'id' ) {
          arrElement.push( { id: element[_element] } );
          continue;
        }
        arrElement.push( element[_element] );
      }
      if ( this.header.indexOf('Ações') > -1 ) {
        arrElement.push( 'actions' );
        this.actions = 'actions';
      }
      arr.push( arrElement );
    });
    this.data = arr;
  }

  hasProperty( item, property ) {
    if ( item && typeof item === 'object' && item.hasOwnProperty( property ) ) {
      this.id = item[property];
      return true;
    }
    return false;
  }

  startTable() {
    /* BASIC ;*/
    let responsiveHelper_datatable_fixed_column;

    const breakpointDefinition = {
      tablet : 1024,
      phone : 480
    };

    /* COLUMN FILTER  */
    const otable = $(`#${this.name}`).DataTable({
      // "bFilter": false,
      // "bInfo": false,
      // "bLengthChange": false
      // "bAutoWidth": false,
      // "bPaginate": false,
      // "bStateSave": true // saves sort state using localStorage
      retrieve: true,
      'sDom': '<"dt-toolbar"<"col-xs-12 col-sm-6 hidden-xs"f><"col-sm-6 col-xs-12 hidden-xs"<"toolbar">>r>' +
      't' +
      '<"dt-toolbar-footer"<"col-sm-6 col-xs-12 hidden-xs"i><"col-xs-12 col-sm-6"p>>',
      'autoWidth' : true,
      'oLanguage': {
        'sEmptyTable': 'Nenhum registro encontrado',
        'sInfo': 'Mostrando de _START_ até _END_ de _TOTAL_ registros',
        'sInfoEmpty': 'Mostrando 0 até 0 de 0 registros',
        'sInfoFiltered': '(Filtrados de _MAX_ registros)',
        'sInfoPostFix': '',
        'sInfoThousands': '.',
        'sLengthMenu': '_MENU_ resultados por página',
        'sLoadingRecords': 'Carregando...',
        'sProcessing': 'Processando...',
        'sZeroRecords': 'Nenhum registro encontrado',
        'sSearch': '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>',
        'oPaginate': {
            'sNext': 'Próximo',
            'sPrevious': 'Anterior',
            'sFirst': 'Primeiro',
            'sLast': 'Último'
        },
        'oAria': {
            'sSortAscending': ': Ordenar colunas de forma ascendente',
            'sSortDescending': ': Ordenar colunas de forma descendente'
        }
    },
    'preDrawCallback' : () => {
      // Initialize the responsive datatables helper once.
      if (!responsiveHelper_datatable_fixed_column) {
        responsiveHelper_datatable_fixed_column = new ResponsiveDatatablesHelper($(`#${this.name}`), breakpointDefinition);
      }
    },
    'rowCallback' : (nRow) => {
      responsiveHelper_datatable_fixed_column.createExpandIcon(nRow);
    },
    'drawCallback' : (oSettings) => {
      responsiveHelper_datatable_fixed_column.respond();
    }
    });
    // custom toolbar
    $('div.toolbar').html(
      '<div class="text-right">' +
        '<img src="assets/img/logo.png" alt="SmartAdmin">' +
      '</div>'
    );
    // Apply the filter
    $(`#${this.name} thead th input[type=text]`).on( 'keyup change', function () {
        otable
            .column( $(this).parent().index() + ':visible' )
            .search( this.value )
            .draw();
    } );
    /* END COLUMN FILTER */
  }
}
