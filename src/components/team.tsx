import React, { useContext, useEffect, useMemo, useReducer, useState } from "react"
import TeamStore from "../stores/team-store"
import RosterStore, { Roster } from "../stores/roster-store"
import {
    useParams
  } from "react-router-dom";
  import PlayerList from './player-list';
import PlayerCard from "./player-card";

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
  
  
  const [years, setYears] = useState(computeYears(lineup));

  useEffect(() => {
    if (state.status === "saving") {
      console.log('saving')
      rosterStore.saveRoster(lineup).then(data => {
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

  let buttons;
  
  let rosterDisplay =  (
    <span>
      {error && <span style={{ color: "red" }}>Error loading players</span>}
      {/* {status === "loading" && <span style={{ color: "blue" }}>Loading...</span>}
      {status === "success" && <button onClick={() => dispatch({ type: "SAVE" })}>save</button>} */}
    </span>
  )

  if(lineup) {
    buttons = (<span>{status === "success" && lineup.draft && <button onClick={() => dispatch({ type: "SAVE" })}>save</button>}</span>)
    rosterDisplay = (
        <div>
            {team.name + '-'+team.id}
            {lineup.players.map(player =>(
              <PlayerCard key={player.id} player={player} editable={lineup.draft && player.draft /*&& !player.keeperInfo?.keeperYears*/}
                onUpdate={
                  () => setYears(computeYears(lineup))
                }
              />
            ))}
            <div>Years:{years}</div>
            {buttons}
        </div>
    );
  }
  
  return (
      <>
        {rosterDisplay}
      </>
  );
}

function computeYears(lineup?:Roster):number {
  if(!lineup) return 0;
  let total = 0;
  for(const player of lineup.players) {
    if(player.keeperInfo && player.keeperInfo.keeperYears) {
      total += +player.keeperInfo.keeperYears
    }
  }
  return total;
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