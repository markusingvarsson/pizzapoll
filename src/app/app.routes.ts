import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PollComponent } from './poll/poll.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vote', component: PollComponent },
];
