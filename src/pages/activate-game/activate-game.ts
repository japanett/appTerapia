import { Component, ViewChild } from '@angular/core';
import { ModalController, App, ViewController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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


  constructor(public app: App, public modalCtrl: ModalController, public navCtrl: NavController, public viewCtrl: ViewController, public storage: Storage, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {
    this.identifier = navParams.get('identifier');
    this.game = navParams.get('game');
  }

  setConfigMercearia(firstGame: string, secondGame: string, thirdGame: string) {
    let _config = firstGame + ',' + secondGame + ',' + thirdGame;
    return _config;
  }
  setConfigBola(firstGame: string) {
    let _config = firstGame;
    return _config;
  }
  setConfigNave(firstGame: string) {
    let _config = firstGame;
    return _config;
  }
  activate(identifier: string, game: any) {
    return new Promise((resolve, reject) => {
      let config;
      if (game.title == 'Bola na Caixa') {
        config = this.setConfigBola(this.firstGame);
      }
      if (game.title == 'Jogo da Mercearia'){
        config = this.setConfigMercearia(this.firstGame, this.secondGame, this.thirdGame);
      }
      if (game.title == 'Invasão Espacial'){
        config = this.setConfigNave(this.firstGame);
      } 
      this.userProvider.addGames(identifier, config, game.gameID)
        .then((result: any) => {
          if (result.success === true) {
            this.viewCtrl.dismiss()
              .then(() => {
                // this.navCtrl.push('PacientListPage');
                // this.navCtrl.setRoot('PacientListPage');
                console.log('config: ',config);
                this.toast.create({ message: 'Jogo Ativado !', position: 'botton', duration: 2000 }).present();
                resolve();
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
