import React, { useContext, useEffect, useState } from "react"
import TeamStore, { Team } from "../stores/team-store"
import { Link } from "react-router-dom";

const TeamList = () => {
  const teamStore = useContext(TeamStore)
  const { teams } = teamStore;
  return (
      <>
        {teams.map(team =>(
            <div  key={team.id}>
              <Link to={'/team/'+team.id}>{team.name}</Link>
            </div>
        ))}
      </>
  );
}

interface TeamsListState {
  status:string,
  teams?:Team[];
  error?:string;
}

const initialState:TeamsListState = {
  status: "loading",
  teams: undefined,
  error: undefined
};

export default TeamList;