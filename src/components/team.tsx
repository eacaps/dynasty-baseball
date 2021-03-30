import React, { useContext, useEffect, useReducer, useState } from "react"
import TeamStore from "../stores/team-store"
import RosterStore from "../stores/roster-store"
import {
    useParams
  } from "react-router-dom";
  import PlayerList from './player-list';

const Team = () => {
  let { id } = useParams();

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

  const [state, dispatch] = useReducer(lineupReducer, initialState);
  const { error, lineup , status } = state;

  useEffect(() => {
    if (state.status === "saving") {
      console.log('saving')
      rosterStore.saveRoster(team.league_id,team.id,lineup).then(data => {
        dispatch({ type: "RESOLVE", data });
      })
    }
  }, [state.status]);

  useEffect(() => {
    if (state.status === "loading") {
      let canceled = false;

      rosterStore.unifyDraftRoster(team.league_id,team.id)
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
  }, []);

  let buttons;
  
  let rosterDisplay =  (
    <span>
      {error && <span style={{ color: "red" }}>{error}</span>}
      {status === "loading" && <span style={{ color: "blue" }}>Loading...</span>}
      {status === "success" && <button onClick={() => dispatch({ type: "SAVE" })}>save</button>}
    </span>
  )

  if(lineup) {
    buttons = (<span>{status === "success" && lineup.draft && <button onClick={() => dispatch({ type: "SAVE" })}>save</button>}</span>)
    rosterDisplay = (
        <div>
            {team.name + '-'+team.id}
            <PlayerList players={lineup.players} editable={lineup.draft}/>
           
        </div>
    );
  }
  
  return (
      <>
      <div>keeper lineup{buttons}</div>
        {rosterDisplay}
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
      case "SAVE":
        return {
          ...state,
          status: "saving"
        };
      default:
        return state;
    }
  }
  
  const initialState = {
    status: "loading",
    lineup: null,
    error: null
  };

export default Team;