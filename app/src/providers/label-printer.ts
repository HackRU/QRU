import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the LabelPrinter provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LabelPrinter {
  baseUrl: String;
  pass: String;

  constructor(public http: Http, public alertCtrl: AlertController) {
    console.log('Hello LabelPrinter Provider');
    this.baseUrl = 'https://node-app.com';
    /* insert token here */
    this.pass = 'token placeholder';
  }

  print(firstName: String, lastName: String, email: String) {
    this.http.get(this.baseUrl + '/auth?pass=' + this.pass)
      .toPromise().then((token) => {
        this.http.get(this.baseUrl + '/print?csrf=' + token + '&first_name=' +
          firstName + '&lastName=' + lastName + '&email=' + email);
      }).catch((error) => {
        console.error(error);
        this.alertCtrl.create({
          title: error,
          subTitle: 'failed to print label',
          buttons: ['OK']
        });
      });
  }

}
