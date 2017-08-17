import { Injectable } from '@angular/core';
import { BaThemeConfigProvider } from '../../../theme';

@Injectable()
export class CalendarService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {

    let dashboardColors = this._baConfig.get().colors.dashboard;
    return {
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2017-06-23',
      selectable: true,
      selectHelper: true,
      editable: true,
      eventLimit: true,
      events: [
        {
          title: 'body day',
          start: '2017-06-01',
          color: dashboardColors.silverTree
        },
        {
          title: 'Dinner',
          start: '2017-06-21',
          color: dashboardColors.surfieGreen
        },
        {
          title: 'Birthday Party',
          start: '2017-06-30T07:00:00',
          color: dashboardColors.gossip
        }
      ]
    };
  }
}
