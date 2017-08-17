import { Component, OnInit, ViewChild, Input, ElementRef, SimpleChange } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

declare let AMap: any;
declare let AMapUI: any;

@Component({
  selector: 'ba-amap-draw-modal',
  templateUrl: './baAmapDrawModal.component.html',
  styleUrls: ['./baAmapDrawModal.scss']
})
export class BaAmapDrawModel implements OnInit {

  @Input() baAmapClass: string;
  modalHeader: string;
  modalContent: string = `提示框.`;
  latitude: string = '';
  longitude: string = '';
  path: any = [];
  drawType: string = 'AMap.Polygon';
  // 地图初始化zoom
  @Input() initZoom: any = 10;
  @ViewChild('baAmapDrawModal') public _selector: ElementRef;

  private map;
  public markerStyle = {};
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
    fillColor: '#CCF3FF',
    fillOpacity: 0.4,
  };

  constructor(private activeModal: NgbActiveModal) {
    console.log('constructor');
  }

  // 监听属性变化 加载数据
  ngOnChanges(changes: SimpleChange) {
    console.log('ngOnChanges');
  }

  // 初始化组件
  ngOnInit() {
    const _self = this;
    console.log('ngOnInit');
    // 地图初始化
    _self.map = new AMap.Map(_self._selector.nativeElement, {
      resizeEnable: true,
      zoom: _self.initZoom
    });
    if (_self.latitude != '' && _self.longitude != '') {
      _self.drawMark(_self.longitude, _self.latitude);
    }
    debugger
    if (_self.path != '') {
      if (_self.drawType === 'AMap.Polygon') {
        _self.drawPolygon(_self.path);
      } else if (_self.drawType === 'AMap.Polyline') {
        _self.drawPolyline(_self.path);
      }
    }
    // 地图插件初始化
    AMap.plugin(['AMap.ToolBar'], () => {
      let toolBar = new AMap.ToolBar(
        {
          locate: true, // 是否使用定位，默认:true
          direction: true,
          ruler: true,
        }
      );
      _self.map.addControl(toolBar);
    });

    AMap.plugin(['AMap.Autocomplete'], () => {
      let auto = new AMap.Autocomplete({
        input: 'tipinput'
      });
      AMap.event.addListener(auto, 'select', function (e) {
        if (e.poi && e.poi.location) {
          _self.drawMark(e.poi.location.lng, e.poi.location.lat);
        }
      });
    });

    AMap.plugin(['AMap.MouseTool'], () => {
      const mouseTool = new AMap.MouseTool(_self.map);
      AMap.event.addDomListener(document.getElementById('line'), 'click', function () {
        mouseTool.polyline(_self.polylineStyle);
      }, false);
      AMap.event.addDomListener(document.getElementById('polygon'), 'click', function () {
        mouseTool.polygon(_self.polygonStyle);
      }, false);
      AMap.event.addListener(mouseTool, 'draw', function (e) {
        console.log(e.obj.CLASS_NAME);
        console.log(e.obj.getPath());
        _self.path.push(e.obj.getPath());
        _self.drawType = e.obj.CLASS_NAME;
      });
    });
  }

  // 加载组件完成后
  ngAfterViewInit() {

  }

  closeModal() {
    const _self = this;
    this.activeModal.close({
      path: _self.path,
      drawType: _self.drawType
    });
  }

  // 点画图
  public drawMark(longitude, latitude) {
    const _self = this;
    let location = new AMap.LngLat(longitude, latitude);
    _self.map.setZoom(15);
    _self.map.setCenter(location);
    // 暂时不做标记
  }

  // 多边形画图
  public drawPolygon(o) {
    const _self = this;
    let json = {
      path: o,
    };
    Object.assign(json, _self.polygonStyle);
    _self.map.add(new AMap.Polygon(json));
  }

  // 线形画图
  public drawPolyline(o) {
    const _self = this;
    for (let child in o) {
      let json = {
        path: o[child]
      };
      Object.assign(json, _self.polylineStyle);
      _self.map.add(new AMap.Polyline(json));
    }

  }

  // 清理图层
  private cleanLayers() {
    const _self = this;
    if (_self.map) {
      _self.map.clearMap();
      _self.map.clearInfoWindow();
      _self.path = [];
      _self.drawType = '';
    }
  }

}
