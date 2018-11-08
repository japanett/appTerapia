import { Component } from '@angular/core';
import { ModalController, ViewController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-game-detail',
  templateUrl: 'game-detail.html',
})
export class GameDetailPage {
  public game: any;
  public configuration: string;


  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public viewCtrl: ViewController, public storage: Storage, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {
    this.game = navParams.get('game');
  }

  configurationUsed(game) {
    let _configuration;
    let _gameConfig = game.config;
    if (game.title == 'Jogo da Mercearia') {
      let primeiraEtapa,
        segundaEtapa,
        terceiraEtapa;
      _configuration = 'Primeira Etapa: ' + primeiraEtapa + ', Segunda Etapa: ' + segundaEtapa + ', Terceira Etapa: ' + terceiraEtapa;
    }
    else if (game.title == 'Bola na Caixa'){

    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log(this.game);
  }

}
