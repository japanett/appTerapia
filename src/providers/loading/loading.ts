import {Injectable} from '@angular/core';
import {Loading, LoadingController} from 'ionic-angular';

@Injectable()
export class LoadingProvider {
  loading: Loading;

  constructor(public loadingCtrl: LoadingController) {
  }

  presentWithGif1() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="loader">
        <div class="inner one"></div>
        <div class="inner two"></div>
        <div class="inner three"></div>
      </div>
          `,
      cssClass: 'my-loading-class'
    });

    return this.loading.present();
  }

  presentWithMessage() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    return this.loading.present();
  }

  dismiss() {
    return new Promise((resolve, reject) => {
      if (this.loading) {
        return this.loading.dismiss(resolve(true)).catch(error => {
          console.log('loading error: ', error);
        });
      } else {
        resolve(true);
      }
    });

  }
}
