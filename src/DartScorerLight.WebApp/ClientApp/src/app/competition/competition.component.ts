import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.less']
})
export class CompetitionComponent implements OnInit, AfterViewInit {

  @ViewChild('playerCountInputComp') playerCountInputComp: ElementRef;

  public gameSettingForm: FormGroup;
  public gameTypeControl: FormControl;
  public playerCountControl: FormControl;

  public playerObj: string[];
  public playerFormControls: FormControl[];
  public playerList = ['Jonas', 'Jelena'];

  private selectedGameType = '501';
  private palyerCount = 1;

  constructor(
  ) { }

  public ngOnInit() {
    this.createForm();
    this.refreshPlayerObj();
  }

  public ngAfterViewInit(): void {
    this.playerCountInputComp.nativeElement.focus();
  }

  public createForm(): void {
    this.gameTypeControl = new FormControl(this.selectedGameType);
    this.playerCountControl = new FormControl(this.palyerCount, [Validators.min(1)]);

    this.gameSettingForm = new FormGroup({
      gameTypeControl: this.gameTypeControl,
      playerCountControl: this.playerCountControl
    });

    this.gameSettingForm.valueChanges.subscribe(() => {
      this.selectedGameType = this.gameTypeControl.value;

      if (this.playerCountControl.value > 1) {
        this.palyerCount = this.playerCountControl.value;
      } else {
        this.palyerCount = 1;
      }

      this.refreshPlayerObj();
      this.playerCountInputComp.nativeElement.focus();
    });
  }

  public selectPlayer(event: MatAutocompleteSelectedEvent, index: number) {
    this.playerObj[index] = event.option.value;
  }

  private refreshPlayerObj(): void {
    const newArray = new Array<string>();
    this.playerFormControls = new Array();

    for (let index = 0; index < this.palyerCount; index++) {
      if (this.playerObj && this.playerObj.length > 0) {
        if (index < this.palyerCount) {
          this.addPlayer(newArray, this.playerObj[index], index);
          continue;
        }
      }

      this.addPlayer(newArray, '', index);
    }

    this.playerObj = newArray;
  }

  private addPlayer(newPlayerArray: string[], playerName: string, index: number): void {
    newPlayerArray.push(playerName);
    const formControl = new FormControl(playerName, [Validators.required]);
    this.playerFormControls.push(formControl);
  }
}
