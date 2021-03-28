import React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 3em;
  text-align: center;
  color: #4ab571;
  font-family: Courier New;
`;

const App = () => {
    return (
        <>
          <Title>Welcome to Dynasty Baseball</Title>
        </>
    );
};
render(<App />, document.getElementById('root'));