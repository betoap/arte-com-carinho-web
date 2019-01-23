import { element } from 'protractor';
import { Component, OnInit, Input, IterableDiffers, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Ifilter } from './filter.model';
import { ITableModel } from './table.model';

declare var $: any;
declare var ResponsiveDatatablesHelper: any;

@Component({
  selector: 'acc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild('tableSort') tableSort: ElementRef;

  @Output() changeValue = new EventEmitter<{}>();
  @Input() tableObj?: ITableModel;
  @Input() showFilters: boolean;
  @Input() showAction: boolean;
  @Input() actionType: string;

  public columns: Array<string>;
  public columSize: number;
  public rowClassMouse: string;
  public noResults: boolean;

  private _originBody: Array<object>;
  private _newBody: Array<object>;
  private _filters: Array<Ifilter>;
  private _tableRows: any;

  private _prevent: boolean;

  constructor() {}

  ngOnInit() {
      /* BASIC ;*/
  const responsiveHelper_dt_basic = undefined;
  let responsiveHelper_datatable_fixed_column;
  const responsiveHelper_datatable_col_reorder = undefined;
  const responsiveHelper_datatable_tabletools = undefined;

  const breakpointDefinition = {
    tablet : 1024,
    phone : 480
  };

  /* COLUMN FILTER  */
  const otable = $('#datatable_fixed_column').DataTable({
    // "bFilter": false,
    // "bInfo": false,
    // "bLengthChange": false
    // "bAutoWidth": false,
    // "bPaginate": false,
    // "bStateSave": true // saves sort state using localStorage
    'sDom': '<"dt-toolbar"<"col-xs-12 col-sm-6 hidden-xs"f><"col-sm-6 col-xs-12 hidden-xs"<"toolbar">>r>' +
    't' +
    '<"dt-toolbar-footer"<"col-sm-6 col-xs-12 hidden-xs"i><"col-xs-12 col-sm-6"p>>',
    'autoWidth' : true,
    'oLanguage': {
      'sSearch': '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>'
    },
  'preDrawCallback' : function() {
    // Initialize the responsive datatables helper once.
    if (!responsiveHelper_datatable_fixed_column) {
      responsiveHelper_datatable_fixed_column = new ResponsiveDatatablesHelper($('#datatable_fixed_column'), breakpointDefinition);
    }
  },
  'rowCallback' : function(nRow) {
    responsiveHelper_datatable_fixed_column.createExpandIcon(nRow);
  },
  'drawCallback' : function(oSettings) {
    responsiveHelper_datatable_fixed_column.respond();
  }
  });
  // custom toolbar
  $('div.toolbar').html(
    '<div class="text-right">' +
      '<img src="assets/img/logo.png" alt="SmartAdmin" style="width: 111px; margin-top: 3px; margin-right: 10px;">' +
    '</div>'
  );
  // Apply the filter
  $('#datatable_fixed_column thead th input[type=text]').on( 'keyup change', function () {
      otable
          .column( $(this).parent().index() + ':visible' )
          .search( this.value )
          .draw();
  } );
  /* END COLUMN FILTER */
  }
}
