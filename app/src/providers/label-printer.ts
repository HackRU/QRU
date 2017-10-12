import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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
    this.baseUrl = 'http://abeebffc.ngrok.io';
    /* insert token here */
    this.pass = 'SteveWTF';
  }

  print(firstName: String, lastName: String, email: String) {
    this.http.get(this.baseUrl + '/auth?pass=' + this.pass)
      .map(token => token).subscribe((token) => {
        var fullUrl = this.baseUrl + '/print?csrf=' + token.text() + '&first_name=' +
              firstName + '&last_name=' + lastName + '&email=' + email;
        this.http.get(fullUrl).toPromise().then((reply) => {
            this.alertCtrl.create({
                title: 'reply from print',
                subTitle: reply.text(),
                buttons: ['OK']
            }).present();
        });
        this.alertCtrl.create({
            title: 'called auth',
            subTitle: fullUrl,
            buttons: ['OK']
        }).present();
/*
      }).catch((error) => {
        console.error(error);
        this.alertCtrl.create({
          title: error,
          subTitle: 'failed to print label',
          buttons: ['OK']
        }).present();
*/
      });
  }

}
