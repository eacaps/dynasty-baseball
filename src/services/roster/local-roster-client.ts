import { Roster } from "../../stores/roster-store";
import { GetRosterResponse, RosterClient, SaveRosterResponse } from "../roster-service";

export default class LocalRosterClient implements RosterClient {
    async getRoster(league_id:string, team_id:string, rev_id?:number): Promise<GetRosterResponse> {
        const key = `league/${league_id}/team/${team_id}/roster${rev_id ? '/'+rev_id : ''}`;
        const rosterString = window.localStorage.getItem(key);
        if(!rosterString) return {revision:0};
        const rosterResponse:GetRosterResponse = JSON.parse(rosterString);
        return rosterResponse;
    }

    async saveRoster(roster:Roster, revision:number): Promise<SaveRosterResponse> {
        // const response = await this.getRoster(roster.league_id, roster.team_id);
        // const revision = response.revision + 1;
        const team_key = `league/${roster.league_id}/team/${roster.team_id}/roster`;
        const rev_key = `league/${roster.league_id}/team/${roster.team_id}/roster/${revision}`;
        const rosterString = JSON.stringify({roster,revision})
        window.localStorage.setItem(team_key,rosterString);
        window.localStorage.setItem(rev_key,rosterString);
        // console.log(rosterString);
        return {success: true, revision: revision};
    }
}