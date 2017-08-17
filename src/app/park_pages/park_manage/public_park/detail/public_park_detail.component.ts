import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import { PublicParkDetailService } from './public_park_detail.service';
import { FormBuilder, FormGroup } from '@angular/forms';
declare var FooTable: any;
declare var moment: any;
declare var $: any;
export interface Car {
  vin?;
  year?;
  brand?;
  color?;
  price?;
  saleDate?;
}
@Component({
  selector: 'public-park-detail',
  templateUrl: './public_park_detail.component.html',
  styleUrls: ['./public_park_detail.component.scss'],
})
export class PublicParkDetailComponent implements OnInit {

  list1: Car[];
  list2: Car[];
  initBaseLayersData: any;
  constructor(private _PublicParkDetailService: PublicParkDetailService) {
    this.initBaseLayersData = [
      {
        id: 'all',
        type: 'baseLayers',
        enable: true,
        zoom: 15,
        position: [117.026695, 36.671138]
      }];
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


  ngOnInit(): void {
    let $modal = $('#editor-modal'),
      $editor = $('#editor'),
      $editorTitle = $('#editor-title'),
      ft = FooTable.init('#showcase-example-1', {
        columns: $.get('/test/data/columns-place.json'),
        rows: $.get('/test/data/rows-place.json'),
        editing: {
          hideText: '取消',
          addText: '添加',
          alwaysShow: true,
          addRow: function(){
            $modal.removeData('row');
            $editor[0].reset();
            $editorTitle.text('Add a new row');
            $modal.modal('show');
          },
          editRow: function(row){
            let values = row.val();
            $editor.find('#id').val(values.id);
            $editor.find('#something').val(values.something);
            $editor.find('#status').val(values.status);
            $modal.data('row', row);
            $editorTitle.text('Edit row #' + values.id);
            $modal.modal('show');
          },
          deleteRow: function(row){
            if (confirm('Are you sure you want to delete the row?')){
              row.delete();
            }
          }
        }
      }),
      uid = 10001;
    $editor.on('submit', function(e){
      if (this.checkValidity && !this.checkValidity()) return;
      e.preventDefault();
      let row = $modal.data('row'),
        values = {
          id: $editor.find('#id').val()
        };

      if (row instanceof FooTable.Row){
        row.val(values);
      } else {
        values.id = uid++;
        ft.rows.add(values);
      }
      $modal.modal('hide');
    });
    $('#showcase-example-2').footable({
    });
  }


}
