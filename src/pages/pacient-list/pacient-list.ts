import { Component } from '@angular/core';
import { Modal, ModalController, ModalOptions, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-pacient-list',
  templateUrl: 'pacient-list.html',
})
export class PacientListPage {
  public data: any = [];
  public man = './assets/imgs/man.png';
  public woman = './assets/imgs/woman.png';
  model: Pacient;
  constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {
    this.model = new Pacient();
    this.getPacients();
  }


  getPacients() {
    this.userProvider.getPacients()
      .then((result: any) => {
        if (result.success === true) {
          for (let i = 0; i < result.data.length; i++) {
            if (result.data[i].sexo.toLowerCase().trim() == 'feminino') {
              this.data.push({
                name: result.data[i].name,
                identifier: result.data[i].identifier,
                avatar: this.woman
              });
            } else {
              this.data.push({
                name: result.data[i].name,
                identifier: result.data[i].identifier,
                avatar: this.man
              });
            }
          }
        }
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro: ' + error.error, position: 'botton', duration: 5000 }).present();
      });
  }

  getPacient(identifier: string) {
    return new Promise((resolve, reject) => {
      this.userProvider.getPacient(identifier)
        .then((result: any) => {
          if (result.success === true) {
            // this.model = result.data[0];
            resolve(result.data[0]);
          } else {
            resolve(false);
          }
        })
        .catch((error: any) => {
          reject(error);
          this.toast.create({ message: 'Erro: ' + error.error, position: 'botton', duration: 5000 }).present();
        });
      // this.navCtrl.push('PacientDetailPage', { identifier: identifier });
    });
  }

  createPacient() {
    this.navCtrl.push('CreatePacientPage');
  }

  selectPacient(identifier: string) {
    this.getPacient(identifier)
      .then((result) => {
        if (result) {
          console.log('=== result ===');
          console.log(result);
          this.model = result[0];
          console.log('=== model ===');
          console.log(this.model);
          // this.model = result;
        }
      });
    // this.toast.create({ message: this.model.name, position: 'botton', duration: 5000 }).present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PacientListPage');
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
}