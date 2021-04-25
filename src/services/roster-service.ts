import { Roster } from "../stores/roster-store";
import LocalRosterClient from "./roster/local-roster-client";

export interface RosterClient {
    getRoster(league_id:string, team_id:string, rev_id?:number):Promise<GetRosterResponse>;
    saveRoster(roster:Roster, rev_id:number):Promise<SaveRosterResponse>;
}

export interface GetRosterResponse {
    roster?: Roster;
    revision: number;
}

export interface SaveRosterResponse {
    success: boolean;
    revision: number;
}

export default class RosterService {
    client:RosterClient;

    constructor() {
        this.client = new LocalRosterClient();
    }

    async loadRoster(league_id:string, team_id:string): Promise<Roster | undefined> {
        const response = await this.client.getRoster(league_id,team_id);
        return response.roster;
    }

    async saveRoster(roster:Roster): Promise<number | undefined> {
        const response = await this.client.getRoster(roster.league_id,roster.team_id);
        const revision = response.revision + 1;
        const now = Date.now();
        roster.created_at = now;
        roster.players.forEach(player => player.keeperInfo?.keeperYears && delete player.draft)
        const rosterResponse = await this.client.saveRoster(roster, revision);
        if(!rosterResponse.success) return;
        return now;
    }
}