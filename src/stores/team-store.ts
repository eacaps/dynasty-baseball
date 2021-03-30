import { createContext } from "react";
import EspnLoader from "../services/espn-service";

export interface Team {
  id: string;
  league_id: string;
  name: string;
}

class TeamStore {
  constructor() {
  }

  teams: Team[] = [
      {id:'7', league_id:'68018', name: 'BACKHAM Bombers'}
  ]
}

export default createContext(new TeamStore())