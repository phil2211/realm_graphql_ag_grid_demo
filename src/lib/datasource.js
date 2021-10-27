import { gql } from '@apollo/client';
import { client } from './apolloClient';

export const createServerSideDatasource = function () {
    return {
        getRows: function (params) {
            console.log('Request', params.request)
            let {
                startRow,
                endRow,
                sortModel,
                // filterModel,
                // groupKeys,
                // pivotCols,
                // pivotMode,
                // rowGroupCols,
                // valueCols,
            } = params.request;

            sortModel.map(model => model.sort = model.sort.toUpperCase());
            const visibleColumnIds = params.columnApi.getAllDisplayedColumns().map(col => col.getColId());

            const query = {
                query: gql`
                    query getGridData($queryModelInput: GridQueryModel) {
                        getGridData(input:$queryModelInput) {
                            lastRow
                            rows { 
                                id, 
                                ${visibleColumnIds.join('\n')}
                            }
                        }
                    }
                `,
                variables: {
                    "queryModelInput": {
                        startRow,
                        endRow,
                        sortModel  
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