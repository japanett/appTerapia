import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {UsersProvider} from './../../providers/users/users';

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  constructor(public alertCtrl: AlertController, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams, private userProvider: UsersProvider) {
  }


  sendReport() {
    const confirm = this.alertCtrl.create({
      title: 'Gerar Relatório ?',
      message: 'O relatório será encaminhado para o email cadastrado',
      buttons: [
        {
          text: 'Não',
          handler: () => {

          }
        },
        {
          text: 'Sim',
          handler: () => {
            return new Promise((resolve, reject) => {
              this.userProvider.sendReport()
                .then((result: any) => {
                  if (result.success === true) {
                    this.toast.create({message: 'Relatório enviado !', position: 'botton', duration: 5000}).present();
                  }
                })
                .catch((error: any) => {
                  reject(error);
                  this.toast.create({message: 'Erro: ' + error.error, position: 'botton', duration: 5000}).present();
                });
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
