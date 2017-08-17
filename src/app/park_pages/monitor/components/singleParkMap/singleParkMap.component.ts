import { Component, ViewChild } from '@angular/core';
import { MonitorService } from './../../monitor.service';
import { BaAmap } from '../../../../theme/components/baAmap/baAmap.component';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { Park } from '../../../../model/park';
import { Place } from '../../../../model/place';

@Component({
  selector: 'singleParkMap',
  styleUrls: ['./singleParkMap.scss'],
  templateUrl: './singleParkMap.html',
  animations: [
    trigger('mapAnimate', [
      transition('* => zoomIn', [
        animate(500, keyframes([
          style({'opacity': 0, 'transform': 'scale3d(.1, .1, .1)', 'offset': 0}),
          style({'opacity': 1, 'transform': 'scale3d(1, 1, 1)', 'offset': 1})
        ]))
      ]),
      transition('zoomIn => zoomOutAfterIn', [
        animate(500, keyframes([
          style({'opacity': 1, 'transform': 'scale3d(1, 1, 1)', 'offset': 0}),
          style({'opacity': 0, 'transform': 'scale3d(.1, .1, .1)', 'offset': 1}),
          style({'opacity': 0, 'transform': 'scale3d(.1, .1, .1)', 'offset': 0}),
          style({'opacity': 1, 'transform': 'scale3d(1, 1, 1)', 'offset': 1})
        ]))
      ])
    ]),
    trigger('linkGridAnimate', [
      transition('* => zoomIn', [
        animate(500, keyframes([
          style({'opacity': 0, 'transform': 'scale3d(.1, .1, .1)', 'offset': 0}),
          style({'opacity': 1, 'transform': 'scale3d(1, 1, 1)', 'offset': 1})
        ]))
      ]),
      transition('zoomIn => void', [
        /*        animate(500, keyframes([
         style({'opacity': 1, 'transform': 'scale3d(1, 1, 1)', 'offset': 0}),
         style({'opacity': 0, 'transform': 'scale3d(.1, .1, .1)', 'offset': 1})
         ]))*/
      ])
    ])
  ]

})
export class SingleParkMap {
  // 获取模板内的第一个指定组件
  @ViewChild('singleParkMap')
  private amap: BaAmap;
  show: boolean = false;
  mapState: string = '';
  currentLayer: object = {'showId': 'all'};
  gridState: string = '';
  gridHeaderName: string = '泊位详情';
  gridHeader: object = {
    'all': '区域信息'
  };
  initZoom: number;
  initBaseLayersData: any;
  initOverLayersData: any;
  displayParkDialog: boolean;
  park: Park[];
  places: Place[];


  constructor(private _MonitorService: MonitorService) {
    let copyThis = this;
    copyThis.initZoom = 18;
    copyThis.initBaseLayersData = [
      {
        id: 'all',
        type: 'baseLayers',
        enable: true,
        name: '区域',
        zoom: 18,
        position: copyThis._MonitorService.getSingleParkMapCenterPonit(),
      }];
    copyThis.initOverLayersData = [
      {
        id: 'publicParkOverlay',
        enable: true,
        name: '停车场',
        type: 'overlay',
        min: 0,
        max: 18,
        initData: null,
        shape: 'Polygon'
      }
    ];
  }

  ngOnInit() {
  }

  // 初始化地图数据
  onLoadOverlayLayersData(id: string) {
    let copyThis = this;
    copyThis._MonitorService.getParkByID(id).then(park => {
      copyThis.park = park;
      copyThis.amap.loadOverlayLayersDataAfterBySinglePark(id, park);
    });
    copyThis._MonitorService.getPlaceByID(id).then(places => {
      copyThis.amap.drawHeatmap(places);
    });

  }

  // 切换图层后，表格切换
  onChangeCurrentView(currentLayer: any) {
  }

  onChangeCurrentData(changeLay: any) {

  }

  /*---表格相关开始--*/
  onCardSearch(searchText) {
    let copyThis = this;
    copyThis._MonitorService.getPlacesByPark().then(places => {
      copyThis.places = places;
    });
    copyThis.mapState = 'zoomIn';
    copyThis.gridState = 'zoomIn';
    copyThis.show = true;
  }

  onGridHide() {
    this.show = false;
    this.mapState = 'zoomOutAfterIn';
    this.gridState = '';

  }

  loadGridData(event) {
  }

  onGridMouseOver(o) {
    this.amap.mouseOver(o);
  }

  onGridMouseOut(o) {
    this.amap.mouseOut(o);
  }

  onLocation(o) {
    this.amap.location(o);
  }

  setPlaceClass(place) {
    let colorClass = 'place-no-used';
    if (place.state == '1') {
      colorClass = 'place-used';
    } else if (place.state == '2') {
      colorClass = 'place-stop-used';
    }

    return colorClass;
  }

  /*---表格相关结束--*/

  /*---弹出层相关开始--*/
  showParkDialog(park: Park) {
    let copyThis = this;

    this.displayParkDialog = true;
    copyThis._MonitorService.getPlacesByPark().then(places => {
      copyThis.places = places;
    });
  }

  onParkDialogHide() {
    this.displayParkDialog = false;
  }

  /*---弹出层相关结束--*/

}
