const columnDefs = [
    { field: "athlete" },
    { field: "age", hide: true},
    { field: "country", enableRowGroup: true },
    { field: "year", enableRowGroup: true, hide: true },
    { field: "sport", enableRowGroup: true },
    { field: "gold", type: "valueColumn" },
    { field: "silver", type: "valueColumn", hide: true },
    { field: "bronze", type: "valueColumn", hide: true },
    { field: "total", type: "valueColumn", hide: true }
];

const defaultColDef = {
    sortable: true,
    resizable: true
}

const serverSideSortingAlwaysResets = true

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
                suppressPivots: true,
                suppressPivotMode: true,
                suppressSideButtons: true,
                suppressColumnFilter: true,
                suppressColumnSelectAll: true,
                suppressColumnExpandAll: true,
            },
        },
    ],
    defaultToolPanel: 'columns',
}

const getRowNodeId = (data) => data.id;


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
    columnDefs,
    defaultColDef,
    sideBar,
    //getRowNodeId,
    onColumnVisible,
    onSortChanged,
    rowModelType,
    rowSelection,
    cacheBlockSize,
    serverSideStoreType,
    //serverSideSortingAlwaysResets
}