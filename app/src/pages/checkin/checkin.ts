import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScanPage } from '../scan/scan';
// test for debugging
import { ConfirmPage } from '../confirm/confirm';
import { RejectPage } from '../reject/reject';
import { ZBar } from '@ionic-native/zbar';
import { AlertController } from 'ionic-angular';
import { APIReturnSimulation } from '../scan/scan';
import { QruBackend } from '../../providers/qru-backend';
import { ListPage } from '../list/list';
import { InfoPage } from '../info/info';

/*
  Generated class for the Checkin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html'
})
export class CheckinPage {
  backend: QruBackend;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public zbar: ZBar, public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinPage');
  }

  click(mode: String) {
    this.navCtrl.push(ScanPage, {eventType: mode});
  }

  // for debugging
  testScanner(hasSight: boolean) {
    this.zbar.scan({flash: 'off', drawSight: hasSight})
      .then((barcode) => {
        this.alertCtrl.create({
          title: barcode.format,
          subTitle: barcode.text,
          buttons: ['OK']
        }).present();
      }).catch((error) => {
        alert(error);
      });
  }

  testPage(page: String) {
    if (page == 'confirm') {
      this.navCtrl.push(ConfirmPage,
        {reply: new APIReturnSimulation('test@example', 'first', 'last')});
    } else {
      this.navCtrl.push(RejectPage);
    }
  }

  testAlert(isValid: Boolean) {
    if (isValid) {
      this.alertCtrl.create({
        title: 'Confirm',
        subTitle: 'valid request',
        buttons: ['OK']
      }).present();
    } else {
      this.alertCtrl.create({
        title: 'Reject',
        subTitle: 'invalid request',
        buttons: ['OK']
      }).present();
    }
  }

  testUpdate() {
    // backend update
    this.backend.update('checkin', 'triangular.pyramid@gmail.com')
      .then((reply) => {
        let isValid = (reply != null);
        this.testAlert(isValid);
      });
  }

  testList() {
    // backend list
    this.backend.list()
      .then((reply) => {
        this.navCtrl.push(ListPage, {list: reply});
      });
  }

  testInfo() {
    // backend info
    this.backend.info('triangular.pyramid@gmail.com')
      .then((reply) => {
        this.navCtrl.push(InfoPage, {info: reply});
      });
  }

}
