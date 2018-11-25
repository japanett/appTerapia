import { Component } from '@angular/core';
import { ModalController, App, ViewController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-game-config-edit',
  templateUrl: 'game-config-edit.html',
})
export class GameConfigEditPage {
  public id: string;
  public game: any;
  public identifier: any
  public firstGame: string;
  public secondGame: string;
  public thirdGame: string;
  public fourthGame: string;
  public time: string;

  constructor(public app: App, public modalCtrl: ModalController, public navCtrl: NavController, public viewCtrl: ViewController, public storage: Storage, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {
    this.identifier = navParams.get('identifier');
    this.id = navParams.get('id');
    this.game = navParams.get('game');
    this.firstGame = this.game.config.split(',')[0];
    this.secondGame = this.game.config.split(',')[1] || this.game.config;
    this.thirdGame = this.game.config.split(',')[2] || this.game.config;
    this.fourthGame = this.game.config.split(',')[3] || this.game.config;
    this.time = this.game.time;
  }

  setConfigMercearia(firstGame: string, secondGame: string, thirdGame: string, fourthGame: string) {
    let _config = firstGame + ',' + secondGame + ',' + thirdGame + ',' + fourthGame;
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
      var config,
        _time;
      if (game.title == 'Bola na Caixa') {
        config = this.setConfigBola(this.firstGame);
        _time = "";
      }
      if (game.title == 'Jogo da Mercearia') {
        config = this.setConfigMercearia(this.firstGame, this.secondGame, this.thirdGame, this.fourthGame);
        _time = this.time;
      }
      if (game.title == 'Invasão Espacial') {
        config = this.setConfigNave(this.firstGame);
        _time = "";
      }
      this.checkNumber(_time, game.title)
        .then(() => {
          this.userProvider.updateGameConfig(id, config, game.gameID, _time)
            .then((result: any) => {
              if (result.success === true) {
                this.viewCtrl.dismiss()
                  .then(() => {
                    this.navCtrl.popToRoot();
                    this.toast.create({ message: 'Jogo atualizado !', position: 'botton', duration: 2000 }).present();
                    resolve();
                  });
              }
            })
            .catch((error: any) => {
              reject(error);
              this.toast.create({ message: 'Erro: ' + error.error, position: 'botton', duration: 5000 }).present();
            });
        })
        .catch(e => this.toast.create({ message: e, position: 'botton', duration: 5000 }).present());
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  checkNumber(time: string, gameTitle: string) {
    return new Promise((resolve, reject) => {
      //if string is a number and not empty, return true
      var isFixedString = (s: string) => !isNaN(+s) && isFinite(+s) && !/e/i.test(s) && s.length > 0;
      if (!isFixedString(time) && gameTitle === 'Jogo da Mercearia') {
        reject('Insira um número válido !')
      }
      else {
        resolve();
      }
    })
  }
}
