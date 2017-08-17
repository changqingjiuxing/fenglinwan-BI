import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  SimpleChange
} from '@angular/core';
import { NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

declare let AMap: any;
declare let AMapUI: any;

@Component({
  selector: 'ba-amap-modal',
  templateUrl: './baAmapModal.component.html',
  styleUrls: ['./baAmapModal.scss'],

})
export class BaAmapModel implements OnInit {

  @Input() baAmapClass: string;
  // 初始化的基本图层数据
  modalHeader: string;
  modalContent: string = `这是一个提示框.`;
  latitude: string = '';
  longitude: string = '';
  // 地图初始化zoom
  @Input() initZoom: any = 10;

  @ViewChild('baAmapModal') public _selector: ElementRef;

  private map;


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
    console.log(_self.latitude);
    console.log(_self.longitude);

    // 地图初始化
    _self.map = new AMap.Map(_self._selector.nativeElement, {
      resizeEnable: true,
      // 地图显示的缩放级别
      zoom: _self.initZoom

    });
    if (_self.latitude != '' && _self.longitude != '') {
      _self.drawMark(_self.longitude, _self.latitude);
    }
    // 地图插件初始化
    AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
      let toolBar = new AMap.ToolBar(
        {
          locate: true, // 是否使用定位，默认:true
          direction: true,
          ruler: true,
        }
      );
      _self.map.addControl(toolBar);
    });
    // 为地图注册click事件获取鼠标点击出的经纬度坐标
    let clickEventListener = _self.map.on('click', function (e) {
      _self.drawMark(e.lnglat.lng, e.lnglat.lat);
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


  }

  // 加载组件完成后
  ngAfterViewInit() {

  }

  closeModal() {
    const self = this;
    this.activeModal.close({
      latitude: self.latitude,
      longitude: self.longitude
    });
  }

  // 点画图
  public drawMark(longitude, latitude) {
    const _self = this;
    _self.latitude = latitude;
    _self.longitude = longitude;
    let location = new AMap.LngLat(_self.longitude, _self.latitude);
    let marker = new AMap.Marker({
      position: location
    });
    _self.cleanLayers();
    _self.map.setCenter(location);
    _self.map.add(marker);
    $('#lnglat').val(_self.latitude + ',' + _self.longitude);
  }

  // 清理图层
  private cleanLayers() {
    const _self = this;
    if (_self.map) {
      _self.map.clearMap();
      _self.map.clearInfoWindow();
    }

  }

}
