import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {UsersProvider} from './../../providers/users/users';

@IonicPage()
@Component({
  selector: 'page-pacient-edit',
  templateUrl: 'pacient-edit.html',
})
export class PacientEditPage {

  public name: string;
  public age: number;
  public sexo: string;
  public patologia: string;
  public objetivo: string;
  public identifier: string;
  public mao_dominante: string;
  public gmfcs: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private toast: ToastController, private userProvider: UsersProvider) {
    this.getPacient(navParams.get('pacient'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PacientEditPage');
  }

  editPacient() {
    this.userProvider.updatePacient(this.identifier, this.name, this.age, this.sexo, this.patologia, this.objetivo, this.mao_dominante, this.gmfcs)
      .then((result: any) => {
        if (result.success) {
          this.viewCtrl.dismiss()
            .then(() => {
              this.toast.create({message: 'Paciente Atualizado !', position: 'botton', duration: 5000}).present();
            })
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

  getPacient(pacient: any) {
    this.name = pacient.name;
    this.age = pacient.age;
    this.sexo = pacient.sexo;
    this.patologia = pacient.patologia;
    this.objetivo = pacient.objetivo;
    this.identifier = pacient.identifier;
    this.mao_dominante = pacient.mao_dominante;
    this.gmfcs = pacient.gmfcs;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
