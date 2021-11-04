import { gql } from '@apollo/client';
import { client } from './apolloClient';
import { forEach } from 'lodash';

export const createServerSideDatasource = function (gridOptions) {
    return {
        getRows: function (params) {
            console.log('Request', params.request)
            let {
                startRow,
                endRow,
                sortModel,
                filterModel,
                groupKeys,
                // pivotCols,
                // pivotMode,
                rowGroupCols,
                valueCols,
            } = params.request;

            sortModel.map(model => model.sort = model.sort.toUpperCase());
            //const visibleColumnIds = params.columnApi.getAllDisplayedColumns().map(col => col.getColId()).filter(colName => colName !== "ag-Grid-AutoColumn");
            const fields = gridOptions.columnDefs.map(col => col.field);

            const aFilterModel = [];
            forEach(filterModel, (value, key) => {
                aFilterModel.push({
                    filterField: key,
                    values: value.values
                });
            });
            console.log(JSON.stringify(aFilterModel));
            
            
            const query = {
                query: gql`
                    query getGridData($queryModelInput: GridQueryModel) {
                        getGridData(input:$queryModelInput) {
                            lastRow
                            rows { 
                            ${/*visibleColumnIds.join('\n') */ fields }
                            }
                        }
                    }
                `,
                variables: {
                    "queryModelInput": {
                        startRow,
                        endRow,
                        sortModel,
                        groupKeys,
                        rowGroupCols,
                        valueCols,
                        filterModel: aFilterModel 
                    }
                }
            };
            console.log(JSON.stringify(query));
            client.query(query)
                .then(res => res.data.getGridData)
                .then(({ lastRow, rows }) => {
                    //console.log('Response', lastRow, rows);
                    params.successCallback(rows, lastRow);
                })
                .catch(err => {
                    console.log('Error', err);
                    params.failCallback();
                });
        }
    }
}

export const createFilterDatasource = (fieldName) => {
    console.log(fieldName);
    return {
        getRows: (params) => {
        console.log(params);
        const query = {
            query: gql`
                query getFilterValues($queryInput: GetFilterValue) {
                    getFilterValues(input: $queryInput) {
                        filterValues
                    }
                }
            `,
            variables: {
                "queryInput": {
                    queryInput: fieldName
                }
            }
        };
        console.log(JSON.stringify(query));
        client.query(query)
            .then(res => res.data.getFilterValues)
            .then(({ filterValues }) => {
                //console.log('Response', lastRow, rows);
                params.success(filterValues);
            })
            .catch(err => {
                console.log('Error', err);
                params.success(err);
            });
    }
}}
