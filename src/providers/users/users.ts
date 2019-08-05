import {Injectable} from '@angular/core';
import {LoadingProvider} from '../loading/loading';
import {Storage} from '@ionic/storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UsersProvider {

   private apiURL = 'http://localhost:3000/api/';
  // private apiURL = 'http://ec2-52-45-196-107.compute-1.amazonaws.com:3000/api/';
  // private apiURL = 'http://201.6.243.44:3815/api/'; //mackleaps fabrica
  // private apiURL = 'https://damp-anchorage-23115.herokuapp.com/api/';

  constructor(public http: HttpClient, public storage: Storage, public loadingCtrl: LoadingProvider) {
  }

  recoverPassword(email: string) {
    return new Promise((resolve, reject) => {
      this.loadingCtrl.presentWithGif1();
      let url = this.apiURL + 'user/' + email + '/recover-password';
      this.storage.get('token').then((token) => {
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.get(url, {headers})
          .subscribe((result: any) => {
              this.loadingCtrl.dismiss().then(() => {
                resolve(result);
              });
            },
            (error) => {
              this.loadingCtrl.dismiss().then(() => {
                reject(error);
              });
            });
      });
    });
  }

  changePassword(password: string) {
    return new Promise((resolve, reject) => {
      this.loadingCtrl.presentWithGif1();
      let data = {
        "password": password
      };
      this.storage.get('token').then((token) => {
        let url = this.apiURL + 'user/change-password';
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.patch(url, data, {headers})
          .subscribe((result: any) => {
              this.loadingCtrl.dismiss().then(() => {
                resolve(result);
              });
            },
            (error) => {
              this.loadingCtrl.dismiss().then(() => {
                reject(error);
              });
            });
      });
    });
  }


  createAccount(name: string, login: string, password: string, email: string) {
    return new Promise((resolve, reject) => {
      this.loadingCtrl.presentWithGif1();
      var data = {
        name: name,
        login: login,
        password: password,
        email: email
      };

      this.http.post(this.apiURL + 'user/create', data)
        .subscribe((result: any) => {
            this.loadingCtrl.dismiss().then(() => {
              resolve(result);
            });
          },
          (error) => {
            this.loadingCtrl.dismiss().then(() => {
              reject(error);
            });
          });
    });
  }

  createPacient(name: string, age: number, sexo: string, patologia: string, objetivo: string, mao_dominante: string, gmfcs: number) {
    return new Promise((resolve, reject) => {
      this.loadingCtrl.presentWithGif1();
      let data = {
        name: name,
        age: age,
        sexo: sexo,
        patologia: patologia,
        objetivo: objetivo,
        mao_dominante: mao_dominante,
        gmfcs: gmfcs
      };
      this.storage.get('token').then((token) => {
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.post(this.apiURL + 'user/pacients', data, {headers})
          .subscribe((result: any) => {
              this.loadingCtrl.dismiss().then(() => {
                resolve(result);
              });
            },
            (error) => {
              this.loadingCtrl.dismiss().then(() => {
                reject(error);
              });
            });
      });


    });
  }

  login(login: string, password: string) {
    return new Promise((resolve, reject) => {
      this.loadingCtrl.presentWithGif1();
      var data = {
        login: login,
        password: password
      };

      this.http.post(this.apiURL + 'auth', data)
        .subscribe((result: any) => {
            this.loadingCtrl.dismiss().then(() => {
              resolve(result);
            });
          },
          (error) => {
            this.loadingCtrl.dismiss().then(() => {
              reject(error);
            });
          });
    });
  }

  getPacients(identifier?: string) {
    return new Promise((resolve, reject) => {
      this.loadingCtrl.presentWithGif1();
      this.storage.get('token').then((token) => {
        let url = this.apiURL + 'user/pacients';
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.get(url, {headers})
          .subscribe((result: any) => {
              this.loadingCtrl.dismiss().then(() => {
                resolve(result);
              });
            },
            (error) => {
              this.loadingCtrl.dismiss().then(() => {
                reject(error);
              });
            });

      });
    });
  }

  getPacient(identifier: string) {
    return new Promise((resolve, reject) => {
      this.loadingCtrl.presentWithGif1();
      this.storage.get('token').then((token) => {
        let url = this.apiURL + 'user/pacients/' + identifier;
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.get(url, {headers})
          .subscribe((result: any) => {
              this.loadingCtrl.dismiss().then(() => {
                resolve(result);
              });
            },
            (error) => {
              this.loadingCtrl.dismiss().then(() => {
                reject(error);
              });
            });


      });
    });
  }

  updatePacient(identifier: string, name: string, age: number, sexo: string, patologia: string, objetivo: string, mao_dominante: string, gmfcs: number) {
    return new Promise((resolve, reject) => {
      this.loadingCtrl.presentWithGif1();
      let url = this.apiURL + 'user/pacients/' + identifier;
      let data = {
        "name": name,
        "age": age,
        "sexo": sexo,
        "patologia": patologia,
        "objetivo": objetivo,
        "active": true,
        "mao_dominante": mao_dominante,
        "gmfcs": gmfcs
      };
      this.storage.get('token').then((token) => {
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.put(url, data, {headers})
          .subscribe((result: any) => {
              this.loadingCtrl.dismiss().then(() => {
                resolve(result);
              });
            },
            (error) => {
              this.loadingCtrl.dismiss().then(() => {
                reject(error);
              });
            });
      });
    });
  }

  getUser() {
    return new Promise((resolve, reject) => {
      this.loadingCtrl.presentWithGif1();
      let url = this.apiURL + 'user';
      this.storage.get('token').then((token) => {
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.get(url, {headers})
          .subscribe((result: any) => {
              this.loadingCtrl.dismiss().then(() => {
                resolve(result);
              });
            },
            (error) => {
              this.loadingCtrl.dismiss().then(() => {
                reject(error);
              });
            });
      });
    });
  }

  sendReport() {
    return new Promise((resolve, reject) => {
      this.loadingCtrl.presentWithGif1();
      let url = this.apiURL + 'user/report';
      this.storage.get('token').then((token) => {
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.get(url, {headers})
          .subscribe((result: any) => {
              this.loadingCtrl.dismiss().then(() => {
                resolve(result);
              });
            },
            (error) => {
              this.loadingCtrl.dismiss().then(() => {
                reject(error);
              });
            });
      });
    });
  }

  updateUser(name: string, email: string) {
    return new Promise((resolve, reject) => {
      this.loadingCtrl.presentWithGif1();
      let url = this.apiURL + 'user';
      let data = {
        "name": name,
        "email": email
      }
      this.storage.get('token').then((token) => {

        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.put(url, data, {headers})
          .subscribe((result: any) => {
              this.loadingCtrl.dismiss().then(() => {
                resolve(result);
              });
            },
            (error) => {
              this.loadingCtrl.dismiss().then(() => {
                reject(error);
              });
            });
      });
    });
  }

  deletePacient(identifier: string) {
    return new Promise((resolve, reject) => {
      this.loadingCtrl.presentWithGif1();
      this.storage.get('token').then((token) => {
        let url = this.apiURL + 'user/pacients/' + identifier;
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.delete(url, {headers})
          .subscribe((result: any) => {
              this.loadingCtrl.dismiss().then(() => {
                resolve(result);
              });
            },
            (error) => {
              this.loadingCtrl.dismiss().then(() => {
                reject(error);
              });
            });
      });
    });
  }

  getGames(identifier: string) {
    return new Promise((resolve, reject) => {
      this.loadingCtrl.presentWithGif1();
      this.storage.get('token').then((token) => {
        let url = this.apiURL + 'user/pacients/' + identifier + '/games/';
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.get(url, {headers})
          .subscribe((result: any) => {
              this.loadingCtrl.dismiss().then(() => {
                resolve(result);
              });
            },
            (error) => {
              this.loadingCtrl.dismiss().then(() => {
                reject(error);
              });
            });
      });
    });
  }

  addGames(identifier: string, config: string, gameID: number, time: string, imersiveMode: string) {
    return new Promise((resolve, reject) => {
      this.loadingCtrl.presentWithGif1();
      let _imersiveMode = imersiveMode === 'T' ? true : false;
      let data = {
        "toPlay": gameID,
        "config": config,
        "time": time,
        "imersiveMode": _imersiveMode
      };
      this.storage.get('token').then((token) => {
        let url = this.apiURL + 'user/pacients/games/' + identifier;
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.put(url, data, {headers})
          .subscribe((result: any) => {
              this.loadingCtrl.dismiss().then(() => {
                resolve(result);
              });
            },
            (error) => {
              this.loadingCtrl.dismiss().then(() => {
                reject(error);
              });
            });
      });
    });
  }

  updateGameConfig(pacientId: string, config: string, gameID: number, time: string, imersiveMode: string) {
    return new Promise((resolve, reject) => {
      this.loadingCtrl.presentWithGif1();
      let _imersiveMode = imersiveMode === 'T' ? true : false;
      let data = {
        "gameID": gameID,
        "config": config,
        "time": time,
        "imersiveMode": _imersiveMode
      };

      this.storage.get('token').then((token) => {
        let url = this.apiURL + 'user/games/' + pacientId;
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.put(url, data, {headers})
          .subscribe((result: any) => {
              this.loadingCtrl.dismiss().then(() => {
                resolve(result);
              });
            },
            (error) => {
              this.loadingCtrl.dismiss().then(() => {
                reject(error);
              });
            });
      });
    });
  }

  removePacientGame(id: string, gameID: string) {
    return new Promise((resolve, reject) => {
      this.loadingCtrl.presentWithGif1();
      let url = (this.apiURL + 'user/' + id + '/games/' + gameID).toString();
      this.storage.get('token').then((token) => {
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.put(url, {}, {headers})
          .subscribe((result: any) => {
              this.loadingCtrl.dismiss().then(() => {
                resolve(result);
              });
            },
            (error) => {
              this.loadingCtrl.dismiss().then(() => {
                reject(error);
              });
            });
      });
    });
  }

  // Two new endpoints that need to be implemented
  deleteGameReport(identifier: string, gameId: string) {
    return new Promise((resolve, reject) => {
      this.loadingCtrl.presentWithGif1();
      this.storage.get('token').then((token) => {
        let url = this.apiURL + 'user/' + identifier + '/games/' + gameId;
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.delete(url, {headers})
          .subscribe((result: any) => {
              this.loadingCtrl.dismiss().then(() => {
                resolve(result);
              });
            },
            (error) => {
              this.loadingCtrl.dismiss().then(() => {
                reject(error);
              });
            });
      });
    });
  }

  setGameReportObservation(identifier: string, gameId: string, observation: string) {
    return new Promise((resolve, reject) => {
      this.loadingCtrl.presentWithGif1();

      let data = {
        "observation": observation
      };

      this.storage.get('token').then((token) => {
        let url = this.apiURL + 'user/' + identifier + '/games/' + gameId;
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.patch(url, data, {headers})
          .subscribe((result: any) => {
              this.loadingCtrl.dismiss().then(() => {
                resolve(result);
              });
            },
            (error) => {
              this.loadingCtrl.dismiss().then(() => {
                reject(error);
              });
            });
      });
    });
  }

}


