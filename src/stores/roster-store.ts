import { createContext } from "react";
import EspnLoader from "../services/espn-service";
import RosterService from "../services/roster-service";
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
    espnService :EspnLoader;
    rosterService: RosterService;
  constructor() {
      this.rosters = new Map();
      this.espnService = new EspnLoader();
      this.rosterService = new RosterService();
      this.lineups = new Map();
  }

  rosters: Map<string,Roster>;
  lineups: Map<string,Lineup>;

  getLineup = async (league_id:string, team_id:string) => {
    const key = `${league_id}_${team_id}`;
    if(this.lineups.get(key))
       return deepCopy(this.lineups.get(key));
    const data = await this.espnService.loadPlayersForTeam(league_id, team_id);
    const lineup = {
      league_id,team_id,date:new Date().getTime(),players:data
    };
    this.lineups.set(key, lineup);
    return deepCopy(lineup);
  }

  getRoster = async (league_id:string, team_id:string) => {
    const key = `${league_id}_${team_id}`;
    const roster = await this.rosterService.loadRoster(league_id, team_id);
    return roster;
  }

  unifyDraftRoster = async (league_id:string,team_id:string):Promise<Roster> => {
      await wait(1000);
      const lineup = await this.getLineup(league_id, team_id);
      const roster = await this.getRoster(league_id, team_id);
      const lineupPlayers = lineup && lineup.players ? lineup.players : [];
      let players = lineupPlayers;
      if(roster) {
        for(const rosterPlayer of roster.players) {
          let foundLineupPlayer;
          for(const lineupPlayer of lineupPlayers) {
            if(lineupPlayer.id === rosterPlayer.id) {
              foundLineupPlayer = lineupPlayer;
            }
          }
          if(foundLineupPlayer) {
            foundLineupPlayer.keeperInfo = rosterPlayer.keeperInfo;
          }
        }
      }
      return {
          created_at: new Date().getTime(),
          league_id,
          team_id,
          draft: true,
          players
      }
  }

  saveRoster = async(roster:Roster): Promise<Roster> => {
      console.log(roster);
      await this.rosterService.saveRoster(roster);
      roster.draft = false;
      return roster;
  }
}

export default createContext(new RosterStore())