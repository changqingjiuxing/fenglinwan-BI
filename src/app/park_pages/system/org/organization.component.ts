import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/primeng';

declare let $: any;


@Component({
  selector: 'org',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  list1: Car[];

  list2: Car[];

  display: boolean = false;
  deleteDisplay: boolean = false;
  params: string;

  selectedFile: TreeNode;

  filesTree: TreeNode = [
    {
      'label': '组织机构',
      'data': 'zzjg01',
      'expandedIcon': 'fa-folder-open',
      'collapsedIcon': 'fa-folder',
      'expanded': true,
      'children': [{
        'label': '济南停车集团',
        'data': '001',
        'expandedIcon': 'fa-folder-open',
        'collapsedIcon': 'fa-folder',
        'children': [{
          'label': '历下区停车公司',
          'expandedIcon': 'fa-folder-open',
          'collapsedIcon': 'fa-folder',
          'data': 'Expenses Document',
          'children': [{
            'label': '中央商务区',
            'data': '00101',
            'icon': 'fa fa-id-card'
          }]
        }, {
          'label': '历城区停车公司',
          'expandedIcon': 'fa-folder-open',
          'collapsedIcon': 'fa-folder',
          'data': 'Resume Document'
        }]
      },
        {
          'label': '潍坊停车集团',
          'data': 'Home Folder',
          'expandedIcon': 'fa-folder-open',
          'collapsedIcon': 'fa-folder',
          'children': [{
            'label': 'Invoices.txt',
            'icon': 'fa-file-word-o',
            'data': 'Invoices for this month'
          }]
        }]
    }
  ];

  constructor() {
  }

  ngOnInit() {
    this.list1 = [{
      brand: 'aa',
      vin: '租赁管理员'
    }, {
      brand: 'bb',
      vin: '财务管理员'
    }, {
      brand: 'cc',
      vin: '系统管理员'
    }];
    this.list2 = [];


    $('.table').footable();

  }

  showDialog() {
    console.log(this.display);
    if (!this.display) {
      this.display = true;
    }
  }

  showDelDialog(param: string) {
    console.log('...' + param);
    this.params = param;
    if (!this.deleteDisplay) {
      this.deleteDisplay = true;
    }
  }

  /*点击左侧树加载右侧组织机构相关信息*/
  nodeSelect($event) {
    console.log(this.selectedFile.data);
    // 根据组织机构代码查询下属单位数据
  }
}


export interface Car {
  vin?;
  year?;
  brand?;
  color?;
  price?;
  saleDate?;
}
