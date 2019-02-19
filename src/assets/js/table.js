$(document).ready(function() {
  let timerLoader = setInterval( () => {
    if(
      $('#datatable_fixed_column').length > 0
    ) {
      clearInterval( timerLoader );
      console.log( 'CARREGAR' )
      START_DATATABLE();
    }
  }, 99 );
});


function START_DATATABLE() {
  /* BASIC ;*/
  let responsiveHelper_datatable_fixed_column = undefined;

  let breakpointDefinition = {
    tablet : 1024,
    phone : 480
  };

  /* COLUMN FILTER  */
  let otable = $('#datatable_fixed_column').DataTable({
    //"bFilter": false,
    //"bInfo": false,
    //"bLengthChange": false
    //"bAutoWidth": false,
    //"bPaginate": false,
    //"bStateSave": true // saves sort state using localStorage
  "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6 hidden-xs'f><'col-sm-6 col-xs-12 hidden-xs'<'toolbar'>>r>"+
      "t"+
      "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
  "autoWidth" : true,
  "oLanguage": {
    "sSearch": '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>'
  },
  "preDrawCallback" : function() {
    // Initialize the responsive datatables helper once.
    if (!responsiveHelper_datatable_fixed_column) {
      responsiveHelper_datatable_fixed_column = new ResponsiveDatatablesHelper($('#datatable_fixed_column'), breakpointDefinition);
    }
  },
  "rowCallback" : function(nRow) {
    responsiveHelper_datatable_fixed_column.createExpandIcon(nRow);
  },
  "drawCallback" : function(oSettings) {
    responsiveHelper_datatable_fixed_column.respond();
  }

  });

  // custom toolbar
  $("div.toolbar").html('<div class="text-right"><img src="assets/img/logo.png" alt="SmartAdmin" style="width: 111px; margin-top: 3px; margin-right: 10px;"></div>');

  // Apply the filter
  $("#datatable_fixed_column thead th input[type=text]").on( 'keyup change', function () {

      otable
          .column( $(this).parent().index()+':visible' )
          .search( this.value )
          .draw();

  } );
  /* END COLUMN FILTER */
}
