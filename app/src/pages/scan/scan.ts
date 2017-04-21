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
import { ConfirmPage } from '../confirm/confirm';
import { RejectPage } from '../reject/reject';
*/

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
  fakePersonObject: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    /*public diagnostic: Diagnostic,*/ public alertCtrl: AlertController,
    public zbar: ZBar, public backend: QruBackend) {
    this.eventType = navParams.get('eventType');
    this.fakePersonObject = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'name@example.com',
      data:
      {
        checkedIn: true,
        tshirt: true,
        lunch1: 1,
        dinner: 1,
        midnightSnack: 1,
        breakfast: 1,
        lunch2: 1
      }
    };
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
                  //this.navCtrl.push(RejectPage, {rejec: info});
                  this.displayMember(false, info, this.eventType);
                }).catch((infoError) => {
                  this.alertCtrl.create({
                    title: infoError,
                    subTitle: 'not registered',
                    buttons: ['OK']
                  }).present();
                });
            } else {
              this.alertCtrl.create({
                title: 'testing',
                subTitle: 'have info',
                buttons: ['OK']
              }).present();
              // valid request
              //this.navCtrl.push(ConfirmPage, {conf: reply});
              this.displayMember(true, reply, this.eventType);
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
  testConfirmDisplay() {
    //this.navCtrl.push(ConfirmPage, {conf: personObject});
    this.displayMember(true, this.fakePersonObject, 'checkIn');
  }

  testInfoDisplay() {
    this.displayInfo(this.fakePersonObject);
  }
  */

  displayMember(isValid: boolean, info: any, eventType: String) {
    var line: string;
    line = info.firstName + ' ' + info.lastName + '\nemail: ' + info.email + '\n';
    if (eventType == 'checkIn') {
      line += 'checked in: ' + info.data.checkedIn;
    } else if (eventType == 'tshirt') {
      line += 't-shirt: ' + info.data.tshirt;
    } else if (eventType == 'lunch1') {
      line += 'lunch 1: ' + info.data.lunch1;
    } else if (eventType == 'dinner') {
      line += 'dinner: ' + info.data.dinner;
    } else if (eventType == 'midnightSnack') {
      line += 'midnight snack: ' + info.data.midnightSnack;
    } else if (eventType == 'breakfast') {
      line += 'breakfast: ' + info.data.breakfast;
    } else if (eventType == 'lunch2') {
      line += 'lunch 2: ' + info.data.lunch2;
    } else {
      line += 'event does non exist';
    }
    this.alertCtrl.create({
      title: isValid ? 'Confirmed' : 'Rejected',
      subTitle: line,
      buttons: ['OK']
    }).present();
  }

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
