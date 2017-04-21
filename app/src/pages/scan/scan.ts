import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { Diagnostic } from '@ionic-native/diagnostic';
import { AlertController } from 'ionic-angular';
// import { BarcodeScanner } from 'ionic-native';
import { ZBar } from '@ionic-native/zbar';
import { QruBackend } from '../../providers/qru-backend';
/*
import { CheckinPage } from '../checkin/checkin';
import { MealsPage } from '../meals/meals';
*/
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
    /*public diagnostic: Diagnostic,*/ public alertCtrl: AlertController,
    public zbar: ZBar, public backend: QruBackend) {
    this.eventType = navParams.get('eventType');
  }

    /*
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
  */

  openCamera() {
    this.zbar.scan({flash:'off', drawSight:false})
      .then((barcode) => {
        this.backend.update(this.eventType, barcode)
          .then((reply) => {
            if (reply == null) {
              // invalid request
              this.backend.info(barcode)
                .then((info) => {
                  this.navCtrl.push(RejectPage, {reply: info});
                  //this.displayMember(false, info, eventType);
                }).catch((infoError) => {
                  this.alertCtrl.create({
                    title: infoError,
                    subTitle: 'not registered',
                    buttons: ['OK']
                  }).present();
                });
            } else {
              // valid request
              this.navCtrl.push(ConfirmPage, {reply: reply});
              //this.displayMember(true, reply, eventType);
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

    /*
  displayMember(isValid: boolean, info: Object, eventType: String) {
    var line: string;
    line = null;
    if (eventType == 'checkIn') {
      line = 'checked in: ' + info.checkedIn;
    } else if (eventType == 'tshirt') {
      line = 't-shirt: ' + info.tshirt;
    } else if (eventType == 'lunch1') {
      line = 'lunch 1: ' + info.lunch1;
    } else if (eventType == 'dinner') {
      line = 'dinner: ' + info.dinner;
    } else if (eventType == 'midnightSnack') {
      line = 'midnight snack: ' + info.midnightSnack;
    } else if (eventType == 'breakfast') {
      line = 'breakfast: ' + info.breakfast;
    } else if (eventType == 'lunch2') {
      line = 'lunch 2: ' + info.lunch2;
    } else {
      line = 'event does non exist';
    }
    this.alertCtrl.create({
      title: isValid ? 'Confirmed' : 'Rejected',
      subTitle: line,
      buttons: ['OK']
    }).present();
  }

  displayInfo(info: Object) {
    this.alertCtrl.create({
      title: info.firstName + ' ' + info.lastName,
      subTitle: 'email: ' + info.email + '\n' +
      'checked in: ' + info.checkIn + '\n' +
      't-shirt: ' + info.tshirt + '\n' +
      'lunch 1: ' + info.lunch1 + '\n' +
      'dinner: ' + info.dinner + '\n' +
      'midnight snack: ' + info.midnightSnack + '\n' +
      'breakfast: ' + info.breakfast + '\n' +
      'lunch 2: ' + info.lunch2,
      buttons: ['OK']
    }).present();
  }
  */

    /*
  back() {
    if (this.eventType == 'checkIn' || this.eventType == 'tshirt') {
      this.navCtrl.push(CheckinPage);
    } else {
      this.navCtrl.push(MealsPage);
    }
  }
  */

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }

}
