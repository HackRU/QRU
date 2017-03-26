import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import { APIName } from '../../providers/api-name';
import { ConfirmPage } from '../confirm/confirm';
import { RejectPage } from '../reject/reject';

/*
  Generated class for the Scan page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage {
  mode: String;
  apiInstance: apiName;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mode = navParams.get('mode');
    // infinite loop
    while (true) {
      BarcodeScanner.scan()
        .then((barcode) => {
          if (barcode.cancelled) {
            // give the user a way to break out of the loop
            this.navCtrl.pop();
          } else {
            if (barcode.format != "QR_Code") {
              continue;
            }
            // we will deal with the api later
            this.apiInstance.callFunction(barcode.text, this.mode)
              .then((reply) => {
                // we don't need to confirm checkin validity
                if (this.mode == "checkin") {
                  continue;
                }
                if (reply.isValid) {
                  this.navCtrl.push(ConfirmPage, {reply, reply});
                } else {
                  this.navCtrl.push(RejectPage, {reply, reply});
                }
              });
          })
          .catch((error) => {
            alert(error);
          });
        }
    }
    // we should never actually get here
    Console.log("error\n");
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }

}
