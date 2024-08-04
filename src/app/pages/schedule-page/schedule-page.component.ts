import { Component, OnInit, ViewChild } from '@angular/core';
import { AgendaService, DayService, EventSettingsModel, MonthAgendaService, MonthService, ScheduleComponent, ScheduleModule, TimelineMonthService, TimelineViewsService, TimelineYearService, WeekService, WorkHoursModel, YearService } from '@syncfusion/ej2-angular-schedule';
import { View } from '@syncfusion/ej2-schedule';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { JsonPipe } from '@angular/common';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, ScheduleModule, CalendarModule, JsonPipe],
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

  onCreated(){
    let currTime: Date = new Date();
    let hours: string = currTime.getHours() < 10 ? '0' +currTime.getHours().toString() : currTime.getHours().toString();
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
      Id: 1,
      Subject: 'Meeting',
      StartTime: new Date(2024, 6, 30, 10, 0),
      EndTime: new Date(2024, 6, 30, 12, 30),
      isAllDay: true,
    },
    {
      Id: 2,
      Subject: '跑步',
      StartTime: new Date(2024, 0, 30, 19, 0),
      EndTime: new Date(2024, 0, 30, 21, 30),
      isAllDay: false,
      RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,FR;COUNT=100',
    }
  ];

  views: View[] = ['Year', 'Month', 'Week', 'Day', 'Agenda']; // 'MonthAgenda', 'TimelineDay', 'TimelineWeek', 'TimelineMonth', 'TimelineYear',
  selectedView: View = 'Month';
  selectedDate: Date = new Date();
  workDays: number[] = [1, 3, 5];
  workHours: WorkHoursModel  = { highlight: true, start: '00:00', end: '00:00'};
  eventSettings: EventSettingsModel = {
    dataSource: this.data,
    fields: {
      id: 'Id',
      subject: { name: 'Subject' },
      isAllDay: { name: 'isAllDay' },
      startTime: { name: 'StartTime' },
      endTime: { name: 'EndTime' },
      recurrenceRule: { name: 'RecurrenceRule' }
    }
  };
}
