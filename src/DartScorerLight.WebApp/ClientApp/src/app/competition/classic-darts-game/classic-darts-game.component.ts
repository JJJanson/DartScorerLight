import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassicGameViewDto } from 'src/app/shared/dtos/classic-game-view-dto';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-classic-darts-game',
  templateUrl: './classic-darts-game.component.html',
  styleUrls: ['./classic-darts-game.component.less']
})
export class ClassicDartsGameComponent implements OnInit {

  public viewDto$: Observable<ClassicGameViewDto>;

  private _viewDto: ClassicGameViewDto;
  private _viewSubject = new BehaviorSubject<ClassicGameViewDto>(this._viewDto);

  constructor(
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const routeParams = this._activatedRoute.snapshot.params;
    this.viewDto$ = this._viewSubject.asObservable();

    this.initGame(routeParams.type);
  }

  public initGame(gameType: string): void {
    const startCounter = parseInt(gameType, 0);
    this._viewDto = {
      startCounter
    };

    this.emitViewDto();
  }

  private emitViewDto() {
    this._viewSubject.next(JSON.parse(JSON.stringify(this._viewDto)));
  }
}
