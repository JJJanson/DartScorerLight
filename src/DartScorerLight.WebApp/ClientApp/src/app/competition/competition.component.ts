import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.less']
})
export class CompetitionComponent implements OnInit {

  public selectedGameType = '501';

  constructor() { }

  ngOnInit() {
  }

  public changeGameType(type: string): void {
    this.selectedGameType = type;
  }
}
