import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.less']
})
export class CompetitionComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('playerCountInputComp') playerCountInputComp: ElementRef;
  @ViewChild('submitButton') submitButton: any;

  public gameSettingForm: FormGroup;
  public gameTypeControl: FormControl;
  public playerCountControl: FormControl;

  public playerObj: string[];
  public playerFormControls: FormControl[];
  public playerList = ['Jonas', 'Jelena'];
  public filteredPlayerList: Observable<string[]>;

  private selectedGameType = '501';
  private palyerCount = 1;

  private _subscriptions = new Array<Subscription>();

  constructor(
    private _snackBar: MatSnackBar
  ) {
    // ignore
  }

  public ngOnInit() {
    this.createForm();
    this.refreshPlayerObj();
    this.setPlayerAutoCompleteEvents();
    this.filteredPlayerList = of(this.playerList);
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.playerCountInputComp.nativeElement.focus();
    }, 500);
  }

  public createForm(): void {
    this.gameTypeControl = new FormControl(this.selectedGameType);
    this.playerCountControl = new FormControl(this.palyerCount, [Validators.min(1)]);

    this.gameSettingForm = new FormGroup({
      gameTypeControl: this.gameTypeControl,
      playerCountControl: this.playerCountControl
    });


    const gameSettingSub = this.gameSettingForm.valueChanges.subscribe(() => {
      this.selectedGameType = this.gameTypeControl.value;

      if (this.playerCountControl.value > 1) {
        this.palyerCount = this.playerCountControl.value;
      } else {
        this.palyerCount = 1;
      }

      this.refreshPlayerObj();
      this.setPlayerAutoCompleteEvents();
      this.playerCountInputComp.nativeElement.focus();
    });

    this._subscriptions.push(gameSettingSub);
  }

  public selectPlayer(event: MatAutocompleteSelectedEvent, index: number) {
    this.playerObj[index] = event.option.value;
    this.filteredPlayerList = of(this.playerList);
    if (!this.playerObj.includes(undefined)) {
      this.submitButton._elementRef.nativeElement.focus();
    }
  }

  public startGame(): void {
    if (this.gameSettingForm.invalid || this.playerFormControls.find(c => c.invalid) !== undefined) {
      this.showNotification('Es sind nicht alle Felder korrekt ausgefüllt');
    } else {
      alert('Game on');
    }
  }

  public showNotification(message: string): void {
    const snackBarRef = this._snackBar.open(message, 'Schließen');
    const snackBarSub = snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });

    this._subscriptions.push(snackBarSub);
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

  private setPlayerAutoCompleteEvents(): void {
    this.playerFormControls.forEach(playerControl => {
      const sub = playerControl.valueChanges.subscribe(value => {
        this.filteredPlayerList = of(this.filter(value));
      });

      this._subscriptions.push(sub);
    });
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.playerList.filter(option => option.toLowerCase().includes(filterValue));
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
