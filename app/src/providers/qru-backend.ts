import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';
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

  constructor(public http: Http, public alertCtrl: AlertController) {
    console.log('Hello QruBackend Provider');
    this.baseUrl = 'http://ec2-54-190-29-165.us-west-2.compute.amazonaws.com:9000/';
  }

  update(eventType:String, email: String) {
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'applications/json'
      })
    });
    let body = JSON.stringify({'event': eventType, email: email});
    return this.http.post(this.baseUrl + 'update', body, options)
      .toPromise().then((reply) => {
        return reply.json();
      }).catch((error) => {
        console.error(error);
        this.alertCtrl.create({
          title: error,
          subTitle: 'failed to call update',
          buttons: ['OK']
        }).present();
      });
  }

  emaillist() {
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
      }).catch((error) => {
        console.error(error);
        this.alertCtrl.create({
          title: error,
          subTitle: 'failed to call add',
          buttons: ['OK']
        }).present;
      });
  }

}
