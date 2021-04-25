import { LineupClient, EspnRosterForTeamIdResponse } from "../lineup-service";

export default class EspnRemoteClient implements LineupClient{    
    constructor() {
    }

    async getEspnLineup(league_id: string, team_id: string): Promise<EspnRosterForTeamIdResponse> {
        const response = await fetch(`https://fantasy.espn.com/apis/v3/games/flb/seasons/2021/segments/0/leagues/${league_id}?rosterForTeamId=${team_id}&view=mRoster`);
        const json = await response.json();
        return json;
    }
}