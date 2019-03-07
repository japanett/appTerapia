import { Component } from '@angular/core';
import { ModalController, ItemSliding, AlertController, IonicPage, ViewController, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';
import { Storage } from '@ionic/storage';
import { GameDetailPage } from './../game-detail/game-detail';

@IonicPage()
@Component({
  selector: 'page-games',
  templateUrl: 'games.html',
})
export class GamesPage {
  public data: any = [];
  model: Game;
  public pacientName: string;
  public identifier: string;

  constructor(public modalCtrl: ModalController, private alertCtrl: AlertController, public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public storage: Storage, private toast: ToastController, private userProvider: UsersProvider) {
    this.model = new Game();
    this.pacientName = navParams.get('name');
    this.identifier = navParams.get('identifier');
    this.getGames(this.identifier);
  }

  getGames(identifier?: string) {
    this.userProvider.getGames(identifier)
      .then((result: any) => {
        if (result.success === true) {
          for (let i = 0; i < result.data.length; i++) {
            this.data.push({
              pacientName: this.pacientName,
              title: result.data[i].title,
              played: result.data[i].played,
              id: result.data[i]._id,
              date: result.data[i].date,
              score: {
                esquerda: result.data[i].score.esquerda,
                direita: result.data[i].score.direita,
                cruzada: result.data[i].score.cruzada
              },
              error: {
                esquerda: result.data[i].error.esquerda,
                direita: result.data[i].error.direita,
                cruzada: result.data[i].error.cruzada
              },
              time: result.data[i].time,
              config: result.data[i].config,
              identifier: result.data[i].pacient,
              observation: result.data[i].observation,
              imersiveMode: result.data[i].imersiveMode
            });
          }
        }
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro: ' + error.error, position: 'botton', duration: 5000 }).present();
      });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad GamesPage');
  }

  selectGame(game: any) {
    var gamesModal = this.modalCtrl.create(GameDetailPage, { game: game }, { enableBackdropDismiss: false });
    gamesModal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  setObservation(identifier: string, gameId: string, gameObservation: string, slidingItem: ItemSliding) {
    let observation: string = gameObservation;
    const confirm = this.alertCtrl.create({
      title: 'Digite:',
      inputs: [
        {
          name: 'observation',
          placeholder: 'Observação',
          value: observation
        }
      ],
      buttons: [
        {
          text: 'Alterar',
          handler: dataInput => {
            this.userProvider.setGameReportObservation(identifier, gameId, dataInput.observation)
              .then((result: any) => {
                if (result.success === true) {
                  // Updates the config without having to update the page
                  this.data.find(x => {
                    if (x.id === gameId) {
                      x.observation = dataInput.observation;
                      return x;
                    }
                  });
                  this.toast.create({ message: 'Observação adicionada!', position: 'botton', duration: 5000 }).present();
                }
                slidingItem.close();
              })
              .catch((error: any) => {
                this.toast.create({ message: 'Erro: ' + error.error, position: 'botton', duration: 5000 }).present();
                slidingItem.close();
              });
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            slidingItem.close();
          }
        }

      ]
    });
    confirm.present();
  }

  deleteGameReport(identifier: string, gameId: string, slidingItem: ItemSliding) {
    const confirm = this.alertCtrl.create({
      title: 'Excluir relatório?',
      message: 'Após excluir esse relatório, será impossível recuperá-lo.',
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
              this.userProvider.deleteGameReport(identifier, gameId)
                .then((result: any) => {
                  if (result.success === true) {
                    // Removes the gameReport without having to update the page
                    this.data = this.data.filter(gameA => gameA.id !== gameId);
                    this.toast.create({ message: 'Relatório excluído!', position: 'botton', duration: 5000 }).present();
                  }
                  resolve();
                })
                .catch((error: any) => {
                  this.toast.create({ message: 'Erro: ' + error.error, position: 'botton', duration: 5000 }).present();
                  reject(error);
                });
            });
          }
        }
      ]
    });
    confirm.present();
  }

}


export class Game {
  date: string;
  score: {
    esquerda: number,
    direita: number,
    cruzada: number
  };
  error: {
    esquerda: number,
    direita: number,
    cruzada: number

  };
  time: string;
  played: boolean;
  id: string;
  pacient: string;
  title: string;
  gameID: number;
  config: string;
  medic: string;
  idToPlay: string;
  observation: string;
  imersiveMode: boolean;
}
