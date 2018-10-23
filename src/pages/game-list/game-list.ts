import { Component } from '@angular/core';
import { ModalController, ItemSliding, AlertController, IonicPage, ViewController, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-game-list',
  templateUrl: 'game-list.html',
})
export class GameListPage {
  public name: string;
  public identifier: string;
  public _games: any = [];
  mercearia: Game;
  space: Game;
  bola: Game;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public storage: Storage, private toast: ToastController, private userProvider: UsersProvider) {
    this.name = navParams.get('name');
    this.identifier = navParams.get('identifier');
    this.fillGames(navParams.get('games'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameListPage222');
    console.log('_games');
    console.log(this._games);
  }

  fillGames(games) {
    this.mercearia = new Game();
    this.space = new Game();
    this.bola = new Game();
    this.mercearia.title = 'Jogo da Mercearia';
    this.space.title = 'Invasão Espacial';
    this.bola.title = 'Bola na Caixa';
    this._games.push(this.mercearia);
    this._games.push(this.bola);
    this._games.push(this.space);
    this._games.forEach((game) => {
      games.forEach((x) => {
        if (game.title == x.title) {
          game.config = x.config;
          game.gameID = x.gameID;
        }
      });
    });
  };

  selectGame(game:any){
    console.log(game);
  };

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
export class Game {
  gameID: string;
  config: string;
  title: string;
};