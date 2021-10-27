import React, { FunctionComponent, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  GridApi,
  ColumnApi,
  GridReadyEvent,
  RowNode,
} from "ag-grid-community";
import { createServerSideDatasource } from '../lib/datasource';
import GridOptions from './GridDemoOptions';
// import OlympicWinnerForm from "./OlympicWinnerForm";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

import "ag-grid-enterprise";
import '../App.css';
import realmLogo from '../assets/realm.png';


const Grid = () => {
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);
  const [formSubmitHandler, setFormSubmitHandler] = useState(null);

  const datasource = createServerSideDatasource();

  const onGridReady = (params) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);

    params.api.setServerSideDatasource(datasource);
    params.api.sizeColumnsToFit();
  };

  const getSelectedNode = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    if (selectedNodes.length === 0) {
      alert('Select a row first');
      return null;
    }
    const selectedNode = gridApi.getSelectedNodes()[0];
    return selectedNode;
  }

  const addRow = (data) => {
    datasource
      .createRow(data)
      .then(() => {
        gridApi.purgeServerSideCache();
      })
  }

  const addRowHandler = () => {
    openForm(null, addRow);
  }

  const updateRow = (data) => {
    datasource
      .updateRow(data)
      .then(() => {
        gridApi.purgeServerSideCache();
      })
  }


  const updateSelectedRowHandler = () => {
    const selectedNode = getSelectedNode();
    if (selectedNode) {
      const selectedRowId = selectedNode.id;
      // first query all of the rows data before passing it to the form
      datasource
        .readRow(selectedRowId)
        .then((selectedRow) => {
          openForm(selectedRow, updateRow);
        });
    }
  };

  const deleteSelectedRowHandler = () => {
    const selectedNode = getSelectedNode();
    if (selectedNode && window.confirm('Are you sure you want to delete this node?')) {
      const selectedRowId = selectedNode.id;
      datasource
        .deleteRow(selectedRowId)
        .then(() => {
          gridApi.purgeServerSideCache();
        });
    }
  }

  const openForm = (data, fn) => {
    setFormData(data);
    setFormSubmitHandler(() => fn);
    setShowForm(true);
  }

  const closeForm = () => {
    setShowForm(false);
    setFormSubmitHandler(null);
    setFormData(null);
  }

  const purgeServerSideCacheHandler = () => {
    gridApi.purgeServerSideCache();
  }


  return (
    <div className="container my-4">
      <div className="card my-3">
        <div className="card-header">
          {<img src={realmLogo} alt="MongoDB Realm Logo" />}
        </div>
        <div className="card-body">
        {/*
          <button onClick={addRowHandler} type="button" className="btn btn-secondary mx-2">Create Row</button>
          <button onClick={updateSelectedRowHandler} type="button" className="btn btn-secondary mx-2">Update Selected Row</button>
          <button onClick={deleteSelectedRowHandler} type="button" className="btn btn-secondary mx-2">Delete Selected Row</button>
          <button onClick={purgeServerSideCacheHandler} type="button" className="btn btn-secondary mx-2">Refresh Rows</button>
        */}
        </div>
      </div>
      <div
        id="myGrid"
        style={{ height: "calc(100vh - 100px)" }}
        className="ag-theme-alpine-dark">
        <AgGridReact
          gridOptions={GridOptions}
          onGridReady={onGridReady}
        />
      </div>
      {/*showForm ? <OlympicWinnerForm data={formData} submit={formSubmitHandler} hide={closeForm} /> : null*/}
    </div>
  )
}

export default Grid;
