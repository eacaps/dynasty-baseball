import { observable, action, computed, reaction } from "mobx";
import { createContext } from "react";

export interface Team {
  id: string;
  league_id: string;
  name: string;
}

class TeamStore {
  constructor() {
    reaction(() => this.teams, _ => console.log(this.teams.length))
  }

  @observable teams: Team[] = [
      {id:'7', league_id:'68018', name: 'BACKHAM Bombers'}
  ]
}

export default createContext(new TeamStore())