import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/map';
import { PublicParkListService } from './public_park_list.service';

declare var FooTable: any;
declare var moment: any;
declare var $: any;
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from './../../../ui/default-modal/default-modal.component';
import { BaAmapModel } from './../../../../theme/components/baAmapModal/baAmapModal.component';
import { BaAmapDrawModel } from './../../../../theme/components/baAmapDrawModal/baAmapDrawModal.component';
export interface Car {
  vin?;
  year?;
  brand?;
  color?;
  price?;
  saleDate?;
}
@Component({
  selector: 'public-park',
  templateUrl: './public_park_list.component.html',
  styleUrls: ['./public_park_list.component.scss'],
})

export class PublicParkListComponent implements OnInit {
  private columns = [
    {'name': 'id', 'title': 'id', 'visible': false},
    {
      'name': 'no',
      'title': '编号', 'breakpoints': 'xs sm', 'type': 'number'
    },
    {'name': 'name', 'title': '名称'},
    {'name': 'placeCount', 'title': '泊位数'},
    {'name': 'chargeName', 'title': '收费标准', 'filterable': false},
    {
      'name': 'departmentName', 'title': '运营单位', 'breakpoints': 'xs sm', 'style': {
      'maxWidth': 100,
      'overflow': 'hidden', 'textOverflow': 'ellipsis', 'wordBreak': 'keep-all', 'whiteSpace': 'nowrap'
    }
    },
    {'name': 'status', 'title': '状态'},
    {
      'name': 'createTime',
      'title': '创建时间',
      'type': 'date',
      'visible': false,
      'formatString': 'YYYY-MM-DD'
    },
    {
      'name': 'operateBeginTime', 'title': '运营开始时间', 'type': 'date', 'breakpoints': 'all', 'filterable': false,
      'formatString': 'YYYY-MM-DD'
    },
    {
      'name': 'operateEndTime', 'title': '运营开始结束', 'type': 'date', 'breakpoints': 'all', 'filterable': false,
      'formatString': 'YYYY-MM-DD'
    },
    {
      'name': 'action1',
      'title': '收费标准', 'breakpoints': 'all', 'filterable': false,
      'formatter': function (value, options, rowData) {
        return '<div class="row"><div class="text-right col-md-6">' + rowData.chargeName +
          '</div><button class="btn btn-info" type="button"  data-toggle="modal" data-target="#chargeModal" >变更</button></div>';
      }
    },
    {
      'name': 'action2', 'title': '运营单位', 'breakpoints': 'all', 'filterable': false,
      'formatter': function (value, options, rowData) {
        return '<div class="row"><div class="text-right col-md-6">' + rowData.departmentName +
          '</div><button type="button" class="btn btn-default footable-view" data-toggle="modal" data-target="#departmentModal"><span class="fooicon fooicon-stats"aria-hidden="true"></span></button></div>';
      }
    },
    {
      'name': 'action3', 'title': '状态', 'breakpoints': 'all', 'filterable': false,
      'formatter': function (value, options, rowData) {
        return '<div class="row "><div class="text-right col-md-6">' + rowData.status +
          '</div><div class="btn-group btn-group-xs " role="group"  data-toggle="modal" data-target="#stateModal"><button class="btn btn-info  footable-view "   type="button" >变更</button></div></div>';
      }
    }

  ];
  latitude = '';
  longitude = '';
  path: any = [];
  drawType = '';
  isCreateAreas: boolean = false;
  isCreatePlaces: boolean = true;
  private ft;
  list1: Car[];
  list2: Car[];
  constructor(private _PublicParkListService: PublicParkListService, private router: Router,
              private _modalService: NgbModal) {

    this.list1 = [{
      vin: 'Place10012'
    }, {
      vin: 'Place10013'
    }, {
      vin: 'Place10014'
    }];
    this.list2 = [{
      vin: 'Place10001'
    }, {
      vin: 'Place10000'
    }];
  }

  staticModalShow(row) {
    const activeModal = this._modalService.open(DefaultModal, {
      size: 'sm',
      backdrop: 'static'
    });
    activeModal.result.then((result) => {
      if (result) {
        row.delete();
      } else {
      }
    }, (reason) => {
    });

    activeModal.componentInstance.modalHeader = '提示';
    activeModal.componentInstance.modalContent = `你确定要删除停车场吗?`;
  }

  mapModalShow(e) {
    const _self = this;

    const activeModal = _self._modalService.open(BaAmapModel, {
      size: 'lg'
    });
    activeModal.result.then((result) => {
      _self.latitude = result.latitude;
      _self.longitude = result.longitude;
      if (_self.latitude === '' && _self.longitude === '') {
        $('#editor-coordinate').val();
      } else {
        $('#editor-coordinate').val(_self.longitude + ',' + _self.latitude);
      }
    }, (reason) => {
    });
    activeModal.componentInstance.modalHeader = '请在地图上单击停车场位置,获取坐标';
    activeModal.componentInstance.latitude = _self.latitude;
    activeModal.componentInstance.longitude = _self.longitude;

  }

