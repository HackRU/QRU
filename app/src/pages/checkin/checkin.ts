import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ScanPage } from '../scan/scan';
// test for debugging
import { ZBar } from '@ionic-native/zbar';
import { QruBackend } from '../../providers/qru-backend';
import { IssuesPage } from '../issues/issues';
import { ListPage } from '../list/list';
//import { InfoPage } from '../info/info';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public zbar: ZBar, public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public diagnostic: Diagnostic, public backend: QruBackend) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinPage');
  }

  showIssues() {
    this.navCtrl.push(IssuesPage);
  }

  openScanPage(mode: String) {
    this.navCtrl.push(ScanPage, {eventType: mode});
  }

  getPermission() {
    this.diagnostic.getCameraAuthorizationStatus().then((authStatus) => {
      switch (authStatus) {
        case this.diagnostic.permissionStatus.DENIED_ALWAYS:
        case this.diagnostic.permissionStatus.RESTRICTED:
        case this.diagnostic.permissionStatus.DENIED:
          this.alertCtrl.create({
            title: 'Failed',
            subTitle: 'permission denied permanently',
            buttons: ['OK']
          }).present();
          break;
        case this.diagnostic.permissionStatus.GRANTED:
        case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
          this.alertCtrl.create({
            title: 'Hello Again',
            subTitle: 'permission already granted',
            buttons: ['OK']
          }).present();
          break;
        case this.diagnostic.permissionStatus.NOT_REQUESTED:
          this.diagnostic.requestCameraAuthorization()
            .then((authRequestStatus) => {
            console.log('request status: ' + authRequestStatus);
          }).catch((requestError) => {
            console.error(requestError);
            this.alertCtrl.create({
              title: requestError,
              subTitle: 'failed to request camera permission',
              buttons: ['OK']
            }).present();
          });
          break;
        default:
          this.alertCtrl.create({
            title: 'Need more cases',
            subTitle: 'authStatus: ' + authStatus,
            buttons: ['OK']
          }).present();
      }
    }).catch((error) => {
      console.error(error);
      this.alertCtrl.create({
        title: error,
        subTitle: 'failed to get permission status',
        buttons: ['OK']
      }).present();
    });
  }

    /*
  scan(hasSight: boolean, mode: String, email: String) {
    // backend info
    this.diagnostic.isCameraAuthorized().then((isAuthorized) => {
      this.alertCtrl.create({
        title: 'Authorization status',
        subTitle: '' + isAuthorized,
        buttons: ['OK']
      }).present();
      if (isAuthorized) {
        this.openCamera(mode, email);
      } else {
        this.alertCtrl.create({
          title: 'Scan Aborted',
          subTitle: 'cannot access camera',
          buttons: ['OK']
        }).present();
      }
    }).catch((error) => {
      this.alertCtrl.create({
        title: error,
        subTitle: 'failed to get authorization status',
        buttons: ['OK']
      }).present();
    });
  }
  */

  openCamera(hasSight: boolean, mode: String) {
    this.zbar.scan({flash: 'off', drawSight: hasSight}).then((barcode) => {
      if (mode == null) {
        this.alertCtrl.create({
          title: 'Scan Result',
          subTitle: barcode,
          buttons: ['OK']
        }).present();
      } else if (mode == 'info') {
        this.testInfo(barcode);
      } else {
        this.testUpdate(mode, barcode);
      }
    }).catch((scanError) => {
      this.alertCtrl.create({
        title: scanError,
        subTitle: 'failed to scan',
        buttons: ['OK']
      }).present();
    });
  }

  displayInfo(info: any) {
    this.alertCtrl.create({
      title: info.firstName + ' ' + info.lastName,
      subTitle: 'email: ' + info.email + '\n' +
      'checked in: ' + info.data.checkedIn + '\n' +
      'tshirt: ' + info.data.tshirt + '\n' +
      'lunch 1: ' + info.data.lunch1 + '\n' +
      'dinner: ' + info.data.dinner + '\n' +
      'midnight snack: ' + info.data.midnightSnack + '\n' +
      'breakfast: ' + info.data.breakfast + '\n' +
      'lunch 2: ' + info.data.lunch2,
      buttons: ['OK']
    }).present();
  }

  // for debugging
  selectEvent() {
    // backend update with arbitrary event and email
    this.actionSheetCtrl.create({
      title: 'Choose an event',
      buttons: [
        {
          text: 'Check-in',
          handler: () => {
            this.selectEmail('checkIn');
          }
        },
        {
          text: 'T-Shirt',
          handler: () => {
            this.selectEmail('tshirt');
          }
        },
        {
          text: 'Lunch 1',
          handler: () => {
            this.selectEmail('lunch1');
          }
        },
        {
          text: 'Dinner',
          handler: () => {
            this.selectEmail('dinner');
          }
        },
        {
          text: 'Midnight Snack',
          handler: () => {
            this.selectEmail('midnightSnack');
          }
        },
        {
          text: 'Breakfast',
          handler: () => {
            this.selectEmail('breakfast');
          }
        },
        {
          text: 'Lunch 2',
          handler: () => {
            this.selectEmail('lunch2');
          }
        },
        {
          text: 'Cancel',
          handler: () => {}
        }
      ]
    }).present();
  }

  selectEmail(mode: String) {
    // backend update with arbitrary email
    this.alertCtrl.create({
      title: 'Email',
      message: 'enter an email address',
      inputs: [{
        name: 'email',
        placeholder: 'name@example.com'
      }],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {}
        },
        {
          text: 'Save',
          handler: (data) => {
            if (mode == 'info') {
              this.testInfo(data['email']);
            } else {
              this.testUpdate(mode, data['email']);
            }
          }
        }
      ]
    }).present();
  }

  testUpdate(mode: String, email: String) {
    // backend update
    this.backend.update(mode, email)
      .then((reply) => {
        if (reply == null) {
          this.alertCtrl.create({
            title: 'Null',
            subTitle: 'invalid update',
            buttons: ['OK']
          }).present();
        } else {
          this.alertCtrl.create({
            title: 'Confirm',
            subTitle: reply.email,
            buttons: ['OK']
          }).present();
        }
      }).catch((error) => {
        this.alertCtrl.create({
          title: error,
          subTitle: 'failed to call API',
          buttons: ['OK']
        }).present();
      });
  }

  testList() {
    // backend list
    this.backend.emaillist()
      .then((reply) => {
        this.navCtrl.push(ListPage, {list: reply});
      }).catch((error) => {
        this.alertCtrl.create({
          title: error,
          subTitle: 'failed to call API',
          buttons: ['OK']
        }).present();
      });
  }

  testInfo(email: String) {
    // backend info
    this.backend.info(email).then((reply) => {
      //this.navCtrl.push(InfoPage, {info: reply});
      this.displayInfo(reply);
    }).catch((apiError) => {
      this.alertCtrl.create({
        title: apiError,
        subTitle: 'failed to call API',
        buttons: ['OK']
      });
    });
  }

}
