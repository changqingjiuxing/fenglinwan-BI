import { Component, ViewChild } from '@angular/core';
import { MonitorService } from './../../monitor.service';
import { BaAmap } from '../../../../theme/components/baAmap/baAmap.component';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { Region } from '../../../../model/region';
import { Park } from '../../../../model/park';
import { Road } from '../../../../model/road';
import { Place } from '../../../../model/place';

@Component({
  selector: 'parkMap',
  styleUrls: ['./parkMap.scss'],
  templateUrl: './parkMap.html',

  animations: [
    trigger('mainMapAnimate', [
      transition('* => zoomIn', [
        animate(500, keyframes([
          style({ 'opacity': 0, 'transform': 'scale3d(.1, .1, .1)', 'offset': 0 }),
          style({ 'opacity': 1, 'transform': 'scale3d(1, 1, 1)', 'offset': 1 })
        ]))
      ]),
      transition('zoomIn => zoomOutAfterIn', [
        animate(500, keyframes([
          style({ 'opacity': 1, 'transform': 'scale3d(1, 1, 1)', 'offset': 0 }),
          style({ 'opacity': 0, 'transform': 'scale3d(.1, .1, .1)', 'offset': 1 }),
          style({ 'opacity': 0, 'transform': 'scale3d(.1, .1, .1)', 'offset': 0 }),
          style({ 'opacity': 1, 'transform': 'scale3d(1, 1, 1)', 'offset': 1 })
        ]))
      ])
    ]),
    trigger('linkGridAnimate', [
      transition('* => zoomIn', [
        animate(500, keyframes([
          style({ 'opacity': 0, 'transform': 'scale3d(.1, .1, .1)', 'offset': 0 }),
          style({ 'opacity': 1, 'transform': 'scale3d(1, 1, 1)', 'offset': 1 })
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
export class ParkMap {
  // 获取模板内的第一个指定组件
  @ViewChild('parkMap')
  private amap: BaAmap;
  show: boolean = false;
  mapState: string = '';
  currentLayer: object = { 'showId': 'all' };
  gridState: string = '';
  gridHeaderName: string = '区域信息';
  gridHeader: object = {
    'all': '区域信息', 'road': '道路信息', 'park': '停车场信息', 'place': '泊位信息'
  };
  initBaseLayersData: any;
  initOverLayersData: any;
  displayParkDialog: boolean;
  regions: Region[];
  roads: Road[];
  parks: Park[];
  places: Place[];
  demonstrationRoads: Road[];
  elseRoads: Road[];
  roadPark: Park[];
  publicPark: Park[];
  communityPark: Park[];

  constructor(private _MonitorService: MonitorService) {
    let copyThis = this;
    copyThis.regions = [];
    copyThis.roads = [];
    copyThis.parks = [];
    copyThis.initBaseLayersData = [
      {
        id: 'all',
        type: 'baseLayers',
        enable: true,
        name: '区域',
        zoom: 10,
        position: copyThis._MonitorService.getRegionCenterPonit(),
      }, {
        id: 'road',
        type: 'baseLayers',
        enable: false,
        name: '道路',
        zoom: 12,
        position: copyThis._MonitorService.getRoadCenterPonit(),
      }, {
        id: 'park',
        type: 'baseLayers',
        enable: false,
        name: '车场',
        zoom: 12,
        position: copyThis._MonitorService.getParkCenterPonit(),
      }];
    copyThis.initOverLayersData = [
      {
        id: 'regionOverlay',
        enable: true,
        name: '行政区域',
        type: 'overlay',
        parkType: 'region',
        min: 0,
        max: 11,
        initData: null,
        shape: 'Polygon'
      },
      {
        id: 'demonstrationRoadOverlay',
        type: 'overlay',
        enable: true,
        name: '示范道路',
        parkType: 'road',
        initData: null,
        shape: 'Polyline',
        min: 12,
        max: 14
      },
      {
        type: 'overlay',
        enable: true,
        id: 'elseRoadOverlay',
        name: '其它道路',
        parkType: 'road',
        initData: null,
        shape: 'Polygon',
        min: 12,
        max: 14
      },
      {
        type: 'overlay',
        enable: true,
        id: 'roadParkOverlay',
        name: '路侧停车场',
        parkType: 'park',
        initData: null,
        shape: 'Mark',
        min: 15,
        max: 18
      },
      {
        type: 'overlay',
        enable: true,
        id: 'publicParkOverlay',
        name: '公共停车场',
        parkType: 'park',
        initData: null,
        shape: 'Mark',
        min: 15,
        max: 18
      },
      {
        type: 'overlay',
        enable: true,
        id: 'communityParkOverlay',
        name: '社区停车场',
        parkType: 'park',
        initData: null,
        shape: 'Mark',
        min: 15,
        max: 18
      }
    ];
  }

  onCardSearch(searchText) {
    let copyThis = this;
    copyThis.mapState = 'zoomIn';
    copyThis.gridState = 'zoomIn';
    copyThis.show = true;
  }

  onGridHide() {
    this.show = false;
    this.mapState = 'zoomOutAfterIn';
    this.gridState = '';

  }

  ngOnInit() {
  }

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

  onLoadOverlayLayersData(id: string) {
    let copyThis = this;

    if (id === 'regionOverlay') {
      copyThis._MonitorService.getRegions().then(regions => {
        copyThis.regions = regions;
        copyThis.amap.loadOverlayLayersDataAfter('regionOverlay', regions);
      });
    } else if (id === 'demonstrationRoadOverlay') {
      copyThis._MonitorService.getDemonstrationRoadOverlayData().then(demonstrationRoads => {
        this.demonstrationRoads = demonstrationRoads;
        copyThis.roads = copyThis.roads.concat(demonstrationRoads);
        copyThis.amap.loadOverlayLayersDataAfter('demonstrationRoadOverlay', demonstrationRoads);
      });
    } else if (id === 'elseRoadOverlay') {
      copyThis._MonitorService.getElseRoadOverlayData().then(elseRoads => {
        copyThis.elseRoads = elseRoads;
        copyThis.roads = copyThis.roads.concat(elseRoads);
        copyThis.amap.loadOverlayLayersDataAfter('elseRoadOverlay', elseRoads);
      });
    } else if (id === 'roadParkOverlay') {
      copyThis._MonitorService.geRoadParkOverlayData().then(roadPark => {
        copyThis.roadPark = roadPark;
        copyThis.parks = copyThis.parks.concat(roadPark);
        copyThis.amap.loadOverlayLayersDataAfter('roadParkOverlay', roadPark);
      });
    } else if (id === 'publicParkOverlay') {
      copyThis._MonitorService.gePublicParkOverlayData().then(publicPark => {
        copyThis.publicPark = publicPark;
        copyThis.parks = copyThis.parks.concat(publicPark);
        copyThis.amap.loadOverlayLayersDataAfter('publicParkOverlay', publicPark);
      });
    } else if (id === 'communityParkOverlay') {
      copyThis._MonitorService.getCommunityParkOverlayData().then(communityPark => {
        copyThis.communityPark = communityPark;
        copyThis.parks = copyThis.parks.concat(communityPark);
        copyThis.amap.loadOverlayLayersDataAfter('communityParkOverlay', communityPark);
      });
    }
  }

  // 切换图层后，表格切换
  onChangeCurrentView(currentLayer: any) {
    let copyThis = this;
    copyThis.currentLayer = currentLayer;
    // 表格切换
    this.gridHeaderName = copyThis.gridHeader[copyThis.currentLayer['showId']];
  }

  onChangeCurrentData(changeLay: any) {
    let copyThis = this;
    let id = changeLay.layer.id;
    let parkType = changeLay.layer.parkType;
    // 表格内容调整
    if (changeLay.props.enable) {
      if (parkType === 'region') {
        copyThis.regions = copyThis.regions.concat(changeLay.layer.initData);
      } else if (parkType === 'road') {
        copyThis.roads = copyThis.roads.concat(changeLay.layer.initData);
      } else if (parkType === 'park') {
        copyThis.parks = copyThis.parks.concat(changeLay.layer.initData);
      }
    } else {
      let flag = false;
      let a = [];
      copyThis.amap.overlayLayers.forEach(function (overlayer, index) {
        if (overlayer.parkType === parkType && overlayer.enable) {
          flag = true;
          a = a.concat(overlayer.initData);
        }
      });
      if (parkType === 'region') {
        copyThis.regions = a;
      } else if (parkType === 'road') {
        copyThis.roads = a;
      } else if (parkType === 'park') {
        copyThis.parks = a;
      }
      if (!flag) {
        if (parkType === 'region') {
          copyThis.regions = [];
        } else if (parkType === 'road') {
          copyThis.roads = [];
        } else if (parkType === 'park') {
          copyThis.parks = [];
        }
      }
    }
  }

  loadData(event) {

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
}
