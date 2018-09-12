import { PacientListPage } from './../pacient-list/pacient-list';
import { UserDetailPage } from './../user-detail/user-detail';
import { CreatePacientPage } from './../create-pacient/create-pacient';
import { HomePage } from './../home/home';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav } from 'ionic-angular';
import { App } from 'ionic-angular';


export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  // Basic root for our  content view
  rootPage = 'UserDetailPage';

  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  pages: PageInterface[] = [
    { title: 'Perfil', pageName: 'UserDetailPage',  index: 0, icon: 'contact' },
    { title: 'Pacientes', pageName: 'PacientListPage', index: 1, icon: 'contacts' },
    // { title: 'Criar paciente', pageName: 'CreatePacientPage', icon: 'person-add' },
    { title: 'Logout', pageName: 'HomePage', icon: 'log-out' }
  ];

  constructor(public navCtrl: NavController, public app: App) { }

  openPage(page: PageInterface) {
    let params = {};

    if (this.nav.getActiveChildNav() != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    }
    // Logout
    else if (page.pageName == 'HomePage') {
      this.app.getRootNav().setRoot(HomePage);
    }
    else {
      this.nav.setRoot(page.pageName, params);
    }
  }

  isActive(page: PageInterface) {

    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }

}