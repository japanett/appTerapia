import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-pacient-detail',
  templateUrl: 'pacient-detail.html',
})
export class PacientDetailPage {
  model: Pacient;
  // public avatar = '';
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public storage: Storage, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {
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
        this.toast.create({ message: 'Erro: ' + error.error, position: 'botton', duration: 5000 }).present();
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  teste() {
    this.toast.create({ message: 'Nao fiz ainda Burro', position: 'botton', duration: 5000 }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PacientDetailPage');
  }
}

export class Pacient {
  active: boolean;
  name: string;
  age: number;
  sexo: string;
  patologia: string;
  objetivo: string;
  identifier: string;
  medic: string;
  games: any;
  gamesNum: number;
  avatar: string;
}
