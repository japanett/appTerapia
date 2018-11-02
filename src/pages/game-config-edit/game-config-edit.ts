import { Component, ViewChild } from '@angular/core';
import { ModalController, App, ViewController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-game-config-edit',
  templateUrl: 'game-config-edit.html',
})
export class GameConfigEditPage {
  public id:string;
  public game:any;
  public identifier:any
  public firstGame: string;
  public secondGame: string;
  public thirdGame: string;

  constructor(public app: App, public modalCtrl: ModalController, public navCtrl: NavController, public viewCtrl: ViewController, public storage: Storage, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {
    this.identifier = navParams.get('identifier');
    this.id = navParams.get('id');
    this.game = navParams.get('game');
    this.firstGame = this.game.config.split(',')[0];
    this.secondGame = this.game.config.split(',')[1] || this.game.config;
    this.thirdGame = this.game.config.split(',')[2] || this.game.config;
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

  editGame(id: string, game: any) {
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
      this.userProvider.updateGameConfig(id, config, game.gameID)
        .then((result: any) => {
          if (result.success === true) {
            this.viewCtrl.dismiss()
              .then(() => {
                // this.navCtrl.push('PacientListPage');
                console.log('config: ', config)
                // this.navCtrl.setRoot('PacientListPage');
                this.toast.create({ message: 'Jogo atualizado !', position: 'botton', duration: 2000 }).present();
                resolve();
              });
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
    console.log('ionViewDidLoad GameConfigEditPage');
  }

}
