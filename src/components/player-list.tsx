import React from "react"
import { PlayerInfo } from "../stores/roster-store";
import PlayerCard from './player-card';

export interface PlayerListProps {
    players: PlayerInfo[]
    editable?: boolean;
};

const PlayerList = ({players,editable}:PlayerListProps) => {
  return (
      <>
        {players.map(player =>(
            <PlayerCard key={player.id} player={player} editable={editable}/>
        ))}
      </>
  );
}


export default PlayerList;