import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  ItemSliding,
  ModalController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {UsersProvider} from '../../providers/users/users';
import {PacientDetailPage} from '../pacient-detail/pacient-detail';
import {PacientEditPage} from '../pacient-edit/pacient-edit';
import {Pacient} from "../../model/pacient";

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

  constructor(public alertCtrl: AlertController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {
    this.model = new Pacient();
    this.getPacients();
  }


  getPacients() {
    this.userProvider.getPacients()
      .then((result: any) => {
        if (this.data.length > 0) {
          this.data = [];
        }
        if (result.success === true) {
          for (let i = 0; i < result.data.length; i++) {
            this.data.push({
              name: result.data[i].name,
              identifier: result.data[i].identifier,
              avatar: result.data[i].sexo.toLowerCase().trim() == 'feminino' ? this.woman : this.man,
              sexo: result.data[i].sexo,
              id: result.data[i].id,
              age: result.data[i].age,
              objetivo: result.data[i].objetivo,
              patologia: result.data[i].patologia,
              mao_dominante: result.data[i].mao_dominante,
              gmfcs: result.data[i].gmfcs
            });
          }
        }
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro: ' + error.error, position: 'botton', duration: 5000 }).present();
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

  editPacient(pacient: any) {
    let pacientEditModal = this.modalCtrl.create(PacientEditPage, {pacient: pacient}, {enableBackdropDismiss: false});
    pacientEditModal.onDidDismiss(() => {
      this.getPacients();
    });
    pacientEditModal.present();
  }

  createPacient() {
    this.navCtrl.push('CreatePacientPage');
  }

  selectPacient(identifier: string, id: string) {
    let pacientModal = this.modalCtrl.create(PacientDetailPage, {
      identifier: identifier,
      id: id
    }, {enableBackdropDismiss: false});
    pacientModal.present();
  }


  getStylee(pacient: any) {
    if (pacient.sexo == 'masculino') {
      return "#02077d";
    } else {
      return "#b33479";
    }
  }
}
