import React, { useContext, useEffect, useReducer, useState } from "react"
import TeamStore from "../stores/team-store"
import LineupStore from "../stores/lineup-store"
import RosterStore from "../stores/roster-store"
import {
    useParams
  } from "react-router-dom";
  import PlayerList from './player-list';

const Team = () => {
  let { id } = useParams();

  const rosterStore = useContext(RosterStore);
  const lineupStore = useContext(LineupStore);
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

  const [state, dispatch] = useReducer(lineupReducer, initialState);
  const { error, lineup , status } = state;

  useEffect(() => {
    if (state.status === "loading") {
      let canceled = false;

      lineupStore.getLineup(team.league_id,team.id)
        .then(data => {
          if (canceled) return;
          dispatch({ type: "RESOLVE", data });
        })
        .catch(error => {
          if (canceled) return;
          dispatch({ type: "REJECT", error });
        });

      return () => {
        canceled = true;
      };
    }
  }, [state.status]);
  
  let roster = rosterStore.rosters.get(`${team.league_id}_${team.id}`)
  let rosterDisplay = (
    <div>
        roster not found
    </div>
  );
  if(lineup) {
    const draftRoster = rosterStore.unifyDraftRoster(team.league_id,team.id,lineup);
    roster = draftRoster;
  }
  if(roster) {
     
    rosterDisplay = (
        <div>
            {team.name + '-'+team.id}
            <PlayerList players={roster.players}/>
        </div>
    );
  }

  const espnLineup = (
    <div>
    {error && <span style={{ color: "red" }}>{error}</span>}
    {/* <figure className="dog" onDoubleClick={() => dispatch({ type: "FETCH" })}>
      {dog && <img src={dog} alt="doggo" />}
    </figure> */}
    {/* {lineup && <PlayerList players={lineup.players}/>} */}

    {status === 'idle' && <button onClick={() => dispatch({ type: "FETCH" })}>
      {status === "loading" ? "Fetching..." : "Fetch lineup!"}
    </button>}
    {/* <button onClick={() => dispatch({ type: "CANCEL" })}>Cancel</button> */}
  </div>
  )
  
  return (
      <>
      <div>keeper lineup</div>
        {rosterDisplay}
        {espnLineup}
      </>
  );
}

function lineupReducer(state, event) {
    switch (event.type) {
      case "FETCH":
        return {
          ...state,
          status: "loading"
        };
      case "RESOLVE":
        return {
          ...state,
          status: "success",
          lineup: event.data
        };
      case "REJECT":
        return {
          ...state,
          status: "failure",
          error: event.error
        };
      case "CANCEL":
        return {
          ...state,
          status: "idle"
        };
      default:
        return state;
    }
  }
  
  const initialState = {
    status: "idle",
    lineup: null,
    error: null
  };

export default Team;