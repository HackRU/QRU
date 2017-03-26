import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Confirm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html'
})
export class ConfirmPage {
  data: APIReturnType;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = navParams.get('reply');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }

}
