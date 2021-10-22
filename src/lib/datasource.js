import { gql } from '@apollo/client';
import { client } from './apolloClient';

export const createServerSideDatasource = function () {
    return {
        getRows: function (params) {
            console.log('Request', params.request)
            let {
                startRow,
                endRow,
                // sortModel,
                // filterModel,
                // groupKeys,
                // pivotCols,
                // pivotMode,
                // rowGroupCols,
                // valueCols,
            } = params.request;

            sortModel = sortModel.length > 0 ? sortModel : undefined;
            const visibleColumnIds = params.columnApi.getAllDisplayedColumns().map(col => col.getColId());

            const query = {
                query: gql`
                    query GetRows($paginationInput: Pagination) {
                        getRows(input:$paginationInput) {
                            lastRow
                            rows { 
                                id, 
                                ${visibleColumnIds.join('\n')}
                            }
                        }
                    }
                `,
                variables: {
                    "paginationInput": {
                        startRow,
                        endRow,
                        // sortModel  
                    }
                }
            };
            console.log(JSON.stringify(query));
            client.query(query)
                .then(res => res.data.getRows)
                .then(({ lastRow, rows }) => {
                    console.log('Response', lastRow, rows);
                    params.successCallback(rows, lastRow);
                })
                .catch(err => {
                    console.log('Error', err);
                    params.failCallback();
                });
        }
    }
}