import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Info page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  info: Object;
  /*
  isEvent: boolean;
  isValid: boolean;
  boldText: String;
  */
  //whiskers: String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.info = navParams.get('info');
    /*
    this.isEvent = navParams.get('isEvent');
    this.isValid = navParams.get('isValid');
    if (!this.isEvent) {
      this.boldText = 'Just Getting Info';
    } else if (this.isValid) {
      //css-selector = confirmed;
      //document.styleSheets[0].rules[0].style.color = 'green';
      //this.whiskers = 'confirmed';
      //this.buttonColor = $colors.green;
      this.boldText = 'Request Confirmed';
    } else {
      //css-selector = rejected;
      //document.styleSheets[0].rules[0].style.color = 'red';
      //this.whiskers = 'rejected';
      //this.buttonColor = $colors.red;
      this.boldText = 'Request Rejected';
    }
    */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }

}
