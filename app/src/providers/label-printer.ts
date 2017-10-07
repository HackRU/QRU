import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the LabelPrinter provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LabelPrinter {
  baseUrl: String;
  token: String;

  constructor(public http: Http, public alertCtrl: AlertController) {
    console.log('Hello LabelPrinter Provider');
    this.baseUrl = 'https://node-app.com';
    /* insert token here */
    this.token = 'token placeholder';
  }

  print(email: String) {
    this.http.post(this.baseUrl + '/initiate', {email: email, token: this.token})
      .toPromise.then((hash) => {
        this.http.post(this.baseUrl + '/confirm', {hash: hash});
      });
  }

}