  mapDrawModalShow(e) {
    const _self = this;

    const activeDrawModal = _self._modalService.open(BaAmapDrawModel, {
      size: 'lg'
    });
    activeDrawModal.result.then((result) => {
      _self.path = result.path;
      _self.drawType = result.drawType;
      $('#editor-path').val(_self.path);
    }, (reason) => {
    });
    activeDrawModal.componentInstance.modalHeader = '请在地图上绘制停车场形状';
    activeDrawModal.componentInstance.latitude = _self.latitude;
    activeDrawModal.componentInstance.longitude = _self.longitude;
    activeDrawModal.componentInstance.path = _self.path;
    activeDrawModal.componentInstance.drawType = _self.drawType;
  }

  ngOnInit(): void {
    const _self = this;
    let $modal = $('#editor-modal');

    let $editor = $('#editor');
    let $editorTitle = $('#editor-title');
    let $placesModal = $('#places-modal');
    let $places = $('#places');
    let $areasModal = $('#areas-modal');
    let $areas = $('#areas');
    _self.ft = FooTable.init('#showcase-example-1', {
      columns: this.columns,
      rows: $.get('/test/data/road-park.json'),
      editing: {
        showText: '<span class="fooicon fooicon-pencil" aria-hidden="true"></span> 编辑',
        hideText: '取消',
        addText: '添加',
        allowView: true,
        addRow: function () {
          $modal.removeData('row');
          $editor[0]['reset']();
          $('#createPlaces')[0].checked = true;
          $editorTitle.text('添加新的停车场');
          $modal.modal('show');
        },
        viewRow: function (row) {
          let values = row.val();
          _self.router.navigate(['/park_pages/road_park/detail', values.id]);
        },
        editRow: function (row) {
          let values = row.val();
          $editor.find('#id').val(values.id);
          $editor.find('#no').val(values.no);
          $editor.find('#name').val(values.name);
          $editor.find('#regionName').val(values.regionName);
          $editor.find('#roadName').val(values.roadName);
          $editor.find('#creattime').val(values.createTime.format('YYYY-MM-DD'));
          $editor.find('#poi').val(values.poi);
          $editor.find('#location').val(values.location);
          $editor.find('#path').val(values.path);
          $modal.data('row', row);
          $editorTitle.text('修改停车场 #' + values.id);
          $modal.modal('show');
        },
        deleteRow: function (row) {
          _self.staticModalShow(row);

        }
      }
    });
    $editor.on('submit', function (e) {
      if (this.checkValidity && !this.checkValidity()) {
        return;
      }
      e.preventDefault();
      let row = $modal.data('row'),
        values = {
          id: $editor.find('#editor-id').val(),
          no: $editor.find('#editor-no').val(),
          name: $editor.find('#editor-name').val(),
          placeCount: 0,
          placeBeginNo: '001',
          location: $editor.find('#editor-location').val(),
          createTime: moment($editor.find('#editor-createTime').val(), 'YYYY-MM-DD'),
          coordinate: $editor.find('#editor-coordinate').val(),
          path: $editor.find('#editor-path').val(),
          regionName: $editor.find('#editor-region-name option:selected').val(),
          roadName: $editor.find('#editor-road-name option:selected').val()
        };
      if (row instanceof FooTable.Row) {
        row.val(values);
      }
      $modal.modal('hide');
      // 异步编程
      if ($('#createPlaces').is(':checked')) {
        $placesModal.modal('show');
        return;
      }
    });
    $places.on('submit', function (e) {
      if (this.checkValidity && !this.checkValidity()) {
        return;
      }
      e.preventDefault();
      $placesModal.modal('hide');
      if ($('#createAreas').is(':checked')) {
        $areasModal.modal('show');
        $placesModal.modal('hide')
        return;
      }
    });

    $('#modal-charge').footable({
      'useParentWidth': true,
      'columns': $.get('/test/data/columns.json'),
      'rows': $.get('/test/data/rows.json')
    });

    $('#modal-department').footable({
      'useParentWidth': true,
      'columns': $.get('/test/data/columns.json'),
      'rows': $.get('/test/data/rows.json')
    });

  }

  add(values) {
    let uid = 10001;
    let $modal = $('#editor-modal');
    let $editor = $('#editor');
    let $editorTitle = $('#editor-title');
    let $placesModal = $('#places-modal');
    let $places = $('#places');
    const _self = this;
    values.placeCount = $places.find('#places-count').val();
    values.placeBeginNo = $places.find('#places-begin-no').val();
    values.id = uid++;
    _self.ft.rows.add(values);
  }

  createPlaces(row) {
  }

  createAreas(row) {
    $('#areas-modal').modal('show');
  }

}
