import React, { useContext, useState } from "react"
import TeamStore from "../stores/team-store"
import { observer } from "mobx-react";
import {
    useParams
  } from "react-router-dom";
  import PlayerList from './player-list';

const Team = () => {
  let { id } = useParams();
  const teamStore = useContext(TeamStore)
  const { teams } = teamStore;
  const team = teams.find((team => {
      return team.id == id
  }))
  if(team) {
    return (
        <div>
            {team.name + '-'+team.id}
            <PlayerList players={team.roster}/>
        </div>
    );
  } else {
    return (
        <div>
            team not found
        </div>
    );
  }
}


export default observer(Team);