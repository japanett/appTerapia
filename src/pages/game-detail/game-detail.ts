import { Component } from '@angular/core';
import { ViewController, IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-game-detail',
  templateUrl: 'game-detail.html',
})
export class GameDetailPage {
  public translatedConfig: string;
  public game: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
    this.game = navParams.get('game');
    this.translatedConfig = this.translateConfig(this.game.config);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  translateConfig(config: string) {
    return config
      .replace('1', 'Mão Esquerda')
      .replace('2', 'Mão Direita')
      .replace('3', 'Mão Cruzada')
      .replace('T', 'Quarta etapa Ativada')
      .replace('F', 'Quarta etapa Desativada')
  };

  ionViewDidLoad() {
  }

}
