import {Component, ViewChild} from '@angular/core';
import {
  AlertController,
  Content,
  IonicPage,
  ItemSliding,
  ModalController,
  NavController,
  NavParams,
  ToastController,
  ViewController
} from 'ionic-angular';
import {UsersProvider} from '../../providers/users/users';
import {Storage} from '@ionic/storage';
import {ActivateGamePage} from '../activate-game/activate-game';
import {GameConfigEditPage} from '../game-config-edit/game-config-edit';

@IonicPage()
@Component({
  selector: 'page-game-list',
  templateUrl: 'game-list.html',
})
export class GameListPage {
  @ViewChild(Content) content: Content;

  public name: string;
  public id: string;
  public sexo: string;
  public identifier: string;
  public _games: any = [];

  mercearia: Game;
  space: Game;
  bloquinho: Game;
  bola: Game;
  pontes: Game;
  labirinto: Game;
  fruitJump: Game;

  constructor(public alertCtrl: AlertController, public modalCtrl: ModalController, public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public storage: Storage, private toast: ToastController, private userProvider: UsersProvider) {
    this.name = navParams.get('name');
    this.sexo = navParams.get('sexo');
    this.identifier = navParams.get('identifier');
    this.id = navParams.get('id');
    this.fillGames(navParams.get('games'));
  }

  fillGames(games: any) {
    this.mercearia = new Game();
    this.mercearia.gameID = '1';
    this.mercearia.title = 'Jogo da Mercearia';
    this._games.push(this.mercearia);

    this.space = new Game();
    this.space.gameID = '2';
    this.space.title = 'Invasão Espacial';
    this._games.push(this.space);

    this.bola = new Game();
    this.bola.gameID = '3';
    this.bola.title = 'Bola na Caixa';
    this._games.push(this.bola);

    this.bloquinho = new Game();
    this.bloquinho.gameID = '4';
    this.bloquinho.title = 'Bloquinho';
    this._games.push(this.bloquinho);

    this.pontes = new Game();
    this.pontes.gameID = '5';
    this.pontes.title = 'Pontes';
    this._games.push(this.pontes);

    this.labirinto = new Game();
    this.labirinto.gameID = '6';
    this.labirinto.title = 'Jogo do Labirinto';
    this._games.push(this.labirinto);

    this.fruitJump = new Game();
    this.fruitJump.gameID = '7';
    this.fruitJump.title = 'Fruit Jump';
    this._games.push(this.fruitJump);

    this._games.forEach((game) => {
      games.forEach((x) => {
        if (game.title == x.title) {
          game.config = x.config;
          game.gameID = x.gameID;
          game.time = x.time;
          game.imersiveMode = x.imersiveMode;
        }
      });
    });
  };

  activateGame(game: any, id: string) {
    let activateGameModal = this.modalCtrl.create(ActivateGamePage, {
      game: game,
      identifier: this.identifier
    }, {enableBackdropDismiss: false});
    activateGameModal.present();
  };

  editGame(game: any) {
    let gameEditModal = this.modalCtrl.create(GameConfigEditPage, {
      game: game,
      identifier: this.identifier,
      id: this.id
    }, {enableBackdropDismiss: false});
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
                    this.viewCtrl.dismiss();
                    this.toast.create({message: 'Jogo Desativado !', position: 'botton', duration: 3000}).present();
                  }
                })
                .catch((error: any) => {
                  reject(error);
                  this.toast.create({message: 'Erro: ' + error.error, position: 'botton', duration: 5000}).present();
                });
            });
          }
        }
      ]
    });
    confirm.present();
  };

  dismiss() {
    this.viewCtrl.dismiss();
  }

}

export class Game {
  gameID: string;
  config: string;
  title: string;
  time: string;
  imersiveMode: string;
}
