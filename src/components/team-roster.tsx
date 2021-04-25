import React, { useContext, useEffect, useReducer } from "react"
import { useParams } from "react-router-dom";

import TeamStore from "../stores/team-store"
import RosterStore, { RosterInfo } from "../stores/roster-store"
import PlayerCard from "./player-card";
import { computeYears } from "../services/roster-service";

interface params {
  id?: string;
  rev?: string;
}

const TeamRoster = () => {
  let { id,rev } = useParams<params>();
  const revision = rev ? +rev :undefined;

  const rosterStore = useContext(RosterStore);
  const teamStore = useContext(TeamStore);

  const { teams } = teamStore;
  const team = teams.find((team => {
      return team.id == id
  }))
  if(!team) {
    return (
        <div>
            team not found
        </div>
    );
  }

  const [state, dispatch] = useReducer(rosterReducer, initialState);
  const { error, rosterInfo , status } = state;
  const roster = rosterInfo ? rosterInfo.roster : undefined;
  const rosterRevision = rosterInfo ? rosterInfo.revision : 0;
  
  const years = computeYears(roster);

  useEffect(() => {
    let canceled = false;

    rosterStore.getRoster(team.league_id,team.id,revision)
      .then(data => {
        if (canceled) return;
        if(data.roster)
          dispatch({ type: "RESOLVE", data });
        else
        dispatch({ type: "REJECT", error:`roster/${revision} not found` });
      })
      .catch(error => {
        console.error(error.message)
        if (canceled) return;
        dispatch({ type: "REJECT", error:error.message });
      });

    return () => {
      canceled = true;
    };
  }, [id,rev]);

  let prev;
  
  let rosterDisplay =  (
    <div>
      <a href={`#/team/${team.id}`}>{team.name + '-'+team.id}</a>
      <div>{error && <span style={{ color: "red" }}>{error}</span>}</div>
    </div>
  )

  if(roster) {
    if(rosterRevision > 1) {
      prev = (<div><a href={`#/team/${team.id}/${(rosterRevision -1)}`}>Previous Roster</a></div>)
    }
      rosterDisplay = (
        <div>
            <a href={`#/team/${team.id}`}>{team.name + '-'+team.id}</a>
            {roster.players.map(player =>(
              <PlayerCard key={player.id} player={player} editable={false}
              />
            ))}
            <div>Years:{years}</div>
            {prev}
        </div>
    );
  }
  
  return (
      <>
        {rosterDisplay}
      </>
  );
}

function rosterReducer(state:TeamRosterState, event:{type:string,data?:RosterInfo,error?:string}) {
    switch (event.type) {
      case "RESOLVE":
        return {
          ...state,
          status: "success",
          rosterInfo: event.data
        };
      case "REJECT":
        return {
          ...state,
          status: "failure",
          error: event.error,
          rosterInfo: undefined
        };
      default:
        return state;
    }
  }
  
interface TeamRosterState {
  status:string;
  rosterInfo?: RosterInfo;
  error?: string;
}

  const initialState:TeamRosterState = {
    status: "loading",
    rosterInfo: undefined,
    error: undefined
  };

export default TeamRoster;