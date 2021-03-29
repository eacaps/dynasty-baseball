import data from '../../public/data/backham_bombers_2021_03_28.json';
import { Player } from '../stores/player-store';
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

    async loadPlayersForTeam(id:string): Promise<Player[]> {
        const team = this.response.teams.find(team => {return team.id == +id})
        if(!team) return [];
        const players = team.roster.entries.map(playerEntry => {
            const {id,player} = playerEntry.playerPoolEntry;
            return {
                id:id+'',
                name:player.fullName
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