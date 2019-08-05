import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {UsersProvider} from './../../providers/users/users';
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage {

  model: User;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public storage: Storage, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {
    this.model = new User();
    this.getUser();
  }

  getUser() {
    this.userProvider.getUser()
      .then((result: any) => {
          this.model = result.data;
          this.model.firstname = result.data.name.split(' ')[0];
          this.model.pacientsNum = result.data.pacients.length;
        }
      );
  }

  updateUser() {
    this.navCtrl.push('UserEditPage', {user: this.model});
  }

  changePassword() {
    const confirm = this.alertCtrl.create({
      title: 'Digite a nova senha:',
      inputs: [
        {
          name: 'password',
          placeholder: ''
        }
      ],
      buttons: [
        {
          text: 'Alterar',
          handler: dataInput => {
            this.userProvider.changePassword(dataInput.password)
              .then((result: any) => {
                this.toast.create({message: 'Senha alterada!', position: 'botton', duration: 5000}).present();
              })
              .catch((error: any) => {
                this.toast.create({message: 'Erro: ' + error.error, position: 'botton', duration: 5000}).present();
              });
          }
        },
        {
          text: 'Cancelar',
          handler: () => {

          }
        }

      ]
    });
    confirm.present();
  }

  logout() {
    this.storage.remove('token')
      .then(() => {
        this.toast.create({message: 'log out successfull', position: 'botton', duration: 5000}).present();
        this.navCtrl.setRoot('HomePage');
      })
      .catch((error: any) => {
        this.toast.create({message: 'Erro: ' + error.error, position: 'botton', duration: 5000}).present();
      });
  }
}

export class User {
  name: string;
  firstname: string;
  login: string;
  email: string;
  password: string;
  pacientsNum: number;
}
