import { PlayerInfo } from '../stores/roster-store';
import { Team } from '../stores/team-store';
import EspnFileClient from './espn/espn-file-client';
import EspnRemoteClient from './espn/espn-remote-client';

export interface LineupClient {
    getEspnLineup(league_id:string, team_id:string): Promise<EspnRosterForTeamIdResponse>;
}

export default class LineupService {
    client: LineupClient;

    constructor() {
        // this.client = new EspnFileClient();
        this.client = new EspnRemoteClient();
    }

    async loadPlayersForTeam(league_id:string, team_id:string): Promise<PlayerInfo[]> {
        const espnLineup = await this.client.getEspnLineup(league_id,team_id);
        const team = espnLineup.teams.find(team => {return team.id == +team_id})
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