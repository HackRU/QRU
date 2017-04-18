import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AlertController } from 'ionic-angular';
// import { BarcodeScanner } from 'ionic-native';
import { ZBar } from '@ionic-native/zbar';
import { QruBackend } from '../../providers/qru-backend';
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
  eventType: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public diagnostic: Diagnostic, public alertCtrl: AlertController,
    public zbar: ZBar, public backend: QruBackend) {
    this.eventType = navParams.get('eventType');
  }

  scan() {
    this.diagnostic.isCameraAuthorized().then((authorized) => {
      if (authorized) {
        this.openCamera();
      } else {
        this.alertCtrl.create({
          title: 'Scan Aborted',
          subTitle: 'cannot access camera',
          buttons: ['OK']
        }).present();
      }
    }).catch((error) => {
      console.error(error);
      this.alertCtrl.create({
        title: error,
        subTitle: 'failed to get authorization status',
        buttons: ['OK']
      }).present();
    });
  }

  openCamera() {
    this.zbar.scan({flash:'off', drawSight:false})
      .then((barcode) => {
        this.backend.update(this.eventType, barcode)
          .then((reply) => {
            if (reply == null) {
              // invalid request
              this.navCtrl.push(RejectPage);
            } else {
              // valid request
              this.navCtrl.push(ConfirmPage, {reply: reply});
            }
          });
      }).catch((error) => {
        alert(error);
        this.alertCtrl.create({
          title: error,
          subTitle: 'failed to call call API',
          buttons: ['OK']
        }).present();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }

}
