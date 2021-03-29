import React, { useContext, useState } from "react"
import TeamStore from "../stores/team-store"
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

const TeamList = () => {
  const teamStore = useContext(TeamStore)
  const { teams } = teamStore;
  return (
      <>
        {teams.map(team =>(
            <Link to={'/team/'+team.id}>{team.name}</Link>
        ))}
      </>
  );
}


export default observer(TeamList);