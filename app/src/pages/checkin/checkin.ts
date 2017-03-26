import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScanPage } from '../scan/scan';

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

  click() {
    this.navCtrl.push(ScanPage, {'checkin', mode});
  }

}
