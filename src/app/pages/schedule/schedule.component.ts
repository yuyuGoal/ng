import { Component, OnInit } from '@angular/core';
import { AgendaService, DayService, EventSettingsModel, MonthService, ScheduleModule, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { View } from '@syncfusion/ej2-schedule';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, ScheduleModule, CalendarModule],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent implements OnInit{
  ngOnInit(): void {
  }

  data: object[] = [
    {
      Id: 1,
      Subject: 'Meeting',
      StartTime: new Date(2024, 6, 30, 10, 0),
      EndTime: new Date(2024, 6, 30, 12, 30),
      isAllDay: true,
    },
  ];

  selectedView: View = 'Month';
  selectedDate: Date = new Date(2024, 7, 30);
  eventSettings: EventSettingsModel = {
    dataSource: this.data,
  };
}
