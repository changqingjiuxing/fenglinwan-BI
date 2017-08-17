import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class RoadParkDetailService {

  getParkInfoUrl: string = '/test/data/cars.json';
  getParkInfoByParamUrl: string = '/test/data/cars2.json';
  getUnitInfoUrl: string = '/test/data/unit.json';

  constructor(private http: Http) {
  }

  /*推荐使用这种方法*/
  getParkInfo(): Observable<any> {
    return this.http.get(this.getParkInfoUrl)
      .map((res: Response) => res.json());
  }

  /*根据查询条件获取数据*/
  getParkInfoByParams(jsonObject: any): Observable<any> {
    return this.http.request(this.getParkInfoByParamUrl, new RequestOptions({ method: 'GET', body: jsonObject }))
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  /*这种方法在处理的时候比较上一种方法多了一层结构Promise是由Observable生成的*/
  getUnitInfo(): Promise<any> {
    return this.http.get(this.getUnitInfoUrl)
      .toPromise()
      .then(result => result.json());
  }

}
