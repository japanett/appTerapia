import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {UsersProvider} from './../../providers/users/users';

@IonicPage()
@Component({
  selector: 'page-user-edit',
  templateUrl: 'user-edit.html',
})
export class UserEditPage {
  model: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {
    this.model = new User();
    this.model = navParams.get('user');
  }

  updateUser() {
    this.userProvider.updateUser(this.model.name, this.model.email)
      .then((result: any) => {
        if (result.success === true) {
          this.toast.create({message: 'Informações atualizadas', position: 'botton', duration: 3000}).present();
          this.navCtrl.popToRoot();
        } else {
          this.toast.create({message: 'Erro ao atualizar...', position: 'botton', duration: 5000}).present();
        }
      });
  }

  goBack() {
    this.navCtrl.pop();
  }

}

export class User {
  name: string;
  login: string;
  email: string;
  password: string
}
