import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {UsersProvider} from './../../providers/users/users';

@IonicPage()
@Component({
  selector: 'page-create-pacient',
  templateUrl: 'create-pacient.html',
})
export class CreatePacientPage {
  model: Pacient;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private toast: ToastController, private userProvider: UsersProvider) {
    this.model = new Pacient();
    this.model.name = '';
    this.model.age;
    this.model.sexo = '';
    this.model.patologia = '';
    this.model.objetivo = '';
    this.model.mao_dominante = '';
    this.model.gmfcs = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePacientPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  createPacient() {
    this.userProvider.createPacient(this.model.name, this.model.age, this.model.sexo, this.model.patologia, this.model.objetivo, this.model.mao_dominante, this.model.gmfcs)
      .then((result: any) => {
        if (result.success) {
          this.toast.create({message: 'Paciente cadastrado com sucesso', position: 'botton', duration: 5000}).present();
          this.navCtrl.setRoot('PacientListPage');
        } else {
          this.toast.create({
            message: 'Preencha todos os campos corretamente',
            position: 'botton',
            duration: 5000
          }).present();
        }
      })
      .catch((error: any) => {
        this.toast.create({
          message: 'Preencha todos os campos corretamente',
          position: 'botton',
          duration: 5000
        }).present();
      })
  }
}

export class Pacient {
  name: string;
  age: number;
  sexo: string;
  patologia: string;
  objetivo: string;
  mao_dominante: string;
  gmfcs: number;
}
