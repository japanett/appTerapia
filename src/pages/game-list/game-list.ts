import { Component, ViewChild } from '@angular/core';
import { Content, ModalController, ItemSliding, AlertController, IonicPage, ViewController, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';
import { Storage } from '@ionic/storage';
import { ActivateGamePage } from './../activate-game/activate-game';
import { GameConfigEditPage } from './../game-config-edit/game-config-edit';

@IonicPage()
@Component({
  selector: 'page-game-list',
  templateUrl: 'game-list.html',
})
export class GameListPage {
  @ViewChild(Content) content: Content;

  testCheckboxOpen: boolean;
  testCheckboxResult;
  public name: string;
  public id: string;
  public sexo: string;
  public identifier: string;
  public _games: any = [];
  mercearia: Game;
  space: Game;
  bola: Game;
  public ordemJogos: any = [];

  constructor(public alertCtrl: AlertController, public modalCtrl: ModalController, public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public storage: Storage, private toast: ToastController, private userProvider: UsersProvider) {
    this.name = navParams.get('name');
    this.sexo = navParams.get('sexo');
    this.identifier = navParams.get('identifier');
    this.id = navParams.get('id');
    this.fillGames(navParams.get('games'));
  }

  fillGames(games: any) {
    this.mercearia = new Game();
    this.space = new Game();
    this.bola = new Game();
    this.mercearia.title = 'Jogo da Mercearia';
    this.mercearia.gameID = '1';
    this.space.title = 'Invasão Espacial';
    this.space.gameID = '2';
    this.bola.title = 'Bola na Caixa';
    this.bola.gameID = '3';
    this._games.push(this.mercearia);
    this._games.push(this.bola);
    this._games.push(this.space);
    this._games.forEach((game) => {
      games.forEach((x) => {
        if (game.title == x.title) {
          game.config = x.config;
          game.gameID = x.gameID;
          game.time = x.time;
        }
      });
    });
  };

  activateGame(game: any, id: string) {
    var pacientModal = this.modalCtrl.create(ActivateGamePage, { game: game, identifier: this.identifier }, { enableBackdropDismiss: false });
    pacientModal.onDidDismiss(() => {
      this.viewCtrl.dismiss()
        .then(() => {
          console.log('321382190321');
        })
    })
    pacientModal.present();
  };

  editGame(game: any) {
    var gameEditModal = this.modalCtrl.create(GameConfigEditPage, { game: game, identifier: this.identifier, id: this.id }, { enableBackdropDismiss: false });
    gameEditModal.onDidDismiss(() => {
      this.viewCtrl.dismiss()
        .then(() => {
          console.log('321382190321');
        })
    })
    gameEditModal.present();
  };

  deactivateGame(game: any, id: string, slidingItem: ItemSliding) {
    const confirm = this.alertCtrl.create({
      title: 'Desativar jogo ',
      message: 'Desativar " ' + game.title + '" ?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Sim',
          handler: () => {
            return new Promise((resolve, reject) => {
              this.userProvider.removePacientGame(id, game.gameID)
                .then((result: any) => {
                  if (result.success === true) {
                    // this.navCtrl.setRoot(this.navCtrl.getActive().component);
                    this.viewCtrl.dismiss();
                    this.toast.create({ message: 'Jogo Desativado !', position: 'botton', duration: 3000 }).present();
                  }
                })
                .catch((error: any) => {
                  reject(error);
                  this.toast.create({ message: 'Erro: ' + error.error, position: 'botton', duration: 5000 }).present();
                });
            });
          }
        }
      ]
    });
    confirm.onDidDismiss(() => { console.log('dismissss') });
    confirm.present();
  };

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getStylee(sexo: string) {
    // console.log(pacient);
    if (sexo == 'masculino') {
      return "rgba(64, 67, 240, 0.801)";
    } else {
      return "#eb2d2d";
    }
  };
  getStylee2(sexo: string) {
    // console.log(pacient);
    if (sexo == 'masculino') {
      return "boy";
    } else {
      return "girl";
    }
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameListPage222');
  }

}
export class Game {
  gameID: string;
  config: string;
  title: string;
  time:string;
};