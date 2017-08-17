import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, ColorHelper } from '../../../theme';

@Injectable()
export class TrafficChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }


  getData() {
    let dashboardColors = this._baConfig.get().colors.dashboard;
    return [
      {
        value: 4000,
        color: dashboardColors.white,
        highlight: ColorHelper.shade(dashboardColors.white, 15),
        label: '历下区',
        percentage: 40,
        order: 1,
      }, {
        value: 2200,
        color: dashboardColors.gossip,
        highlight: ColorHelper.shade(dashboardColors.gossip, 15),
        label: '历城区',
        percentage: 22,
        order: 4,
      }, {
        value: 1200,
        color: dashboardColors.silverTree,
        highlight: ColorHelper.shade(dashboardColors.silverTree, 15),
        label: '市中区',
        percentage: 12,
        order: 3,
      }, {
        value: 1600,
        color: dashboardColors.surfieGreen,
        highlight: ColorHelper.shade(dashboardColors.surfieGreen, 15),
        label: '槐荫区',
        percentage: 16,
        order: 2,
      }, {
        value: 1000,
        color: dashboardColors.blueStone,
        highlight: ColorHelper.shade(dashboardColors.blueStone, 15),
        label: '天桥区',
        percentage: 10,
        order: 0,
      },
    ];
  }
}
