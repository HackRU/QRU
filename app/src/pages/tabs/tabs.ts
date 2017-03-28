import { Component } from '@angular/core';

import { CheckinPage } from '../checkin/checkin';
import { MealsPage } from '../meals/meals';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = CheckinPage;
  tab2Root: any = MealsPage;

  constructor() {

  }
}
