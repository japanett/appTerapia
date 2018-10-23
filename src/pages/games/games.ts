import { Component } from '@angular/core';
import { ModalController, ItemSliding, AlertController, IonicPage, ViewController, NavController, NavParams, ToastController } from 'ionic-angular';
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
  public pacientName: string;
  public identifier: string;
  
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public storage: Storage, private toast: ToastController, private userProvider: UsersProvider) {
    this.model = new Game();
    this.pacientName = navParams.get('name');
    this.identifier = navParams.get('identifier');
    this.getGames(this.identifier);
  }

  getGames(identifier?: string) {
    this.userProvider.getGames(identifier)
      .then((result: any) => {
        if (result.success === true) {
          for (let i = 0; i < result.data.length; i++) {
            console.log(result.data[i]);
            this.data.push({
              pacientName: this.pacientName,
              title: result.data[i].title,
              played: result.data[i].played,
              id: result.data[i]._id,
              date: result.data[i].date,
              score: {
                esquerda: result.data[i].score.esquerda,
                direita: result.data[i].score.direita,
                cruzada: result.data[i].score.cruzada
              },
              error: {
                esquerda: result.data[i].error.esquerda,
                direita: result.data[i].error.direita,
                cruzada: result.data[i].error.cruzada
              },
              time: result.data[i].time,
              config: result.data[i].config,
              identifier: result.data[i].pacient
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
  selectGame(game: any) {
    console.log(game);
  }

  addGame(identifier: string) {
    // var gameModal = this.modalCtrl.create(PacientDetailPage, { identifier: identifier }, { enableBackdropDismiss: false });
    // gameModal.present();
    console.log('identifier: '+identifier);

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
