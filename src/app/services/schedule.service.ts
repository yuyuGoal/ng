import { Injectable } from '@angular/core';
import { Schedule } from '../models/schedule.model';
import { ReplaySubject } from 'rxjs';
import { ChrClientService } from './chr-client.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  schedules$ = new ReplaySubject<any>(1);
  schedules : any = null;

  constructor(private chrClientService: ChrClientService) {

  }
  public getAllSchedules() {
    this.chrClientService.getClient().subscribe(client => {
      client.query<Schedule[]>("get_all_schedules", {}).then(schedules => {
        this.schedules = schedules;
        this.schedules$.next(schedules);
      });
    });
  }
}
