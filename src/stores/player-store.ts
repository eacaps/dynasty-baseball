import { createContext } from "react";
import EspnLoader from "../services/espn-service";

export interface Player {
  id: string;
  name: string;
}

class PlayerStore {
  constructor() {
  }

  players: Player[] = [
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