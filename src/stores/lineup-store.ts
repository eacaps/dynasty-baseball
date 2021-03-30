import { createContext } from "react";
import EspnLoader from "../services/espn-service";
import { PlayerInfo } from "./roster-store";

export interface Lineup {
  league_id: string;
  team_id: string;
  date: number;
  players: PlayerInfo[];
}


class LineupStore {
    service :EspnLoader;
  constructor() {
     this.service = new EspnLoader();
     this.lineups = new Map();
  }

  lineups: Map<string,Lineup>

  getLineup = async (league_id:string, team_id:string) => {
    const key = `${league_id}_${team_id}`;
    if(this.lineups.get(key))
       this.lineups.get(key)
    const data = await this.service.loadPlayersForTeam(league_id, team_id);
    const lineup = {
      league_id,team_id,date:new Date().getTime(),players:data
    };
    this.lineups.set(key, lineup);
    return lineup;
  }
}

export default createContext(new LineupStore())