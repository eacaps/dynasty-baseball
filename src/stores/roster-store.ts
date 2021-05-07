import { createContext } from "react";
import LineupService from "../services/lineup-service";
import RosterService from "../services/roster-service";
import { deepCopy, wait } from "../utils/utils";

export interface Roster {
  league_id: string;
  team_id: string;
  created_at: number;
  players: PlayerInfo[];
  revision: number;
}
 export interface RosterInfo {
   roster?: Roster;
   revision : number;
 }

export interface DraftRoster extends Roster {
  draft?:boolean;
}

export interface PlayerInfo {
    id: string;
    name: string;
    keeperInfo?: KeeperInfo;
    draft?: boolean
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
    lineupService :LineupService;
    rosterService: RosterService;
  constructor() {
      this.rosters = new Map();
      this.lineupService = new LineupService();
      this.rosterService = new RosterService();
      this.lineups = new Map();
  }

  rosters: Map<string,Roster>;
  lineups: Map<string,Lineup>;

  getLineup = async (league_id:string, team_id:string) => {
    const key = `${league_id}_${team_id}`;
    if(this.lineups.get(key))
       return deepCopy(this.lineups.get(key));
    const data = await this.lineupService.loadPlayersForTeam(league_id, team_id);
    const lineup = {
      league_id,team_id,date:new Date().getTime(),players:data
    };
    this.lineups.set(key, lineup);
    return deepCopy(lineup);
  }

  getRoster = async (league_id:string, team_id:string, rev_id?:number) => {
    const key = `${league_id}_${team_id}`;
    const roster = await this.rosterService.loadRoster(league_id, team_id, rev_id);
    return roster;
  }

  unifyDraftRoster = async (league_id:string,team_id:string):Promise<DraftRoster> => {
      await wait(1000);
      const lineup = await this.getLineup(league_id, team_id);
      const rosterInfo = await this.getRoster(league_id, team_id);
      const roster = rosterInfo.roster;
      const lineupPlayers = lineup && lineup.players ? lineup.players : [];
      let players = lineupPlayers;
      players.forEach(player => player.draft = true)
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
            if(foundLineupPlayer.keeperInfo?.keeperYears) {
              foundLineupPlayer.draft = false;
            }
          }
        }
      }
      return {
          created_at: new Date().getTime(),
          league_id,
          team_id,
          draft: true,
          players,
          revision: rosterInfo.revision
      }
  }

  saveRoster = async(roster:Roster): Promise<DraftRoster> => {
      console.log(roster);
      const newRevision = await this.rosterService.saveRoster(roster);
      // roster.draft = false;
      if(newRevision) roster.revision = newRevision;
      return roster;
  }
}

export default createContext(new RosterStore())