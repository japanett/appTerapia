import { Component, ViewChild } from '@angular/core';
import { ModalController, Nav, App, ViewController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';
import { Storage } from '@ionic/storage';
import { PacientListPage } from '../pacient-list/pacient-list';

@IonicPage()
@Component({
  selector: 'page-activate-game',
  templateUrl: 'activate-game.html',
})
export class ActivateGamePage {
  public game: any;
  public identifier: string;
  public firstGame: string = '1';
  public secondGame: string = '2';
  public thirdGame: string = '3';
  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
  constructor(public app: App, public modalCtrl: ModalController, public navCtrl: NavController, public viewCtrl: ViewController, public storage: Storage, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {
    this.identifier = navParams.get('identifier');
    this.game = navParams.get('game');
  }

  setConfig(firstGame: string, secondGame: string, thirdGame: string) {
    let _config = firstGame + ',' + secondGame + ',' + thirdGame;
    return _config;
  }
  activate(identifier: string, game: any) {
    return new Promise((resolve, reject) => {
      let config = this.setConfig(this.firstGame, this.secondGame, this.thirdGame);
      this.userProvider.addGames(identifier, config, game.gameID)
        .then((result: any) => {
          if (result.success === true) {
            // this.app.getRootNav().setRoot('MenuPage')
            //   .then(() => {
            //     this.navCtrl.popToRoot();
            //   });
            this.dismiss();
            this.navCtrl.popToRoot().then(() => {
              // this.navCtrl.push('PacientListPage');
              // this.navCtrl.setRoot('PacientListPage');
              this.toast.create({ message: 'Jogo Ativado !', position: 'botton', duration: 2000 }).present();
            });
          }
          if (result.success === false) {
            this.navCtrl.popToRoot();
            this.toast.create({ message: 'Jogo já foi ativado para o paciente !', position: 'botton', duration: 5000 }).present();
          }
        })
        .catch((error: any) => {
          reject(error);
          this.toast.create({ message: 'Erro: ' + error.error, position: 'botton', duration: 5000 }).present();
        });
    });
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivateGamePage');
  }

}
