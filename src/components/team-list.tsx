import React, { useContext, useState } from "react"
import TeamStore from "../stores/team-store"
import { observer } from "mobx-react";

const TeamList = () => {
  const teamStore = useContext(TeamStore)
  const { teams } = teamStore;
  return (
      <>
        {teams.map(team =>(
            <div id={'team-'+team.id}>{team.name}</div>
        ))}
      </>
  );
}


export default observer(TeamList);