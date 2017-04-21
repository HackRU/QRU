import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Reject page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reject',
  templateUrl: 'reject.html'
})
export class RejectPage {
  rejection: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.rejection = navParams.get('rejec');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RejectPage');
  }

}
