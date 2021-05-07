import LineupData from '../../../public/data/backham_bombers_2021_03_28.json';
import TeamsData from '../../../public/data/teams_2021_05_06.json';
import { PlayerInfo } from "../../stores/roster-store";
import { LineupClient, EspnRosterForTeamIdResponse } from "../lineup-service";
import { TeamsClient, TeamsResponse } from '../team-service';

export default class EspnFileClient implements LineupClient,TeamsClient{
    lineupData: EspnRosterForTeamIdResponse;
    teamsData: TeamsResponse;

    async getEspnLineup(league_id: string, team_id: string): Promise<EspnRosterForTeamIdResponse> {
        return this.lineupData;
    }
    
    constructor() {
        this.lineupData = LineupData;
        this.teamsData = TeamsData;
    }
    async getTeams(league_id: string): Promise<TeamsResponse> {
        return this.teamsData;
    }
}