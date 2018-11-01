import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
// import { resolveDefinition } from '../../../node_modules/@angular/core/src/view/util';
//Taquebrando o    storage qnd tento rodar no celular, acho te tenqe fazer sqlite pro cel
/*
  constructor(private userService: UserService) {
    this.getAuthUser();
  }

  private getAuthUser() {
    this.userService.getOnStorage().then(
      (user) => {
        this.user = user;

        if (!this.user.token) {
          this.navCtrl.push(LoginPage)
        }
      }
    );
  }
*/
@Injectable()
export class UsersProvider {

  // private apiURL = 'http://localhost:3000/api/';
  private apiURL = 'http://201.6.243.44:3815/api/'; //mackleaps fabrica
  // private apiURL = 'https://damp-anchorage-23115.herokuapp.com/api/';

  constructor(public http: HttpClient, public storage: Storage) { }

  createAccount(name: string, login: string, password: string, email: string) {
    return new Promise((resolve, reject) => {
      var data = {
        name: name,
        login: login,
        password: password,
        email: email
      };

      this.http.post(this.apiURL + 'user/create', data)
        .subscribe((result: any) => {
          resolve(result);
        },
          (error) => {
            reject(error);
          });
    });
  }

  createPacient(name: string, age: number, sexo: string, patologia: string, objetivo: string) {
    return new Promise((resolve, reject) => {
      let data = {
        name: name,
        age: age,
        sexo: sexo,
        patologia: patologia,
        objetivo: objetivo
      };
      this.storage.get('token').then((token) => {
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.put(this.apiURL + 'user/pacients', data, { headers })
          .subscribe((result: any) => {
            resolve(result);
          },
            (error) => {
              reject(error);
            });
      });


    });
  }

  login(login: string, password: string) {
    return new Promise((resolve, reject) => {
      var data = {
        login: login,
        password: password
      };

      this.http.post(this.apiURL + 'auth', data)
        .subscribe((result: any) => {
          resolve(result);
        },
          (error) => {
            reject(error);
          });
    });
  }

  getPacients(identifier?: string) { //update this
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((token) => {
        let url = this.apiURL + 'user/pacients';
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.get(url, { headers })
          .subscribe((result: any) => {
            resolve(result);
          },
            (error) => {
              reject(error);
            });

      });
    });
  }

  getPacient(identifier: string) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((token) => {
        let url = this.apiURL + 'user/pacients/' + identifier;
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.get(url, { headers })
          .subscribe((result: any) => {
            resolve(result);
          },
            (error) => {
              reject(error);
            });


      });
    });
  }

  getUser() {
    return new Promise((resolve, reject) => {
      let url = this.apiURL + 'user';
      this.storage.get('token').then((token) => {

        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.get(url, { headers })
          .subscribe((result: any) => {
            resolve(result);
          },
            (error) => {
              reject(error);
            });
      });
    });
  }

  updateUser(name: string, email: string) {
    return new Promise((resolve, reject) => {
      let url = this.apiURL + 'user';
      let data = {
        "name": name,
        "email": email
      }
      this.storage.get('token').then((token) => {

        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.put(url, data, { headers })
          .subscribe((result: any) => {
            resolve(result);
          },
            (error) => {
              reject(error);
            });
      });
    });
  }

  deletePacient(identifier: string) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((token) => {
        let url = this.apiURL + 'user/pacients/' + identifier;
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.delete(url, { headers })
          .subscribe((result: any) => {
            resolve(result);
          },
            (error) => {
              reject(error);
            });


      });
    });
  }

  getGames(identifier: string) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((token) => {
        let url = this.apiURL + 'user/' + identifier + '/games/';
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.get(url, { headers })
          .subscribe((result: any) => {
            resolve(result);
          },
            (error) => {
              reject(error);
            });
      });
    });
  }

  addGames(identifier: string, config: string, gameID: number) {
    return new Promise((resolve, reject) => {
      let data = {
        "toPlay": gameID,
        "config": config
      }
      this.storage.get('token').then((token) => {
        let url = this.apiURL + 'user/pacients/games/' + identifier;
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.put(url, data, { headers })
          .subscribe((result: any) => {
            resolve(result);
          },
            (error) => {
              console.log(error);
              reject(error);
            });
      });
    });
  }

  updateGameConfig(pacientId: string, config: string, gameID: number) {
    return new Promise((resolve, reject) => {
      let data = {
        "gameID": gameID,
        "config": config
      }
      this.storage.get('token').then((token) => {
        console.log()
        let url = this.apiURL + 'user/games/' + pacientId;
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.put(url, data, { headers })
          .subscribe((result: any) => {
            resolve(result);
          },
            (error) => {
              reject(error);
            });
      });
    });
  }

  removePacientGame(id: string, gameID: string) {
    return new Promise((resolve, reject) => {
      let url = (this.apiURL + 'user/' + id + '/games/' + gameID).toString();
      this.storage.get('token').then((token) => {
        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.put(url, {},{ headers })
          .subscribe((result: any) => {
            resolve(result);
          },
            (error) => {
              reject(error);
            });
      });
    });
  }
}


