import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-game-detail',
  templateUrl: 'game-detail.html',
})
export class GameDetailPage {
  public translatedConfig: string;
  public translatedMode: string;
  public game: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
    this.game = navParams.get('game');
    this.translatedConfig = GameDetailPage.translateConfig(this.game.config);
    this.translatedMode = GameDetailPage.translateMode(this.game.imersiveMode);
  }

  static translateMode(imersiveMode: boolean) {
    if (imersiveMode === undefined) {
      return 'Ativado';
    }
    return imersiveMode ? 'Ativado' : 'Desativado';
  }

  static translateConfig(config: string) {
    return config
      .replace('1', 'Mão Esquerda')
      .replace('2', 'Mão Direita')
      .replace('3', 'Mão Cruzada')
      .replace('T', 'Quarta etapa Ativada')
      .replace('F', 'Quarta etapa Desativada')
  };

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
  }

}
