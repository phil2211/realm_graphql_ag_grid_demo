import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import './App.css';

function App() {
  const { loading, error, data } = useQuery(gql`
  query {
    olympicWinners (limit: 5) {
      age
      athlete
      sport
    }
  }
  `);
  if(loading) {
    return <div>loading...</div>
  }
  if (error) {
    return <div>Error loading: {error}</div>
  }
  return (
    <div className="App">
      {data.olympicWinners.map(winner => <div>{winner.athlete}</div>)}
    </div>
  );
}

export default App;
