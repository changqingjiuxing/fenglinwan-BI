import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { animateFactory } from 'ng2-animate';
import 'rxjs/add/operator/map';
import { ParkManageService } from './park_manage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ParkInfo } from './park_info';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'park_manage',
  templateUrl: './park_manage.component.html',
  styleUrls: ['./park_manage.component.scss'],
  animations: [animateFactory(1000, 0, 'ease-in')],
  providers: [ConfirmationService] // 提供选择框
})
export class ParkManageComponent implements OnInit {

  /*停车场数据*/
  parks: any[];
  /*经营单位数据*/
  units: any[];

  /*选中的停车场数据集合*/
  selectedParks: any[];
  selectedUnit: string;

  /*页码*/
  page: number = 1;
  page2: number = 1;

  // 弹出框显示相关
  display: boolean = false;
  unitDisplay: boolean = false;

  /*表单相关*/
  public searchForm: FormGroup;
  public searchPark: ParkInfo = new ParkInfo();

  // 下拉选择相关
  public getParams: any = {
    changeArea: 'all',
    isStanRoad: 'all',
    parkStatus: 'all',
  };

  constructor(private parkManageService: ParkManageService,
              private fb: FormBuilder,
              private confirmationService: ConfirmationService) {
  }

  /*删除确认框*/
  confirm(park: any) {
    console.log(park);
    this.confirmationService.confirm({
      message: '您确定要继续么?',
      header: '删除',
      icon: 'fa fa-trash',
      accept: () => {
        console.log('确定删除。。。');
      },
      reject: () => {
        console.log('取消删除。。。');
      }
    });
  }

  ngOnInit(): void {
    /*构建查询表单*/
    this.buildForm();
    /*获取停车场数据*/
    this.getParkData();
  }

  getParkData() {
    this.parkManageService.getParkInfo().subscribe(
      data => {
        this.parks = data.cars;
      },
      error => {
        console.log(error);
      }
    );
  }

  /*构建form*/
  buildForm(): void {
    this.searchForm = this.fb.group({
      'parkno': [
        this.searchPark.no
      ],
      'parkname': [
        this.searchPark.name
      ],
      'unit': [ // 编号
        this.searchPark.unit
      ],
      'rentalUnit': [ // 经营单位名称
        this.searchPark.rentalUnit
      ],
      'subdistrict': [
        this.searchPark.bsc
      ],
      'location': [
        this.searchPark.load
      ],
      'startRoad': [
        this.searchPark.sload
      ],
      'endRoad': [
        this.searchPark.eload
      ],
      'time': [
        this.searchPark.bs
      ]
    });
  }

  /*打开添加停车场页面窗口*/
  openAddParkPage() {
    this.display = true;
  }

  /*打开编辑窗口*/
  openEditPage(park: any) {
    console.log(park);
    this.openAddParkPage();
  }

  /*打开经营单位窗口时获取数据*/
  openRentalUnitPage() {
    if (!this.unitDisplay) {
      this.unitDisplay = true;
    }
    this.getUnitInfo();
  }

  /*添加页面打开窗口*/
  openAddRentalUnitPage() {
    if (!this.unitDisplay) {
      this.unitDisplay = true;
    }
    this.getUnitInfo();
  }

  /*获取经营单位数据*/
  getUnitInfo() {
    this.parkManageService.getUnitInfo().then(data => {
      this.units = data.unit;
    });
  }

  /* 绑定前端元素 */
  @ViewChild('unit')
  private unitEle: ElementRef;
  @ViewChild('rentalUnit')
  private rentalUnit: ElementRef;

  @ViewChild('addUnit')
  private addUnit: ElementRef;
  @ViewChild('addUnitName')
  private addUnitName: ElementRef;

  /*双击设置值*/
  dbUnit(event) {
    if (this.display) {
      this.addUnit.nativeElement.value = event.data.no;
      this.addUnitName.nativeElement.value = event.data.name;
    } else {
      this.unitEle.nativeElement.value = event.data.no;
      this.rentalUnit.nativeElement.value = event.data.name;
    }
    if (this.unitDisplay) {
      this.unitDisplay = false;
    }
  }

  /*查询方法*/
  doQuery(currentPage?: number) {
    console.log(this.unitEle.nativeElement.value); // 所属单位编号
    console.log(this.rentalUnit.nativeElement.value); // 所属单位名称
    console.log(this.searchForm.value); // 表单数据
    console.log(this.getParams); // 下拉数据
    console.log(currentPage); // 当前页码

    this.parkManageService.getParkInfoByParams(this.getParams).subscribe(
      data => {
        console.log(data);
        this.parks = data.cars;
      }
    );
  }
}
