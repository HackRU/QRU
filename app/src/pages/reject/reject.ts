import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { APIReturnSimulation } from '../scan/scan';

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
  //data: APIReturnType;
  data: APIReturnSimulation;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get('simulation');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RejectPage');
  }

}
