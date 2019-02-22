import { PlayerDto } from './../dtos/player-dto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private _playerList: PlayerDto[];

  constructor() { }

  public get playerList() {
    return this._playerList;
  }

  public set playerList(players: PlayerDto[]) {
    this._playerList = players;
  }
}
