import { Component } from '@angular/core';
import { ModalController, ItemSliding, AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';
import { Storage } from '@ionic/storage';
import { PacientDetailPage } from './../pacient-detail/pacient-detail';

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
  constructor(public alertCtrl: AlertController, public modalCtrl: ModalController, public navCtrl: NavController, public storage: Storage, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {
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
                avatar: this.woman,
                sexo:result.data[i].sexo,
                id:result.data[i].id
              });
            } else {
              this.data.push({
                name: result.data[i].name,
                identifier: result.data[i].identifier,
                avatar: this.man,
                sexo:result.data[i].sexo,
                id:result.data[i].id
              });
            }
          }
          console.log(this.data);
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
    });
  }
  deletePacient(identifier: string, name: string, slidingItem: ItemSliding) {
    const confirm = this.alertCtrl.create({
      title: 'Remover paciente ?',
      message: 'Você realmente quer remover o paciente ' + name + ' ?',
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
              this.userProvider.deletePacient(identifier)
                .then((result: any) => {
                  if (result.success === true) {
                    this.navCtrl.setRoot(this.navCtrl.getActive().component);
                    this.toast.create({ message: name + ' removido !!', position: 'botton', duration: 5000 }).present();
                  }
                })
                .catch((error: any) => {
                  reject(error);
                  this.toast.create({ message: 'Erro: ' + error.error, position: 'botton', duration: 5000 }).present();
                });
            });
          }
        }
      ]
    });
    confirm.present();
  }

  editPacient(identifier: string, name: string) {
    this.toast.create({ message: 'A fazer', position: 'botton', duration: 5000 }).present();
  }
  createPacient() {
    this.navCtrl.push('CreatePacientPage');
  }

  selectPacient(identifier: string, id: string) {
    var pacientModal = this.modalCtrl.create(PacientDetailPage, { identifier: identifier, id:id }, { enableBackdropDismiss: false });
    pacientModal.present();

    // pacientModal.onDidDismiss((data) => {
    //   console.log("I have dismissed.");
    //   console.log(data);
    // });

    // pacientModal.onWillDismiss((data) => {
    //   console.log("I'm about to dismiss");
    //   console.log(data);
    // });
    // this.getPacient(identifier)
    //   .then((result) => {
    //     if (result) {
    //       console.log('=== result ===');
    //       console.log(result);
    //       this.model = result[0];
    //       console.log('=== model ===');
    //       console.log(this.model);
    // this.model = result;
    // }
    // });
    // this.toast.create({ message: this.model.name, position: 'botton', duration: 5000 }).present();
  }
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad PacientListPage');
  // }
  getStyleSexoo(pacient: any) {
    // console.log(pacient);
    if (pacient.sexo == 'masculino') {
      return "rgba(64, 67, 240, 0.801)";
    } else {
      return "#eb2d2d";
    }
  };
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