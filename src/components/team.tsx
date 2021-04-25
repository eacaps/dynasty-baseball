import React, { useContext, useEffect, useMemo, useReducer, useState } from "react"
import TeamStore from "../stores/team-store"
import RosterStore, { Roster,DraftRoster } from "../stores/roster-store"
import {
    useParams
  } from "react-router-dom";
import PlayerCard from "./player-card";
import { computeYears } from "../services/roster-service";

interface Params {
  id?: string;
}

const Team = () => {
  let { id } = useParams<Params>();

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
  
  
  const [years, setYears] = useState(computeYears(lineup));

  useEffect(() => {
    if (state.status === "saving") {
      console.log('saving')
      rosterStore.saveRoster(lineup!).then(data => {
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
          setYears(computeYears(data))
          dispatch({ type: "RESOLVE", data });
        })
        .catch(error => {
          console.error(error.message)
          if (canceled) return;
          dispatch({ type: "REJECT", error:error.message });
        });

      return () => {
        canceled = true;
      };
    }
  }, []);

  let buttons,prev;
  
  let rosterDisplay =  (
    <span>
      {error && <span style={{ color: "red" }}>Error loading players</span>}
      {/* {status === "loading" && <span style={{ color: "blue" }}>Loading...</span>}
      {status === "success" && <button onClick={() => dispatch({ type: "SAVE" })}>save</button>} */}
    </span>
  )

  if(lineup) {
    buttons = (<div>{status === "success" && lineup.draft && <button onClick={() => dispatch({ type: "SAVE" })}>save</button>}</div>)
    if(lineup.revision) {
      prev = (<div><a href={`#/team/${team.id}/${(lineup.revision -1)}`}>Previous Roster</a></div>)
    }
    rosterDisplay = (
        <div>
            {team.name + '-'+team.id}
            {lineup.players.map(player =>(
              <PlayerCard key={player.id} player={player} editable={lineup.draft && player.draft}
                onUpdate={
                  () => setYears(computeYears(lineup))
                }
              />
            ))}
            <div>Years:{years}</div>
            {buttons}
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

function lineupReducer(state:TeamState, event:{type:string,data?:DraftRoster,error?:string}) {
    switch (event.type) {
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
      case "SAVE":
        return {
          ...state,
          status: "saving"
        };
      default:
        return state;
    }
  }
  
interface TeamState {
  status: string;
  lineup?: DraftRoster,
  error?: string
}

  const initialState:TeamState = {
    status: "loading",
    lineup: undefined,
    error: undefined
  };

export default Team;