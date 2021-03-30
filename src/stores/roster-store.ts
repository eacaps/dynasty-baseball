import { createContext } from "react";
import EspnLoader from "../services/espn-service";
import { deepCopy, wait } from "../utils/utils";

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

export interface Lineup {
    league_id: string;
    team_id: string;
    date: number;
    players: PlayerInfo[];
  }

class RosterStore {
    service :EspnLoader;
  constructor() {
      this.rosters = new Map();
      this.service = new EspnLoader();
      this.lineups = new Map();
  }

  rosters: Map<string,Roster>;
  lineups: Map<string,Lineup>;

  getLineup = async (league_id:string, team_id:string) => {
    const key = `${league_id}_${team_id}`;
    if(this.lineups.get(key))
       return deepCopy(this.lineups.get(key));
    const data = await this.service.loadPlayersForTeam(league_id, team_id);
    const lineup = {
      league_id,team_id,date:new Date().getTime(),players:data
    };
    this.lineups.set(key, lineup);
    return deepCopy(lineup);
  }

  getRoster = async (league_id:string, team_id:string) => {
    const key = `${league_id}_${team_id}`;
    const roster = this.rosters.get(key);
    return roster;
  }

  unifyDraftRoster = async (league_id:string,team_id:string):Promise<Roster> => {
      await wait(1000);
      const lineup = await this.getLineup(league_id, team_id);
      const roster = await this.getRoster(league_id, team_id);
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

  saveRoster = async(league_id:string, team_id:string, roster:Roster): Promise<Roster> => {
      console.log(roster);
      roster.draft = false;
      return roster;
  }
}

export default createContext(new RosterStore())