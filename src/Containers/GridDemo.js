import React, { FunctionComponent, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { createServerSideDatasource } from '../lib/datasource';
import GridOptions from './GridDemoOptions';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

import "ag-grid-enterprise";
import '../App.css';
import realmLogo from '../assets/realm.png';
import agGridLogo from '../assets/ag-grid.png';

const Grid = () => {
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);

  const datasource = createServerSideDatasource(GridOptions);

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
          gridOptions={GridOptions}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  )
}

export default Grid;
