import { PlayerComponent } from './player/player.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
// tslint:disable-next-line:max-line-length
import { MatCardModule, MatInputModule, MatRadioModule, MatAutocompleteModule, MatButtonModule, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig, MatProgressSpinnerModule, MatExpansionModule, MatIconModule } from '@angular/material';
import { CompetitionComponent } from './competition/competition.component';
import { StatisticComponent } from './statistic/statistic.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClassicDartsGameComponent } from './competition/classic-darts-game/classic-darts-game.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CompetitionComponent,
    PlayerComponent,
    StatisticComponent,
    ClassicDartsGameComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'competition', component: CompetitionComponent },
      { path: 'competition/:type', component: ClassicDartsGameComponent },
      { path: 'player', component: PlayerComponent },
      { path: 'statistic', component: StatisticComponent },
      { path: '**', redirectTo: '/' }
    ]),
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatIconModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['custom-snack-bar-styling']
      } as MatSnackBarConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
