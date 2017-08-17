import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  SimpleChange
} from '@angular/core';
import { BaAmapService } from './baAmap.service';
import { Mark } from './Mark';

declare let AMap: any;
declare let AMapUI: any;

@Component({
  selector: 'ba-amap',
  templateUrl: './baAmap.component.html',
  styleUrls: ['./baAmap.scss'],
  providers: [BaAmapService],

})
export class BaAmap implements OnInit {

  @Input() baAmapClass: string;
  // 初始化的基本图层数据
  @Input() initBaseLayersData: any = [];
  // 初始化的覆盖图层数据
  @Input() initOverLayersData: any = [];
  // 是否显示控制层
  @Input() layerCtrl: boolean = false;
  // 地图初始化zoom
  @Input() initZoom: any = 10;

  // 加载覆盖层数据
  @Output() onLoadOverlayLayersData = new EventEmitter<any>();
  // 改变图层
  @Output() onChangeCurrentView = new EventEmitter<any>();
  // 改变数据
  @Output() onChangeCurrentData = new EventEmitter<any>();

  @ViewChild('baAmap') public _selector: ElementRef;

  private map;
  private heatmap;
  // 当前图层
  private currentLayer = {
    showId: 'all', // 当前显示的图层id 默认是all
    overlaySet: {}
  };


  // 基础图层配置
  public baseLayers = [];
  // 基础图层配置
  public overlayLayers = [];

  public fillColor = ['#CCF3FF', '#c2d0ff', '#ff3be8', '#7dff16', '#ffff4c', '#B0FCFF', '#FFE1DD'];
  public markerStyle = {iconStyle: 'blue'};
  public polylineStyle = {
    strokeWeight: 4,
    strokeOpacity: 0.6,
    strokeColor: '#ff477c',
    strokeStyle: 'solid'
  };
  public polygonStyle = {
    strokeWeight: 2,
    strokeOpacity: 0.6,
    strokeStyle: 'solid',
    strokeColor: '#CC66CC',
    fillColor: '#CC66CC',
    fillOpacity: 0.4,
  };

  // 构造函数
  constructor(private _BaAmapSerive: BaAmapService) {
  }

  // 监听属性变化 加载数据
  ngOnChanges(changes: SimpleChange) {
    /*    for (let propName in changes) {
     let chng = changes[propName];
     let cur = JSON.stringify(chng.currentValue);
     let prev = JSON.stringify(chng.previousValue);
     console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
     }*/
    let copyThis = this;
    copyThis.baseLayers = copyThis.initBaseLayersData;
    copyThis.overlayLayers = copyThis.initOverLayersData;
    copyThis.baseLayers.forEach(function (baseLayer, index) {
      Object.assign(baseLayer, {layer: new AMap.TileLayer()});
    });
    copyThis.overlayLayers.forEach(function (overLayer, index) {
      copyThis.currentLayer['overlaySet'][overLayer.id] = {};
      Object.assign(overLayer, {layer: new AMap.TileLayer()});
      Object.assign(overLayer, {
        draw(o) {
          copyThis.draw(o);
        },
      });
    });

  }

