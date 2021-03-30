import React from "react"
import { PlayerInfo } from "../stores/roster-store";
import PlayerCard from './player-card';

export interface PlayerListProps {
    players: PlayerInfo[]
};

const PlayerList = ({players}:PlayerListProps) => {
  return (
      <>
        {players.map(player =>(
            <PlayerCard key={player.id} player={player}/>
        ))}
      </>
  );
}


export default PlayerList;