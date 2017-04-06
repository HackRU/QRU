import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScanPage } from '../scan/scan';

/*
  Generated class for the Meals page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-meals',
  templateUrl: 'meals.html'
})
export class MealsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MealsPage');
  }

  click(mode: String) {
    this.navCtrl.push(ScanPage, {eventType: mode});
  }

}
