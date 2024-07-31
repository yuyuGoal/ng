import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'schedule', component: SchedulePageComponent },
  { path: '**', redirectTo: '/' },
];
