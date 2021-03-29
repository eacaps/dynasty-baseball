import { observable, action, computed, reaction } from "mobx";
import { createContext } from "react";
import EspnLoader from "../services/espn-service";

export interface Team {
  id: string;
  league_id: string;
  name: string;
  roster?: number[];
}

class TeamStore {
  constructor() {
    reaction(() => this.teams, _ => console.log(this.teams.length))
  }

  @observable teams: Team[] = [
      {id:'7', league_id:'68018', name: 'BACKHAM Bombers', roster:['36185','31187']}
  ]
}

export default createContext(new TeamStore())