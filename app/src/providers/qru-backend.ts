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
  baseUrl: String;

  constructor(public http: Http) {
    console.log('Hello QruBackend Provider');
    this.baseUrl = 'ec2-54-190-29-165.us-west-2.compute.amazonaws.com:9000/';
  }

  update(eventType:String, email: String) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify({'event': eventType, email: email});
    return this.http.post(this.baseUrl + 'update', body, options)
      .toPromise().then((reply) => {
        return reply.json();
      }).catch((error) => {
        console.error(error);
      });
  }

  list() {
    return new Promise((resolve) => {
      return this.http.get(this.baseUrl + 'emaillist')
        .map((result) => result.json()).subscribe((data) => {
          resolve(data);
        });
    });
  }

  info(email: String) {
    return new Promise((resolve) => {
      return this.http.get(this.baseUrl + 'info/' + email)
        .map((result) => result.json()).subscribe((data) => {
          resolve(data);
        });
    });
  }

  add(newPerson: Object) {
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    return this.http.post(this.baseUrl + 'add', JSON.stringify(newPerson),
      options).toPromise().then((reply) => {
        return reply.json();
      });
  }

}
