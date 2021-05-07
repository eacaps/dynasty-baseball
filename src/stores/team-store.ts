import { createContext } from "react";
import TeamsService from "../services/team-service";

export interface Team {
  id: string;
  league_id: string;
  name: string;
}

class TeamStore {
  service = new TeamsService();
  constructor() {
  }

  async getTeams():Promise<Team[]> {
    const teams = await this.service.getTeams('68018');
    this.teams = teams;
    return teams;
  }

  teams: Team[] = []
}

export default createContext(new TeamStore())