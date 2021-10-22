import React from 'react';
import { useQuery, gql } from '@apollo/client';

import '../App.css';

const GridDemo = () => {
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

export default GridDemo;