  // 初始化组件
  ngOnInit() {
    let copyThis = this;

    // 地图初始化
    copyThis.map = new AMap.Map(copyThis._selector.nativeElement, {
      resizeEnable: true,
      // 地图中心点
      center: copyThis.initBaseLayersData[0]['position'],
      // 地图显示的缩放级别
      zoom: copyThis.initBaseLayersData[0]['zoom'],

    });
    // 地图插件初始化
    AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView', 'AMap.Geolocation', 'AMap.Heatmap'], () => {
      let toolBar = new AMap.ToolBar(
        {
          locate: false, // 是否使用定位，默认:true
          direction: true,
          ruler: true,
        }
      );
      copyThis.map.addControl(toolBar);
      // 初始化heatmap对象
      copyThis.heatmap = new AMap.Heatmap(copyThis.map, {
        radius: 12, // 给定半径
        opacity: [0, 0.8],
        gradient: {
          0.25: 'rgb(0,0,255)',
          0.55: 'rgb(0,255,0)',
          0.85: 'yellow',
          1.0: 'rgb(255,0,0)'
        }
      });
       copyThis.map.addControl(copyThis.heatmap);
    });
    // UI库初始化
    if (copyThis.layerCtrl) {
      AMapUI.loadUI(['control/BasicControl'], function (basicControl) {
        // 基础图层控制工具初始化
        let layerCtrl = new basicControl.LayerSwitcher({
          theme: 'dark',
          // 自定义基础图层
          baseLayers: copyThis.baseLayers,
          // 自定义覆盖图层
          overlayLayers: copyThis.overlayLayers
        });
        layerCtrl.on('layerPropChanged', thisLayer => {
          // 监听,baselayerContorl中的 enable不能改否则会影响监听
          copyThis.baselayerContorl(thisLayer);
        });
        copyThis.map.addControl(layerCtrl);
        // 初始化默认图层数据--region
      });
    }
    copyThis.loadingDataForBaseLayer('all');

  }

  // 加载组件完成后
  ngAfterViewInit() {
    let copyThis = this;
    AMap.event.addListener(copyThis.map, 'zoomend', function () {
      // 不同图层级别下显示内容不一样
      // 行政区域9级显示全部 10级正好 12级最大
      // 主干路和支干路的颜色不好看 12级显示 14最大
      // 封闭停车场 15级显示 18最大
      // 泊位 17到18
      if (copyThis.currentLayer.showId === 'all') {
        copyThis.loadingDataForBaseLayer(copyThis.currentLayer.showId);
      }
    });

  }

  // 画图
  public draw(o) {
    if (o.initData == null || o.initData == undefined || o.initData.length === 0) {
      return;
    }
    if (o.shape === 'Polygon') {
      this.drawPolygon(o);
    } else if (o.shape === 'Polyline') {
      this.drawPolyline(o);
    } else if (o.shape === 'Mark') {
      this.drawMark(o);
    }
  }
  // 多边形画图
  public drawPolygonBySingle(o) {
    let copyThis = this;
    let polygons = [];
    for (let i = 0, l = o.initData.length; i < l; i++) {
      let obj = o.initData[i];
      let json = {
        overlayerId: o.id,
        path: o.initData[i]['path'],
        initData: o.initData[i],
        fillColor: ''
      };
    //   Object.assign(json, copyThis.polygonStyle);
     // json.fillColor = copyThis.fillColor[Math.floor(Math.random() * 5)];
      // 生成行政区划polygon
      let polygon = new AMap.Polygon(json);
      AMap.event.addListener(polygon, 'click', function (e) {
        copyThis.openWindow(copyThis.map, e.target);
      });
      // AMap.event.addListener(polygon, 'mouseover', function (e) {
      //   copyThis.mouseOver(e.target.G.initData);
      // });
      // AMap.event.addListener(polygon, 'mouseout', function (e) {
      //   copyThis.mouseOut(e.target.G.initData);
      // });
      polygons.push(polygon);
      copyThis.currentLayer.overlaySet[o.id] [obj.id] = polygon;
    }
    copyThis.map.add(polygons);
  }
  // 多边形画图
  public drawPolygon(o) {
    let copyThis = this;
    let polygons = [];
    for (let i = 0, l = o.initData.length; i < l; i++) {
      let obj = o.initData[i];
      let json = {
        overlayerId: o.id,
        path: o.initData[i]['path'],
        initData: o.initData[i],
        fillColor: ''
      };
      Object.assign(json, copyThis.polygonStyle);
      json.fillColor = copyThis.fillColor.pop();
    //  copyThis.fillColor.shift();
      // 生成行政区划polygon
      let polygon = new AMap.Polygon(json);
      AMap.event.addListener(polygon, 'click', function (e) {
        copyThis.openWindow(copyThis.map, e.target);
      });
      AMap.event.addListener(polygon, 'mouseover', function (e) {
        copyThis.mouseOver(e.target.G.initData);
      });
      AMap.event.addListener(polygon, 'mouseout', function (e) {
        copyThis.mouseOut(e.target.G.initData);
      });
      polygons.push(polygon);
      copyThis.currentLayer.overlaySet[o.id] [obj.id] = polygon;
    }
    copyThis.map.add(polygons);
  }

  // 线形画图
  public drawPolyline(o) {
    let copyThis = this;
    AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (simpleInfoWindow) {
      let polylines = [];
      for (let i = 0, l = o.initData.length; i < l; i++) {
        let obj = o.initData[i];
        let json = {
          id: o.id,
          overlayerId: o.id,
          path: o.initData[i]['path'],
          initData: o.initData[i],
        };
        Object.assign(json, copyThis.polylineStyle);
        let polyline = new AMap.Polyline(json);
        AMap.event.addListener(polyline, 'click', function (e) {
          copyThis.openWindow(copyThis.map, e.target);
        });
        AMap.event.addListener(polyline, 'mouseover', function (e) {
          copyThis.mouseOver(e.target.G.initData);
        });
        AMap.event.addListener(polyline, 'mouseout', function (e) {
          copyThis.mouseOut(e.target.G.initData);
        });
        polylines.push(polyline);
        copyThis.currentLayer.overlaySet[o.id] [obj.id] = polyline;

      }
      copyThis.map.add(polylines);
    });


  }

  // 点画图
  public drawMark(o) {
    let copyThis = this;
    AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
      let markerList = [];
      for (let i = 0; i < o.initData.length; i++) {
        let obj = o.initData[i];
        let long = obj.lng;
        let lati = obj.lat;
        let markPoint = new AMap.LngLat(long, lati);
        let json = {
          iconStyle: 'lightgreen',
          iconLabel: '',
          overlayerId: o.id,
          initData: o.initData[i],
          position: markPoint
        };
        Object.assign(json, copyThis.markerStyle);

        if (obj.hasOwnProperty('placeCount')) {
          json.iconLabel = obj.placeNoUsedCount;
          if (obj.placeNoUsedCount <= 10) {
            json.iconStyle = 'red';

          } else if (obj.placeNoUsedCount >= 30) {
            json.iconStyle = 'lightgreen';

          } else {
            json.iconStyle = 'orange';
          }
        }
        let marker = new SimpleMarker(json);
        AMap.event.addListener(marker, 'click', function (e) {
          copyThis.openWindow(copyThis.map, e.target);
        });
        AMap.event.addListener(marker, 'mouseover', function (e) {
          copyThis.mouseOver(e.target.G.initData);
        });
        AMap.event.addListener(marker, 'mouseout', function (e) {
          copyThis.mouseOut(e.target.G.initData);
        });
        markerList.push(marker);
        copyThis.currentLayer.overlaySet[o.id] [obj.id] = marker;
      }
      copyThis.map.add(markerList);
    });
  }

  // 热力图
  public drawHeatmap(datas) {
    let copyThis = this;
    copyThis.heatmap.setDataSet({
      data: datas,
      max: 1
    });
  }

  // 单击弹窗
  private openWindow(map, e) {
    let copyThis = this;
    let temp = copyThis.createWindowInfo(e);
    AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (simpleInfoWindow) {
      let infoWindow = new simpleInfoWindow({
        infoTitle: '<strong style="color: #000;"><%- name %></strong>',
        infoBody: temp.infoBody,
        infoTplData: temp.infoTplDefaut,
        // 基点指向marker的头部位置
        offset: new AMap.Pixel(0, -31)
      });
      infoWindow.setInfoTplData(temp.infoTplData);
      map.setFitView(e);
      infoWindow.open(map, e.getBounds().getCenter());
    });
  }

  // 弹窗信息
  private createWindowInfo(e) {
    let regionTemplate = '<p>' + '停车收费道路：<%- roadCount %>条</p>' +
      '<p>收费道路占比：<%- roadRate %></p>' +
      '<p>路侧泊位：<%- roadPlaceCount %>个</p>' +
      '<p>停车场：<%- parkCount %>个</p>' +
      '<p>停车场泊位数：<%- parkPlaceCount %>个</p>';

    let roadTemplate = '<p>' + '所属单位：<%- department%></p>' +
      '<p>停车场数：<%- parkCount %></p>' +
      '<p>泊位数：<%- placeCount %>个</p>' +
      '<p>停车位置：<%- parkLocation %></p>' +
      '<p>停车时段：<%- parkTime %></p>';

    let parkTemplate = '<p>' + '停车场编号：<%- name %></p>' +
      '<p>所属单位：<%- departmentName %></p>' +
      '<p>收费标准：<%- chargeName %></p>' +
      '<p>泊位数：<%- placeCount %>个</p>' +
      '<p>可用泊位：<%- placeNoUsedCount %>个</p>';
    let tollTemplate =
      '<p>工号：<%- no %></p>' +
      '<p>所属单位：<%-  departmentName%></p>' +
      '<p>联系电话：<%-  tel%></p>' +
      '<p>定位时间：<%-  time%></p>';
    let regionTemplateDefaut = {
      name: '未知',
      roadCount: '--',
      roadRate: '--',
      roadPlaceCount: '--',
      parkCount: '--',
      parkPlaceCount: '--',
    };
    let roadTemplateDefaut = {
      name: '未知',
      department: '--',
      parkCount: '--',
      placeCount: '--',
      parkLocation: '--',
      parkTime: '--'
    };
    let parkTemplateDefaut = {
      name: '未知',
      departmentName: '--',
      chargeName: '--',
      placeCount: '--',
      placeNoUsedCount: '--'
    };
    let tollTemplateDefaut = {
      name: '未知',
      tel: '--',
      departmentName: '--',
      no: '--',
      time: '--'
    };
    let templete = {
      infoBody: {},
      infoTplDefaut: {},
      infoTplData: {}
    };
    if (e.G.overlayerId === 'regionOverlay') {
      let regionTemplateData = {
        name: e.G.initData.name,
        roadCount: e.G.initData.roadCount,
        roadRate: e.G.initData.roadRate,
        roadPlaceCount: e.G.initData.roadPlaceCount,
        parkCount: e.G.initData.parkCount,
        parkPlaceCount: e.G.initData.parkPlaceCount
      };
      templete.infoBody = regionTemplate;
      templete.infoTplDefaut = regionTemplateDefaut;
      templete.infoTplData = regionTemplateData;

    } else if (e.G.overlayerId === 'demonstrationRoadOverlay' || e.G.overlayerId === 'elseRoadOverlay') {
      let roadTemplateData = {
        name: e.G.initData.name,
        department: e.G.initData.department,
        parkCount: e.G.initData.parkCount,
        placeCount: e.G.initData.placeCount,
        parkLocation: e.G.initData.parkLocation,
        parkTime: e.G.initData.parkTime,
      };
      templete.infoBody = roadTemplate;
      templete.infoTplDefaut = roadTemplateDefaut;
      templete.infoTplData = roadTemplateData;
    } else if (e.G.overlayerId === 'roadParkOverlay' || e.G.overlayerId === 'publicParkOverlay'
      || e.G.overlayerId === 'communityParkOverlay') {
      let parkTemplateData = {
        name: e.G.initData.name,
        departmentName: e.G.initData.departmentName,
        chargeName: e.G.initData.chargeName,
        placeCount: e.G.initData.placeCount,
        placeNoUsedCount: e.G.initData.placeNoUsedCount,
      };
      templete.infoBody = parkTemplate;
      templete.infoTplDefaut = parkTemplateDefaut;
      templete.infoTplData = parkTemplateData;
    } else if (e.G.overlayerId === 'tollOverlay') {
      let tollTemplateData = {
        name: e.G.initData.name,
        no: e.G.initData.no,
        time: e.G.initData.time,
        departmentName: e.G.initData.departmentName,
        tel: e.G.initData.tel,

      };
      templete.infoBody = tollTemplate;
      templete.infoTplDefaut = tollTemplateDefaut;
      templete.infoTplData = tollTemplateData;

    }
    return templete;
  }

  // 定位
  public location(o: any) {
    let copyThis = this;
    let mark = copyThis.currentLayer.overlaySet[o.overlayerId][o.id];
    copyThis.openWindow(copyThis.map, mark);

  }

  // 鼠标停留元素
  public mouseOver(o: any) {
    let copyThis = this;
    let shape = copyThis.currentLayer.overlaySet[o.overlayerId][o.id];
    if (shape.CLASS_NAME.indexOf('Marker') > -1) {
      shape.setAnimation('AMAP_ANIMATION_BOUNCE');
      copyThis.map.add(shape);
      copyThis.map.setCenter(shape.getBounds().getCenter());
    } else if (shape.CLASS_NAME.indexOf('Polyline') > -1) {
      shape.setOptions({
        strokeWeight: 6,
        strokeOpacity: 1, // 线透明度
        strokeStyle: 'solid'
      });
      copyThis.map.add(shape);
      copyThis.map.setCenter(shape.getBounds().getCenter());
    } else if (shape.CLASS_NAME.indexOf('Polygon') > -1) {
      shape.setOptions({
        strokeWeight: 4,
        strokeOpacity: 0.7,
        fillOpacity: 0.6,
        strokeStyle: 'solid'
      });
      copyThis.map.add(shape);
      copyThis.map.setCenter(shape.getBounds().getCenter());
    }

  }

  // 鼠标离开
  public mouseOut(o: any) {
    let copyThis = this;
    copyThis.map.clearInfoWindow();
    let shape = copyThis.currentLayer.overlaySet[o.overlayerId][o.id];
    if (shape.CLASS_NAME.indexOf('Marker') > -1) {
      shape.setAnimation('AMAP_ANIMATION_NONE');
      copyThis.map.add(shape);
      copyThis.map.setCenter(shape.getBounds().getCenter());
    } else if (shape.CLASS_NAME.indexOf('Polyline') > -1) {
      shape.setOptions(copyThis.polylineStyle);
      copyThis.map.add(shape);
      copyThis.map.setCenter(shape.getBounds().getCenter());
    } else if (shape.CLASS_NAME.indexOf('Polygon') > -1) {
      copyThis.polygonStyle.fillColor = shape.G.fillColor;
      shape.setOptions(copyThis.polygonStyle);
      copyThis.map.add(shape);
      copyThis.map.setCenter(shape.getBounds().getCenter());
    }


  }

  // 加载图层数据
  private loadingDataForBaseLayer(baseLayer: string) {
    let copyThis = this;

    for (let overlay of copyThis.overlayLayers) {
      let markMap = copyThis.currentLayer.overlaySet[overlay.id];
      let marks = [];
      if (markMap) {
        marks = Object.keys(markMap);
        marks = marks.map(function (item) {
          return copyThis.currentLayer.overlaySet[overlay.id][item];
        });
      }
      // 所有都添加、基本图层下的所有覆盖图层
      if (overlay.enable && overlay.parkType === baseLayer) {
        if (marks == null || marks == undefined || marks.length === 0) {
          copyThis.loadOverlayLayersData(overlay.id);
        } else {
          copyThis.map.add(marks);
        }
      } else if (baseLayer === 'all' || baseLayer === 'region') {
        // 所有都添加、基本图层下的所有覆盖图层
        // 行政区域9级显示全部 10级正好 12级最大
        // 主干路和支干路的颜色不好看 12级显示 14最大
        // 封闭停车场 15级显示 18最大
        // 泊位 17到18
        let level = copyThis.map.getZoom();
        if (level <= overlay.max && level >= overlay.min) {
          if (marks == null || marks == undefined || marks.length === 0) {
            copyThis.loadOverlayLayersData(overlay.id);
          } else {
            copyThis.map.add(marks);
          }
        } else {
          if (marks !== null && marks !== undefined && marks.length !== 0) {
            copyThis.map.remove(marks);
          }
        }
      }
    }

  }

  // 加载覆盖图层数据
  private loadOverlayLayersData(overlayId: any) {
    this.onLoadOverlayLayersData.emit(overlayId);
  }

  // 加载数据后画图
  public loadOverlayLayersDataAfter(id: string, o: object) {
    let copyThis = this;
    copyThis.overlayLayers.forEach(function (overlayer, index) {
      if (overlayer.id === id) {
        // alert("画" + key);
        overlayer.initData = o;
        overlayer.draw(overlayer);
      }
    });
  }

  // 加载数据后画图
  public loadOverlayLayersDataAfterBySinglePark(id: string, o: object) {
    let copyThis = this;
    copyThis.overlayLayers.forEach(function (overlayer, index) {
      if (overlayer.id === id) {
        // alert("画" + key);
        overlayer.initData = o;
        copyThis.drawPolygonBySingle(overlayer);
      }
    });
  }

  // 通知父组件图层切换
  public changeCurrentView(currentLayer: any) {
    let copyThis = this;
    copyThis.onChangeCurrentView.emit(currentLayer);
  }

  // 通知父组件图层数据改动
  public changeCurrentData(changeLay: any) {
    let copyThis = this;
    copyThis.onChangeCurrentData.emit(changeLay);
  }

  private baselayerContorl(changeLay: any) {
    let copyThis = this;
    // 切换基础图层
    if (changeLay.props.enable && changeLay.layer.type === 'baseLayers') {
      // 清除覆盖物
      copyThis.cleanLayers();
      //  覆盖层隐藏显示
      copyThis.overlayerContorl(changeLay.layer.id);
      // 点击切换图层，初始化默认的覆盖层数据
      copyThis.currentLayer.showId = changeLay.layer.id;
      // 加载图层的数据
      copyThis.loadingDataForBaseLayer(copyThis.currentLayer.showId);
      // 调整图层级别和中心位置
      copyThis.map.setZoomAndCenter(changeLay.layer.zoom, changeLay.layer.position);

      copyThis.changeCurrentView(copyThis.currentLayer);

    } else if (changeLay.layer.type === 'overlay') { // 勾选覆盖图层

      let currentData = Object.keys(copyThis.currentLayer.overlaySet[changeLay.layer.id]);
      currentData = currentData.map(function (item) {
        return copyThis.currentLayer.overlaySet[changeLay.layer.id][item];
      });
      if (currentData == null && currentData == undefined && currentData.length == 0) {
        return;
      }

      if (changeLay.props.enable) {
        copyThis.map.add(currentData);
      } else {
        copyThis.map.remove(currentData);
      }

      copyThis.overlayLayers.forEach(function (overlayer, index) {
        if (overlayer.id === changeLay.layer.id) {
          // enable千万不能改，否则覆盖层的监听事件会无效
          // overlayer.enable = false;
        }
      });
      copyThis.changeCurrentData(changeLay);
    }
  }

  // 隐藏显示覆盖层
  private overlayerContorl(baseLayer: string) {
    // 根据图层id 是否与覆盖层parkType相等
    for (let overlay of this.overlayLayers) {
      let selectClass = 'div.amap-ui-control-layer-overlay-item-' + overlay.id;
      if (baseLayer === 'all' || baseLayer === 'region') {
        jQuery(selectClass).show();
        if (!overlay.enable) {
          jQuery(selectClass + ' label input[type="checkbox"]').click();
        }
      } else if (overlay.parkType === baseLayer) {
        jQuery(selectClass).show();
      } else {
        jQuery(selectClass).hide();
      }
    }
  }

  // 清理图层
  private cleanLayers() {
    let copyThis = this;
    if (copyThis.map) {
      copyThis.map.clearMap();
      copyThis.map.clearInfoWindow();
    }
    if (copyThis.heatmap) {
      copyThis.heatmap.hide();
    }
  }

}
