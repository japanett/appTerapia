import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {UsersProvider} from './../../providers/users/users';
import {Storage} from '@ionic/storage';
import {GamesPage} from './../games/games';
import {GameListPage} from './../game-list/game-list';
import {Pacient} from "../../model/pacient";

@IonicPage()
@Component({
  selector: 'page-pacient-detail',
  templateUrl: 'pacient-detail.html',
})
export class PacientDetailPage {
  model: Pacient;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public viewCtrl: ViewController, public storage: Storage, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {
    this.model = new Pacient();
    this.getPacient(navParams.get('identifier'));
  }

  getPacient(identifier: string) {
    this.userProvider.getPacient(identifier)
      .then((result: any) => {
        this.model = result.data[0];
        this.model.gamesNum = result.data[0].games.length;
        if (result.data[0].sexo.toLowerCase().trim() == 'feminino') {
          this.model.avatar = './assets/imgs/woman.png';
        } else {
          this.model.avatar = './assets/imgs/man.png';
        }
      })
      .catch((error: any) => {
        this.toast.create({message: 'Erro: ' + error.error, position: 'botton', duration: 5000}).present();
      });
  }

  getGames(identifier: string, name: string, id: string) {
    var gamesModal = this.modalCtrl.create(GamesPage, {
      identifier: identifier,
      name: name
    }, {enableBackdropDismiss: false});
    gamesModal.present();
  }

  addGame(name: string, identifier: string, games: any, sexo: string, id: string) {
    var _identifier = identifier;
    var gameListModal = this.modalCtrl.create(GameListPage, {
      identifier: _identifier,
      name: name,
      games: games,
      sexo: sexo,
      id: id
    }, {enableBackdropDismiss: false});
    gameListModal.onDidDismiss(() => {
      this.getPacient(_identifier);
    });
    gameListModal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getStylee(pacient: any) {
    if (pacient.sexo == 'masculino') {
      return "#ACCDD4";
    } else {
      return "#DB7F67";
    }
  }

}
