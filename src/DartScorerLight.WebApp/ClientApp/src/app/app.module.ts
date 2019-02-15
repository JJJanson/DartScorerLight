import { PlayerComponent } from './player/player.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { MatCardModule, MatInputModule, MatRadioModule, MatAutocompleteModule } from '@angular/material';
import { CompetitionComponent } from './competition/competition.component';
import { StatisticComponent } from './statistic/statistic.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CompetitionComponent,
    PlayerComponent,
    StatisticComponent
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
      { path: 'player', component: PlayerComponent },
      { path: 'statistic', component: StatisticComponent },
      { path: '**', redirectTo: '/' }
    ]),
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
