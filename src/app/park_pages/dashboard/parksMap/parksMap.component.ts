import { Component } from '@angular/core';

import { ParksMapService } from './parksMap.service';

@Component({
  selector: 'parks-map',
  templateUrl: './parksMap.html',
  styleUrls: ['./parksMap.scss']
})
export class ParksMap {

  mapData: Object;

  constructor(private _usersMapService: ParksMapService) {
    this.mapData = this._usersMapService.getData();
  }
}
