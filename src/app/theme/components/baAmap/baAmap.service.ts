import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Mark } from './Mark';
@Injectable()
export class BaAmapService {
  private testUrl = 'test3.json';  // URL to web API

  constructor(private http: Http) {
  }

  getMarks(time: String): Promise<Mark[]> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.testUrl).toPromise().then(this.extractData);
// return this.http.post(this.heroesUrl, {time: time}, options).toPromise().then(this.extractData)
//   .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }


}
