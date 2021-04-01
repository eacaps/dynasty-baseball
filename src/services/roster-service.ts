import { Roster } from "../stores/roster-store";


export default class RosterService {
    async loadRoster(league_id:string, team_id:string): Promise<Roster> | undefined {
        const key = `league/${league_id}/team/${team_id}/roster`;
        const rosterString = window.localStorage.getItem(key);
        if(!rosterString) return;
        const roster:Roster = JSON.parse(rosterString);
        return roster;
    }

    async saveRoster(roster:Roster): Promise<number> {
        const now = Date.now();
        roster.created_at = now;
        const key = `league/${roster.league_id}/team/${roster.team_id}/roster`;
        const rosterString = JSON.stringify(roster)
        window.localStorage.setItem(key,rosterString);
        // console.log(rosterString);
        return now;
    }
}