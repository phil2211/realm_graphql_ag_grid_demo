// import { createFilterDatasource } from '../lib/datasource';

//const getCountryFilterValues = createFilterDatasource("country");
//const getSportFilterValues = createFilterDatasource("sport");

const columnDefs = [
    { field: "athlete" },
    { field: "age", hide: true},
    { field: "country", enableRowGroup: true, filter: 'agSetColumnFilter', filterParams: {values: null /*getCountryFilterValues.getRows*/} },
    { field: "year", enableRowGroup: true, hide: true },
    { field: "sport", enableRowGroup: true, filter: 'agSetColumnFilter', filterParams: {values: null /*getSportFilterValues.getRows*/} },
    { field: "gold", type: "valueColumn" },
    { field: "silver", type: "valueColumn", hide: true },
    { field: "bronze", type: "valueColumn", hide: true },
    { field: "total", type: "valueColumn", hide: true }
];

const columnTypes=  {
    dimension: {
      enableRowGroup: true,
      enablePivot: true,
    },
    valueColumn: {
      width: 150,
      aggFunc: 'sum',
      enableValue: true,
      cellClass: 'number',
      allowedAggFuncs: ['avg', 'sum', 'min', 'max', 'count']
    }
  }

const defaultColDef = {
    sortable: true,
    resizable: true
}

const sideBar = {
    toolPanels: [
        {
            id: 'columns',
            labelDefault: 'Columns',
            labelKey: 'columns',
            iconKey: 'columns',
            toolPanel: 'agColumnsToolPanel',
            toolPanelParams: {
                suppressRowGroups: false,
                suppressValues: true,
                suppressPivots: false,
                suppressPivotMode: false,
                suppressSideButtons: true,
                suppressColumnFilter: false,
                suppressColumnSelectAll: true,
                suppressColumnExpandAll: true,
            },
        },
    ],
    defaultToolPanel: 'columns',
}

const onColumnVisible = (params) => {
    params.api.sizeColumnsToFit();
    params.api.purgeServerSideCache();
}

const onSortChanged = (params) => {
    params.api.refreshServerSideStore({purge: true});
}

const rowSelection = "single";

const rowModelType = "serverSide";

const cacheBlockSize = 20;

const serverSideStoreType = "partial";

export default {
    //columnDefs,
    columnTypes,
    defaultColDef,
    sideBar,
    onColumnVisible,
    onSortChanged,
    rowModelType,
    rowSelection,
    cacheBlockSize,
    serverSideStoreType
}