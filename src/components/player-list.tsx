import React, { useContext, useState } from "react"
import TeamStore from "../stores/team-store"
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import PlayerStore from "../stores/player-store";

export interface PlayerListProps {
    players: string[]
};

const PlayerList = ({players}:PlayerListProps) => {
  const playerStore = useContext(PlayerStore)
  const playerlist = playerStore.players.filter(player => players.includes(player.id))
  return (
      <>
        {playerlist.map(player =>(
            <div key={player.id}>{player.name}</div>
        ))}
      </>
  );
}


export default observer(PlayerList);