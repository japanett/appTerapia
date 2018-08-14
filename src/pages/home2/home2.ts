import { Component } from '@angular/core';
import { App, MenuController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';
/**
 * Generated class for the Home2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home2',
  templateUrl: 'home2.html',
})
export class Home2Page {

  constructor(app: App, menu: MenuController, public navCtrl: NavController, private toast: ToastController, public navParams: NavParams, private userProvider: UsersProvider) {
    menu.enable(true);
  }

  public getAuthUser() {
    this.userProvider.getUser().then(
      (result: any) => {
        let data = result;
        this.toast.create({ message: JSON.stringify(data), position: 'botton', duration: 15000 }).present();
        // if (!result.success) {
        //   this.navCtrl.push('LoginPage');
        // }
      }
    );
  }

  openCreatePacients(){
    this.navCtrl.push('CreatePacientPage');
  }

  openPacients(){
    this.navCtrl.push('PacientListPage');
  }
  // logout(){
  //   this.userProvider.logout()
  //   .then(()=>{
  //     this.navCtrl.push('HomePage')
  //   });
    
  // }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Home2Page');
  }

}
