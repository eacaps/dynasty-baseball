import { createContext } from "react";
import EspnLoader from "../services/espn-service";
import { Lineup } from "./lineup-store";

export interface Roster {
  league_id: string;
  team_id: string;
  created_at: number;
  players: PlayerInfo[];
  draft?:boolean;
}

export interface PlayerInfo {
    id: string;
    name: string;
    keeperInfo?: KeeperInfo;
}

export interface KeeperInfo {
    acquisitionDate: number;
    acquisitionType: string;
    keeperYears?: number;
    extended?:boolean;
}

class RosterStore {
  constructor() {
      this.rosters = new Map();
  }

  rosters: Map<string,Roster>;

  unifyDraftRoster(league_id:string,team_id:string,lineup:Lineup):Roster {
      const key = `${league_id}_${team_id}`;
      const roster = this.rosters.get(key);
      if(roster) {

      } else {

      }
      return {
          created_at: new Date().getTime(),
          league_id,
          team_id,
          draft: true,
          players:lineup.players
      }
  }
}

export default createContext(new RosterStore())