import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-games',
  templateUrl: 'games.html',
})
export class GamesPage {
  public data: any = [];
  model: Game;
  public pacient: string;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public storage: Storage, private toast: ToastController, private userProvider: UsersProvider) {
    this.model = new Game();
    this.pacient = navParams.get('name');
    this.getGames(navParams.get('identifier'));
  }


  getGames(identifier?: string) {
    this.userProvider.getGames(identifier)
      .then((result: any) => {
        if (result.success === true) {
          for (let i = 0; i < result.data.length; i++) {
            console.log('data['+i+']');
            console.log(result.data[i]);
            this.data.push({
              title: result.data[i].title,
              played: result.data[i].played,
              id: result.data[i].id,
              date: result.data[i].date
            });
          }
        }
      })
      .catch((error: any) => {
        console.log(error);
        this.toast.create({ message: 'Erro: ' + error.error, position: 'botton', duration: 5000 }).present();
      });
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad GamesPage');
  }
  teste() {
    console.log('this.data: ' + this.data[0]);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
export class Game {
  // paciente: string;
  date: string;
  score: {
    esquerda: number,
    direita: number,
    cruzada: number
  };
  error: {
    esquerda: number,
    direita: number,
    cruzada: number

  };
  time: string;
  played: boolean;
  id: string;
  pacient: string;
  title: string;
  gameID: number;
  config: string;
  medic: string;
  idToPlay: string;
}
