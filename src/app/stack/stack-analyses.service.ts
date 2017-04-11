import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { WIT_API_URL } from 'ngx-fabric8-wit';

@Injectable()
export class StackAnalysesService {

  private stackAnalysesUrl: string = '';
  private cvssScale: any = {
    low: {
      start: 0.0,
      end: 3.9,
      iconClass: 'fa fa-check-circle-o'
    },
    medium: {
      start: 4.0,
      end: 6.9,
      iconClass: 'fa fa-check-circle-o'
    },
    high: {
      start: 7.0,
      end: 10.0,
      iconClass: 'pficon pficon-warning-triangle-o'
    }
  };

  constructor(
    private http: Http,
  ) {}

  getStackAnalyses(url: string): Observable<any> {
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getCvssObj(score: number): any {
    if (score) {
      let iconClass: string = 'this.cvssScale.low.iconClass';
      let displayColor: string = 'orange';
      if (score >= this.cvssScale.high.start) {
        iconClass = this.cvssScale.high.iconClass;
        displayColor = 'red';
      }
      return {
        iconClass: iconClass,
        value: score,
        percentScore: (score / 10 * 100),
        displayColor: displayColor
      };
    }
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
    return Observable.throw(errMsg);
  }

}
