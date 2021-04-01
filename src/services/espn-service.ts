import data from '../../public/data/backham_bombers_2021_03_28.json';
import { PlayerInfo } from '../stores/roster-store';
import { Team } from '../stores/team-store';

export default class EspnLoader {
    response:EspnRosterForTeamIdResponse;
    constructor() {
        this.response = data as EspnRosterForTeamIdResponse;
    }

    getTeams(): Team[] {
        const teams = this.response.teams.map(team => {
            return {
                league_id: this.response.id+'',
                id: team.id+'',
                name: team.id+''
            }
        })
        return teams;
    }

    async loadPlayersForTeam(league_id:string, team_id:string): Promise<PlayerInfo[]> {
        const team = this.response.teams.find(team => {return team.id == +team_id})
        if(!team) return [];
        const players = team.roster.entries.map(playerEntry => {
            const {acquisitionDate, acquisitionType} = playerEntry;
            const {id,player} = playerEntry.playerPoolEntry;
            return {
                id:id+'',
                name:player.fullName,
                keeperInfo: {
                    acquisitionDate,acquisitionType
                }
            }
        })
        return players;
    }
}

export interface EspnRosterForTeamIdResponse {
    "id": number;
    "seasonId": number;
    "teams": EspnTeam[];
  }
  
  export interface EspnTeam {
    id: number;
    roster: {
        entries: EspnPlayerEntry[];
    };
  }
  
  export interface EspnPlayerEntry {
      "acquisitionDate": number;
      "acquisitionType": string;
      "playerId": number;
      "playerPoolEntry": EspnPlayerWrapper;
  }
  
  export interface EspnPlayerWrapper {
      "id":number;
      "onTeamId": number;
      "player": EspnPlayerInfo;
  }
  
  export interface EspnPlayerInfo {
      "eligibleSlots": number[];
      "fullName": string;
      "injuryStatus": string;
  }