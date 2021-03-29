import React from "react";
import TeamList from "./components/team-list";
import Team from './components/team';
import Home from './components/home';
import styled from 'styled-components';
import Header from './components/header';

import {
    HashRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const Main = styled.div`
font-family: Courier New;
`;

const App = () => {
  return (
    <Router>
      <Main>
        <Header />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/teams">
            <TeamList/>
          </Route>
          <Route path="/team/:id">
            <Team />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Main>
    </Router>
  );
};

export default App;