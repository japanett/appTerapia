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
  selector: 'page-activate-game',
  templateUrl: 'activate-game.html',
})
export class ActivateGamePage {
  public game: any;
  public identifier: string;
  public firstGame: string = '1';
  public secondGame: string = '2';
  public thirdGame: string = '3';
  public fourthGame: string = 'F';
  public time: string = "";
  public imersiveMode: string = 'T';

  constructor(public app: App, public modalCtrl: ModalController, public navCtrl: NavController, public viewCtrl: ViewController, public storage: Storage, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {
    this.identifier = navParams.get('identifier');
    this.game = navParams.get('game');
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

  activate(identifier: string, game: any) {
    return new Promise((resolve, reject) => {
      let config,
        _time;

      if (game.title == 'Bola na Caixa') {
        config = ActivateGamePage.setConfigBola(this.firstGame);
        _time = "";
      }
      if (game.title == 'Jogo da Mercearia') {
        config = ActivateGamePage.setConfigMercearia(this.firstGame, this.secondGame, this.thirdGame, this.fourthGame);
        _time = this.time;
      }
      if (game.title == 'Invasão Espacial') {
        config = ActivateGamePage.setConfigNave(this.firstGame);
        _time = "";
      }
      if (game.title == 'Bloquinho') {
        config = ActivateGamePage.setConfigBloquinho(this.firstGame, this.secondGame, this.thirdGame);
        _time = this.time;
      }
      if (game.title == 'Pontes') {
        config = ActivateGamePage.setConfigPontes(this.firstGame, this.secondGame);
        _time = this.time;
      }

      this.checkNumber(_time, game.title)
        .then(() => {
          this.userProvider.addGames(identifier, config, game.gameID, _time, this.imersiveMode)
            .then((result: any) => {
              if (result.success === true) {
                this.viewCtrl.dismiss()
                  .then(() => {
                    this.navCtrl.popToRoot();
                    this.toast.create({message: 'Jogo Ativado !', position: 'botton', duration: 2000}).present();
                    resolve();
                  })
              }
              if (result.success === false) {
                this.navCtrl.popToRoot();
                this.toast.create({
                  message: 'Jogo já foi ativado para o paciente !',
                  position: 'botton',
                  duration: 5000
                }).present();
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
        reject('Insira um número válido !')
      } else {
        resolve();
      }
    })
  }

}
