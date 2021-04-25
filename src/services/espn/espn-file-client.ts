import data from '../../../public/data/backham_bombers_2021_03_28.json';
import { PlayerInfo } from "../../stores/roster-store";
import { LineupClient, EspnRosterForTeamIdResponse } from "../lineup-service";

export default class EspnFileClient implements LineupClient{
    data: EspnRosterForTeamIdResponse;

    async getEspnLineup(league_id: string, team_id: string): Promise<EspnRosterForTeamIdResponse> {
        return this.data;
    }
    
    constructor() {
        this.data = data;
    }
}