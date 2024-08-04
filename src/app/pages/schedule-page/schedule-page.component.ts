import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AgendaService,
  DayService,
  EventFieldsMapping,
  EventSettingsModel,
  MonthAgendaService,
  MonthService,
  ScheduleComponent,
  ScheduleModule,
  TimelineMonthService,
  TimelineViewsService,
  TimelineYearService,
  WeekService,
  WorkHoursModel,
  YearService
} from '@syncfusion/ej2-angular-schedule';
import { View } from '@syncfusion/ej2-schedule';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { RouterOutlet } from '@angular/router';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { JsonPipe, NgIf } from '@angular/common';
import { ScheduleService } from '../../services/schedule.service';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ActionEventArgs, AddEventArgs, CustomAddEventArgs, EditEventArgs } from '@syncfusion/ej2-angular-grids';
import { ActionCompleteEventArgs } from '@syncfusion/ej2-angular-inputs';
import { ActionBeginEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { Schedule } from '../../models/schedule.model';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, ScheduleModule, CalendarModule, JsonPipe, ButtonModule, NgIf],
  providers: [DayService, WeekService, MonthService, YearService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService, TimelineYearService],
  templateUrl: './schedule-page.component.html',
  styleUrl: './schedule-page.component.scss'
})
export class SchedulePageComponent implements OnInit {
  @ViewChild('scheduleObj') scheduleObj: ScheduleComponent | undefined;

  constructor(public scheduleService: ScheduleService) {

  }

  ngOnInit(): void {
    this.scheduleService.getAllSchedules();
    let schedules$ = this.scheduleService.schedules$;
    schedules$.subscribe(schedules => {
      console.log('schedules: ', schedules);
      this.data = schedules;
      this.scheduleObj && (this.scheduleObj.eventSettings.dataSource = schedules);
    })
  }

  onCreated() {
    let currTime: Date = new Date();
    let hours: string = currTime.getHours() < 10 ? '0' + currTime.getHours().toString() : currTime.getHours().toString();
    let minutes: string = currTime.getMinutes().toString();
    let time: string = hours + ':' + minutes;
    this.scheduleObj?.scrollTo(time);
  }

  dataManager: DataManager = new DataManager({
    url: 'https://services.syncfusion.com/angular/production/api/Schedule',
    crudUrl: 'https://services.syncfusion.com/angular/production/api/Schedule',
    adaptor: new ODataV4Adaptor,
    crossDomain: true,
  });

  data: object[] = [
    {
      id: 1,
      subject: '開會',
      startTime: new Date(2024, 7, 30, 10, 0),
      endTime: new Date(2024, 7, 30, 12, 30),
      isAllDay: true,
    },
    {
      id: 2,
      subject: '跑步',
      startTime: new Date(2024, 6, 30, 19, 0),
      endTime: new Date(2024, 6, 30, 21, 30),
      isAllDay: false,
      recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,FR;COUNT=100',
      startTimezone: 'Asia/Taipei',
      endTimezone: 'Asia/Taipei'
    },
    {
      id: 3,
      subject: '寫程式',
      startTime: new Date(2024, 6, 5, 12, 0),
      endTime: new Date(2024, 6, 5, 18, 0),
      isAllDay: false,
      recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TH;INTERVAL=1;UNTIL=20251013T160000Z;',
      startTimezone: 'Asia/Taipei',
      endTimezone: 'Asia/Taipei'
    },
    {
      id: 4,
      subject: '補習班看書',
      startTime: new Date(2024, 5, 5, 9, 0),
      endTime: new Date(2024, 5, 5, 12, 0),
      isAllDay: false,
      recurrenceRule: 'FREQ=DAILY;INTERVAL=3;COUNT=5;',
      startTimezone: 'Asia/Taipei',
      endTimezone: 'Asia/Taipei'
    },
  ];

  views: View[] = ['Year', 'Month', 'Week', 'Day', 'Agenda']; // 'MonthAgenda', 'TimelineDay', 'TimelineWeek', 'TimelineMonth', 'TimelineYear',
  selectedView: View = 'Month';
  selectedDate: Date = new Date();
  workDays: number[] = [1, 3, 5];
  workHours: WorkHoursModel = {highlight: true, start: '00:00', end: '00:00'};
  eventSettings: EventSettingsModel = {
    dataSource: this.data,
    fields: {
      id: 'id',
      subject: {name: 'subject'},
      startTime: {name: 'startTime'},
      endTime: {name: 'endTime'},
      startTimezone: {name: 'startTimezone'},
      endTimezone: {name: 'endTimezone'},
      isAllDay: {name: 'isAllDay'},
      isBlock: 'isBlock',
      isReadonly: 'isReadonly',
      recurrenceRule: {name: 'recurrenceRule'}
    }
  };

  onActionBegin(args: AddEventArgs) { // args: AddEventArgs | EditEventArgs | ActionBeginEventArgs
    switch (args.requestType) {
      case 'eventCreate':
        const createData = args.data as EventFieldsMapping[];
        createData.forEach(event => {
            let schedule: Schedule = {
              id: Number(event.id),
              subject: event.subject || '',
              startTime: event.startTime ? new Date(event.startTime).toISOString() : '',
              endTime: event.endTime ? new Date(event.endTime).toISOString() : '',
              startTimezone: event.startTimezone || '',
              endTimezone: event.endTimezone || '',
              isAllDay: !!event.isAllDay,
              isBlock: !!event.isBlock,
              isReadonly: !!event.isReadonly,
              recurrenceRule: event.recurrenceRule || '',
            }
            this.scheduleService.createSchedule(schedule);
          }
        );
        break;
      case 'eventChange':
        const changeData = args.data as EventFieldsMapping;
        let schedule: Schedule = {
          id: Number(changeData.id),
          subject: changeData.subject || '',
          startTime: changeData.startTime ? new Date(changeData.startTime).toISOString() : '',
          endTime: changeData.endTime ? new Date(changeData.endTime).toISOString() : '',
          startTimezone: changeData.startTimezone || '',
          endTimezone: changeData.endTimezone || '',
          isAllDay: !!changeData.isAllDay,
          isBlock: !!changeData.isBlock,
          isReadonly: !!changeData.isReadonly,
          recurrenceRule: changeData.recurrenceRule || '',
        }
        this.scheduleService.updateSchedule(schedule);
        break;
      case 'eventRemove':
        console.log('eventRemove', args);
        const removeData = args.data as EventFieldsMapping[];
        removeData.forEach(event => {
            this.scheduleService.deleteSchedule(Number(event.id));
          }
        );
        break;
    }
  }

  onActionComplete(args: AddEventArgs) {
    // console.log(args);
  }
}
