import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the QruBackend provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class QruBackend {

  constructor(public http: Http) {
    console.log('Hello QruBackend Provider');
  }

  update(eventType:String, email: String) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify({'event': eventType, email: email});
    return this.http.post('https://url.com/update/', body, options)
      .toPromise().then((reply) => {
        return reply.json();
      });
  }

  list() {
    return new Promise((resolve) => {
      return this.http.get('https://url.com/list/')
        .map((result) => result.json).subscribe((data) => {
          resolve(data);
        });
    });
  }

  info(email: String) {
    return new Promise((resolve) => {
      return this.http.get('https://url.com/info/')
        .map((result) => result.json).subscribe((data) => {
          resolve(data);
        });
    });
  }

}
