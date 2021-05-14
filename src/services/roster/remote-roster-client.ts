import { Roster } from "../../stores/roster-store";
import { GetRosterResponse, RosterClient, SaveRosterResponse } from "../roster-service";

export default class RemoteRosterClient implements RosterClient {
    async getRoster(league_id:string, team_id:string, rev_id?:number): Promise<GetRosterResponse> {
        const key = `league/${league_id}/team/${team_id}/roster${rev_id ? '/'+rev_id : ''}`;
        try {
            const rosterResponse = await fetch(`/api/${key}`);
            if(!rosterResponse.ok) throw new Error('response not okay')
            const responseJson = await rosterResponse.json();
            return responseJson;
        }
        catch(e) {
            console.log(`getRoster error: ${e}`);
        }
        return {revision:0};
    }

    async saveRoster(roster:Roster, revision:number): Promise<SaveRosterResponse> {
        // const response = await this.getRoster(roster.league_id, roster.team_id);
        // const revision = response.revision + 1;
        const team_key = `league/${roster.league_id}/team/${roster.team_id}/roster`;
        const rev_key = `league/${roster.league_id}/team/${roster.team_id}/roster/${revision}`;
        const rosterString = JSON.stringify({roster,revision})
        try{
            const response = await fetch(`/api/${rev_key}`, {
                method: 'POST',
                body: rosterString,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if(response.ok) return {success: true, revision: revision};
        }
        catch(e) {
            console.log(`saveRoster error: ${e}`);
        }
        return {success: false, revision: revision};
    }
}