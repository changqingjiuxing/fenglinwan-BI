import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing } from './dashboard.routing';

import { PieChart } from './pieChart';
import { TrafficChart } from './trafficChart';
import { ParksMap } from './parksMap';
import { LineChart } from './lineChart';
import { Todo } from './todo';
import { Calendar } from './calendar';
import { CalendarService } from './calendar/calendar.service';
import { LineChartService } from './lineChart/lineChart.service';
import { PieChartService } from './pieChart/pieChart.service';
import { TodoService } from './todo/todo.service';
import { TrafficChartService } from './trafficChart/trafficChart.service';
import { ParksMapService } from './parksMap/parksMap.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing
  ],
  declarations: [
    PieChart,
    TrafficChart,
    ParksMap,
    LineChart,
    Todo,
    Calendar,
    Dashboard
  ],
  providers: [
    CalendarService,
    LineChartService,
    PieChartService,
    TodoService,
    TrafficChartService,
    ParksMapService
  ]
})
export class DashboardModule {}
