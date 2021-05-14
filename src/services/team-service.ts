import { Team } from "../stores/team-store";
import EspnRemoteClient from "./espn/espn-remote-client";

export interface TeamsClient {
    getTeams(league_id:string):Promise<TeamsResponse>;
}

export interface TeamsResponse {
    gameId: number;
    id: number;
    settings: {
        name:string;
    };
    teams: EspnTeam[];
}

export interface EspnTeam {
    abbrev: string;
    id: number;
    location: string;
    nickname: string;
    owners: string[];
}

export default class TeamsService {
    client: TeamsClient;

    constructor() {
        this.client = new EspnRemoteClient();
    }

    async getTeams(league_id:string):Promise<Team[]> {
        const espn_teams = await this.client.getTeams(league_id);
        const teams:Team[] = [];
        espn_teams.teams.forEach(espn_team => {
            const {id,nickname} = espn_team;
            teams.push({
                id:''+id,name:nickname,league_id
            })
        });
        return teams;
    }
}