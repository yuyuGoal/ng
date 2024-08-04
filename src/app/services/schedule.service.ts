import { Injectable } from '@angular/core';
import { Schedule } from '../models/schedule.model';
import { ReplaySubject } from 'rxjs';
import { ChrClientService } from './chr-client.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  schedules$ = new ReplaySubject<any>(1);
  schedules: any = null;

  constructor(private chrClientService: ChrClientService) {

  }

  getAllSchedules() {
    this.chrClientService.getClient().subscribe(client => {
      client.query<Schedule[]>('get_all_schedules', {})
        .then(schedules => {
          this.schedules = schedules;
          this.schedules$.next(schedules);
        });
    });
  }

  createSchedule(s: Schedule) {
    this.chrClientService.getClient().subscribe(client => {
      client.signAndSendUniqueTransaction({
          name: 'create_schedule',
          args: [s.id, s.subject, s.startTime, s.endTime, s.startTimezone, s.endTimezone, s.isAllDay, s.isBlock, s.isReadonly, s.recurrenceRule]
        },
        this.chrClientService.adminSignatureProvider)
        .then(() => {
        });
    });
  }

  updateSchedule(s: Schedule) {
    this.chrClientService.getClient().subscribe(client => {
      client.signAndSendUniqueTransaction({
          name: 'update_schedule',
          args: [s.id, s.subject, s.startTime, s.endTime, s.startTimezone, s.endTimezone, s.isAllDay, s.isBlock, s.isReadonly, s.recurrenceRule]
        },
        this.chrClientService.adminSignatureProvider)
        .then(() => {
        });
    });
  }

  deleteSchedule(id: number) {
    console.log('deleteSchedule', id, typeof id);
    this.chrClientService.getClient().subscribe(client => {
      client.signAndSendUniqueTransaction({
          name: 'delete_schedule',
          args: [id]
        },
        this.chrClientService.adminSignatureProvider)
        .then(() => {
        });
    });
  }
}


