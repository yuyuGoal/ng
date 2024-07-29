import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AgendaService, DayService, MonthAgendaService, MonthService, TimelineMonthService, TimelineViewsService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';

import { routes } from './app.routes';
import { GridModule } from '@syncfusion/ej2-angular-grids';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), GridModule, DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService]
};
