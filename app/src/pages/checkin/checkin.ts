import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AlertController } from 'ionic-angular';
import { ScanPage } from '../scan/scan';
// test for debugging
import { ConfirmPage } from '../confirm/confirm';
import { RejectPage } from '../reject/reject';
import { ZBar } from '@ionic-native/zbar';
import { APIReturnSimulation } from '../scan/scan';
import { QruBackend } from '../../providers/qru-backend';
import { ListPage } from '../list/list';
import { InfoPage } from '../info/info';

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
    public diagnostic: Diagnostic, public backend: QruBackend) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinPage');
  }

  click(mode: String) {
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
            title: 'Hello',
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

  // for debugging
  testScanner(hasSight: boolean) {
    this.diagnostic.isCameraAuthorized().then((authorized) => {
      if (!authorized) {
        this.alertCtrl.create({
          title: 'Scan Aborted',
          subTitle: 'cannot access camera',
          buttons: ['OK']
        }).present();
      }
    }).catch((error) => {
      console.error(error);
    });
    this.zbar.scan({flash: 'off', drawSight: hasSight})
      .then((barcode) => {
        this.alertCtrl.create({
          title: 'Result Text',
          subTitle: barcode,
          buttons: ['OK']
        }).present();
      }).catch((error) => {
        alert(error);
      });
  }

  testPage(page: String) {
    if (page == 'confirm') {
      this.navCtrl.push(ConfirmPage,
        {reply: new APIReturnSimulation('test@example', 'first', 'last')});
    } else {
      this.navCtrl.push(RejectPage);
    }
  }

  testUpdate() {
    // backend update
    this.backend.update('checkin', 'triangular.pyramid@gmail.com')
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

  testInfo() {
    // backend info
    this.backend.info('triangular.pyramid@gmail.com')
      .then((reply) => {
        if (reply == null) {
          this.alertCtrl.create({
            title: 'Null',
            subTitle: 'failed to get info',
            buttons: ['OK']
          }).present();
        } else {
          this.navCtrl.push(InfoPage, {info: reply});
        }
      });
  }

}
