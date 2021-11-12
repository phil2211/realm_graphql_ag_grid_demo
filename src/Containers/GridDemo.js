import React, { FunctionComponent, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { createServerSideDatasource, createFilterDatasource } from '../lib/datasource';
import GridOptions from './GridDemoOptions';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

import "ag-grid-enterprise";
import '../App.css';

import realmLogo from '../assets/realm.png';
import agGridLogo from '../assets/ag-grid.png';
import { ApolloConsumer } from "@apollo/client";

const clientProvider = WrappedComponent => {
  return props => (
    <ApolloConsumer>
      {client => {
        return <WrappedComponent client={client} {...props} />
      }}
    </ApolloConsumer>
  )
}

const Grid = ({client}) => {
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);

  const getCountryFilterValues = createFilterDatasource({fieldName: "country", client});
  const getSportFilterValues = createFilterDatasource({fieldName: "sport", client});

  const columnDefs = [
    { field: "athlete" },
    { field: "age", hide: true},
    { field: "country", enableRowGroup: true, filter: 'agSetColumnFilter', filterParams: {values: getCountryFilterValues.getRows} },
    { field: "year", enableRowGroup: true, hide: true },
    { field: "sport", enableRowGroup: true, filter: 'agSetColumnFilter', filterParams: {values: getSportFilterValues.getRows} },
    { field: "gold", type: "valueColumn" },
    { field: "silver", type: "valueColumn", hide: true },
    { field: "bronze", type: "valueColumn", hide: true },
    { field: "total", type: "valueColumn", hide: true }
  ];

  const gridOptions = Object.assign(GridOptions, {columnDefs});

  const datasource = createServerSideDatasource({gridOptions, client});

  const onGridReady = (params) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);

    params.api.setServerSideDatasource(datasource);
    params.api.sizeColumnsToFit();
  };

  const externalFilterChanged = (newValue) => {
      console.log(newValue.target.value)
  }

  return (
    <div className="container my-4">
      <div className="card my-3">
        <div className="card-header">
          {<img src={realmLogo} alt="MongoDB Realm Logo" />}
          {<img style={{paddingLeft: 100, paddingBottom: 22}} height={60} src={agGridLogo} alt="AG Grid Logo" />}
        </div>
      </div>
        <label>Search Grid
            <input type="text" name="filter" id="filter" onChange={externalFilterChanged} />
        </label>
      <div
        id="myGrid"
        style={{ height: "calc(100vh - 250px)" }}
        className="ag-theme-alpine-dark">
          <AgGridReact
            gridOptions={gridOptions}
            onGridReady={onGridReady}
          />
      </div>
    </div>
  )
}

export default clientProvider(Grid);
