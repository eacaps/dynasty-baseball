import React from "react";
import TeamList from "./components/team-list";
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 3em;
  text-align: center;
  color: #4ab571;
`;

const Main = styled.div`
font-family: Courier New;
`;

const App = () => {
    return (
        <Main>
            <>
            <Title>Welcome to Dynasty Baseball</Title>
            <TeamList/>
            </>
        </Main>
    );
};

export default App;