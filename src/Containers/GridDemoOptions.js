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