import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Observable, of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MainService } from '../shared/services/main.service';
import { PlayerDto } from '../shared/dtos/player-dto';
import { type } from 'os';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.less']
})
export class CompetitionComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('playerCountInputComp') playerCountInputComp: ElementRef;
  @ViewChild('submitButton') submitButton: any;

  public autoCompleteDisplayFn: () => void;

  public gameSettingForm: FormGroup;
  public gameTypeControl: FormControl;
  public playerCountControl: FormControl;

  public step = 0;
  public playerObj: PlayerDto[];
  public playerFormControls: FormControl[];
  public playerList: PlayerDto[] = [{ name: 'Jonas', alias: 'JJJanson', id: 1 }, { name: 'Jelena', alias: 'Jele', id: 2 }];
  public filteredPlayerList: Observable<PlayerDto[]>;

  private selectedGameType = '501';
  private palyerCount = 1;

  private _subscriptions = new Array<Subscription>();

  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _mainService: MainService
  ) {
    this.autoCompleteDisplayFn = this.autoCompleteDisplay.bind(this);
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

  public setStep(index: number): void {
    this.step = index;
  }

  public nextStep(): void {
    this.step++;
  }

  public prevStep(): void {
    this.step--;
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
    this.playerObj[index] = this.playerList.find(p => p.name === event.option.value);
    this.filteredPlayerList = of(this.playerList);
    if (!this.playerObj.includes(undefined)) {
      this.submitButton._elementRef.nativeElement.focus();
    }
  }

  public autoCompleteDisplay(name: string): string {
    if (!name || typeof (name) === 'object') {
      return '';
    }

    return name;
  }

  public startGame(): void {
    if (this.playerCountControl.invalid || this.playerFormControls.find(c => c.invalid) !== undefined) {
      this.showNotification('Es sind nicht alle Felder korrekt ausgefüllt');
    } else {
      this._mainService.playerList = this.playerObj;
      this._router.navigate(['competition', this.selectedGameType]);
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
    const newArray = new Array<PlayerDto>();
    this.playerFormControls = new Array();

    for (let index = 0; index < this.palyerCount; index++) {
      if (this.playerObj && this.playerObj.length > 0) {
        if (index < this.palyerCount) {
          this.addPlayer(newArray, this.playerObj[index], index);
          continue;
        }
      }

      this.addPlayer(newArray, {} as PlayerDto, index);
    }

    this.playerObj = newArray;
  }

  private addPlayer(newPlayerArray: PlayerDto[], playerName: PlayerDto, index: number): void {
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

  private filter(value: string): PlayerDto[] {
    const filterValue = value.toLowerCase();
    return this.playerList.filter(option => option.name.toLowerCase().includes(filterValue) || option.alias.toLowerCase().includes(filterValue));
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
