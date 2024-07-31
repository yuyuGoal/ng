import { Component, OnInit } from '@angular/core';
import { AgendaService, DayService, EventSettingsModel, MonthAgendaService, MonthService, ScheduleModule, TimelineMonthService, TimelineViewsService, TimelineYearService, WeekService, YearService } from '@syncfusion/ej2-angular-schedule';
import { View } from '@syncfusion/ej2-schedule';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, ScheduleModule, CalendarModule, JsonPipe],
  providers: [DayService, WeekService, MonthService, YearService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService, TimelineYearService],
  templateUrl: './schedule-page.component.html',
  styleUrl: './schedule-page.component.scss'
})
export class SchedulePageComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor() {
  }

  dataManager: DataManager = new DataManager({
    url: 'https://services.syncfusion.com/angular/production/api/Schedule',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });
  views: View[] = ['Year', 'Month', 'Week', 'Day', 'Agenda']; // 'MonthAgenda', 'TimelineDay', 'TimelineWeek', 'TimelineMonth', 'TimelineYear',
  selectedView: View = 'Month';
  selectedDate: Date = new Date(2024, 7, 30);
  eventSettings: EventSettingsModel = {
    dataSource: this.dataManager,
  };
}
