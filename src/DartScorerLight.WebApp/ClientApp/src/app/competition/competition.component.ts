import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

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

  private selectedGameType = '501';
  private palyerCount = 1;

  constructor(
  ) { }

  public ngOnInit() {
    this.createForm();
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

      if (this.playerCountControl.value < 1) {
        this.palyerCount = this.playerCountControl.value;
      }

      this.playerCountInputComp.nativeElement.focus();
    });
  }
}
