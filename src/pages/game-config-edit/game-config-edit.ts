import {Component} from '@angular/core';
import {
  App,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController,
  ViewController
} from 'ionic-angular';
import {UsersProvider} from '../../providers/users/users';
import {Storage} from '@ionic/storage';

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
  public imersiveMode: string;
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
    this.imersiveMode = 'F';
  }

  static setConfigMercearia(firstGame: string, secondGame: string, thirdGame: string, fourthGame: string) {
    return firstGame + ',' + secondGame + ',' + thirdGame + ',' + fourthGame;
  }

  static setConfigBloquinho(firstGame: string, secondGame: string, thirdGame: string) {
    return firstGame + ',' + secondGame + ',' + thirdGame;
  }

  static setConfigPontes(firstGame: string, secondGame: string) {
    return firstGame + ',' + secondGame;
  }

  static setConfigBola(firstGame: string) {
    return firstGame;
  }

  static setConfigNave(firstGame: string) {
    return firstGame;
  }

  editGame(id: string, game: any) {
    return new Promise((resolve, reject) => {
      let config,
        _time;
      if (game.title == 'Bola na Caixa') {
        config = GameConfigEditPage.setConfigBola(this.firstGame);
        _time = "";
      }
      if (game.title == 'Jogo da Mercearia') {
        config = GameConfigEditPage.setConfigMercearia(this.firstGame, this.secondGame, this.thirdGame, this.fourthGame);
        _time = this.time;
      }
      if (game.title == 'Pontes') {
        config = GameConfigEditPage.setConfigPontes(this.firstGame, this.secondGame);
        _time = this.time;
      }
      if (game.title == 'Bloquinho') {
        config = GameConfigEditPage.setConfigBloquinho(this.firstGame, this.secondGame, this.thirdGame);
        _time = this.time;
      }
      if (game.title == 'Invasão Espacial') {
        config = GameConfigEditPage.setConfigNave(this.firstGame);
        _time = "";
      }
      this.checkNumber(_time, game.title)
        .then(() => {
          this.userProvider.updateGameConfig(id, config, game.gameID, _time, this.imersiveMode)
            .then((result: any) => {
              if (result.success === true) {
                this.viewCtrl.dismiss()
                  .then(() => {
                    this.navCtrl.popToRoot();
                    this.toast.create({message: 'Jogo atualizado !', position: 'botton', duration: 2000}).present();
                    resolve();
                  });
              }
            })
            .catch((error: any) => {
              reject(error);
              this.toast.create({message: 'Erro: ' + error.error, position: 'botton', duration: 5000}).present();
            });
        })
        .catch(e => this.toast.create({message: e, position: 'botton', duration: 5000}).present());
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  checkNumber(time: string, gameTitle: string) {
    return new Promise((resolve, reject) => {
      //if string is a number and not empty, return true
      let isFixedString = (s: string) => !isNaN(+s) && isFinite(+s) && !/e/i.test(s) && s.length > 0;
      if (!isFixedString(time) && gameTitle === 'Jogo da Mercearia') {
        reject('Defina um tempo em segundos !')
      } else {
        resolve();
      }
    })
  }
}
