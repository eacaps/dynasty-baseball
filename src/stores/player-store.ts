import { observable, action, computed, reaction, runInAction } from "mobx";
import { createContext } from "react";
import EspnLoader from "../services/espn-service";

export interface Player {
  id: string;
  name: string;
  years?: number;
}

class PlayerStore {
  // service :EspnLoader;
  constructor() {
    reaction(() => this.players, _ => console.log(this.players.length))
    // this.service = new EspnLoader();
  }

  @observable players: Player[] = [
    {id:'36185',name:'Ronald Acuna Jr.'},
    {id:'31187',name:'Nick Castellanos'}
  ]

  getPlayers = async (id:string) => {
    // const data = await this.service.loadPlayersForTeam(id);

    // runInAction(() => {
    //   this.players = data;
    // });
  }
}

export default createContext(new PlayerStore())