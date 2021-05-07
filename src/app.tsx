import React, { useContext, useEffect, useState } from "react"
import TeamList from "./components/team-list";
import TeamComponent from './components/team';
import Roster from './components/team-roster';
import Home from './components/home';
import styled from 'styled-components';
import Header from './components/header';

import {
    HashRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import TeamStore, { Team } from "./stores/team-store"

const Main = styled.div`
font-family: Courier New;
`;

const App = () => {
  const teamStore = useContext(TeamStore)
  const [teams,setTeams]:[Team[] | undefined,any] = useState(undefined);
  
  useEffect(() => {
    teamStore.getTeams().then(team_list => {
      setTeams(team_list);
    })
  },[]);
  let content = (
        <Switch>
          <Route path="/teams">
            <TeamList/>
          </Route>
          <Route path="/team/:id/:rev">
            <Roster />
          </Route>
          <Route path="/team/:id">
            <TeamComponent />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
  )
  if(!teams) {
    content = (
      <>
        loading
      </>
    )
  };

  return (
    <Router>
      <Main>
        <Header />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        {content}
    </Main>
    </Router>
  );
};

export default App;