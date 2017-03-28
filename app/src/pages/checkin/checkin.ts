import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScanPage } from '../scan/scan';
// test for debugging
import { ConfirmPage } from '../confirm/confirm';
import { RejectPage } from '../reject/reject';
import { APIReturnSimulation } from '../scan/scan';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinPage');
  }

  scan(mode: String) {
    this.navCtrl.push(ScanPage, {mode: mode});
  }

  // for debugging
  testPage(page: String) {
    if (page == 'confirm') {
      this.navCtrl.push(ConfirmPage,
        {simulation: new APIReturnSimulation('test', 'test-format')});
    } else {
      this.navCtrl.push(RejectPage,
        {simulation: new APIReturnSimulation('test', 'test-format')});
    }
  }

}
