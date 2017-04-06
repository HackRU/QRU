import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CheckinPage } from '../pages/checkin/checkin';
import { MealsPage } from '../pages/meals/meals';
import { ScanPage } from '../pages/scan/scan';
import { ConfirmPage } from '../pages/confirm/confirm';
import { RejectPage } from '../pages/reject/reject';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ZBar } from '@ionic-native/zbar';
import { QruBackend } from '../providers/qru-backend';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CheckinPage,
    MealsPage,
    ScanPage,
    ConfirmPage,
    RejectPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CheckinPage,
    MealsPage,
    ScanPage,
    ConfirmPage,
    RejectPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ZBar,
    QruBackend,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
