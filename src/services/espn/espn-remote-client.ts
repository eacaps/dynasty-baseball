import { LineupClient, EspnRosterForTeamIdResponse } from "../lineup-service";
import { TeamsClient, TeamsResponse } from "../team-service";

export default class EspnRemoteClient implements LineupClient, TeamsClient {    
    constructor() {
    }

    async getEspnLineup(league_id: string, team_id: string): Promise<EspnRosterForTeamIdResponse> {
        const response = await fetch(`https://fantasy.espn.com/apis/v3/games/flb/seasons/2021/segments/0/leagues/${league_id}?rosterForTeamId=${team_id}&view=mRoster`);
        const json = await response.json();
        return json;
    }
    
    async getTeams(league_id:string):Promise<TeamsResponse> {
        const response = await fetch(`https://fantasy.espn.com/apis/v3/games/flb/seasons/2021/segments/0/leagues/${league_id}`);
        const json = await response.json();
        return json;
    }
}