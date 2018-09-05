import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';

@IonicPage()
@Component({
  selector: 'page-create-pacient',
  templateUrl: 'create-pacient.html',
})
export class CreatePacientPage {
  model: Pacient;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {
    this.model = new Pacient();
    this.model.name = '';
    this.model.age;
    this.model.sexo = '';
    this.model.patologia = '';
    this.model.objetivo = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePacientPage');
  }

  createPacient() {
    this.userProvider.createPacient(this.model.name, this.model.age, this.model.sexo, this.model.patologia, this.model.objetivo)
      .then((result: any) => {
        if (result.success) {
          this.toast.create({ message: 'Paciente cadastrado com sucesso', position: 'botton', duration: 5000 }).present();
          this.navCtrl.popToRoot()
            .then(() => {
              this.navCtrl.setRoot('MenuPage');
            });
        } else {
          this.toast.create({ message: 'Nao foi possivel cadastrar um paciente...', position: 'botton', duration: 5000 }).present();
        }
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao cadastrar paciente', position: 'botton', duration: 5000 }).present();
      })
  }
}
export class Pacient {
  name: string;
  age: number;
  sexo: string;
  patologia: string;
  objetivo: string;
}